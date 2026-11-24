import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import SwimmerEmail from "../templates/swimmer-email";
import HeatSheetDocument from "../templates/heat-sheet-document";
import { LaneCard } from "../templates/lane-card";
import { meet, makeSwimmers, events, relayTeams, swimmers, entries } from "../src/data/meet";
import {
  totalEntries,
  totalFees,
  totalHeats,
} from "../src/data/meet";

/**
 * The batch: one meet file -> a personalised swimmer email for
 * every swimmer, the heat-sheet PDF, and nine lane cards (the gala
 * cover + one per event).
 *
 *   npm run make               40 swimmer emails + heat sheet + 9 cards
 *   npm run make:sample        4 emails, for a quick look
 *
 * The gate runs first: the swimmer email is validated before a single
 * file is written, so one bad event entry never becomes 40 bad emails.
 * Swimmer generation is deterministic, a corrections run re-renders
 * only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 40;
const started = Date.now();

const gate = validate(<SwimmerEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/swimmers", { recursive: true });
const entrants = makeSwimmers(count);
let emails = 0;
for (const swimmer of entrants) {
  const { html, text } = await render(
    <SwimmerEmail swimmer={swimmer} />,
  );
  const stem = `out/swimmers/${swimmer.id.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const pdf = await renderPdf(<HeatSheetDocument />);
await writeFile("out/heat-sheet.pdf", pdf.pdf);
const pdfText = Buffer.from(pdf.pdf).toString("latin1");
const sheetPages = (pdfText.match(/\/Type\s*\/Page[^s]/g) || []).length;

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  const { image: cover } = await renderImage(<LaneCard />, { fonts });
  await writeFile("out/swimmers/card-cover.png", cover);
  cards++;
  for (const event of events) {
    const { image } = await renderImage(<LaneCard event={event} />, {
      fonts,
    });
    await writeFile(
      `out/swimmers/card-${event.code.toLowerCase()}.png`,
      image,
    );
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  meet: `${meet.name}, ${meet.galaLabel} (${meet.dateLabel})`,
  emails,
  events: events.length,
  heats: totalHeats(),
  entries: totalEntries(),
  swimmers: swimmers.length,
  relayTeams: relayTeams.length,
  totalFees: totalFees(),
  sheetPages,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));

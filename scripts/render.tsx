import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { formatDiagnostics, render } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import SwimmerEmail from "../templates/swimmer-email";
import MeetPage from "../templates/meet-page";
import HeatSheetDocument from "../templates/heat-sheet-document";
import LaneCard from "../templates/lane-card";

/**
 * Render the four committed examples into out/ :
 *   swimmer-email.html + .txt | meet-page.html
 *   heat-sheet.html + heat-sheet.pdf
 *   lane-card.html (+ lane-card.png when font files are present)
 *
 * renderPdf() and renderImage() fetch nothing: fonts go in as bytes.
 * Drop Inter WOFF files into assets/fonts/ (see assets/fonts/README.md)
 * to enable the PNG; without them the script says so, plainly.
 */
await mkdir("out", { recursive: true });

const email = await render(<SwimmerEmail />);
await writeFile("out/swimmer-email.html", email.html);
await writeFile("out/swimmer-email.txt", email.text);
console.log("swimmer-email:", formatDiagnostics(email.diagnostics) || "clean");

const page = await render(<MeetPage />);
await writeFile("out/meet-page.html", page.html);
console.log("meet-page:", formatDiagnostics(page.diagnostics) || "clean");

const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
const hasFonts = existsSync(bold) && existsSync(regular);
const fontFiles = hasFonts
  ? [
      { family: "Inter", src: await readFile(regular), weight: 400 as const },
      { family: "Inter", src: await readFile(bold), weight: 700 as const },
    ]
  : undefined;

const doc = <HeatSheetDocument />;
const printed = await render(doc);
await writeFile("out/heat-sheet.html", printed.html);
// With no font files given, renderPdf() draws in the standard PDF fonts
// (Helvetica/Times) and warns about it in diagnostics, it never fetches.
const pdf = await renderPdf(doc, fontFiles ? { fonts: fontFiles } : undefined);
await writeFile("out/heat-sheet.pdf", pdf.pdf);
console.log(
  "heat-sheet: print HTML + PDF written",
  formatDiagnostics(pdf.diagnostics) || "",
);

const card = <LaneCard />;
const cardHtml = await render(card);
await writeFile("out/lane-card.html", cardHtml.html);

if (hasFonts && fontFiles) {
  const { image, diagnostics } = await renderImage(card, {
    fonts: fontFiles,
  });
  await writeFile("out/lane-card.png", image);
  console.log("lane-card PNG:", formatDiagnostics(diagnostics) || "clean");
} else {
  console.log(
    "lane-card: HTML written. PNG skipped, add Inter WOFF files to assets/fonts/ (they are passed to renderImage() as bytes; nothing is fetched).",
  );
}

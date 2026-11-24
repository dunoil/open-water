import { mkdir, writeFile } from "node:fs/promises";
import {
  formatDiagnostics,
  outline,
  validate,
} from "@hyper-elements/react";
import { emailClients } from "@hyper-elements/email-clients";
import { lint } from "@hyper-elements/lint";
import SwimmerEmail from "../templates/swimmer-email";
import MeetPage from "../templates/meet-page";
import HeatSheetDocument from "../templates/heat-sheet-document";
import LaneCard from "../templates/lane-card";

/**
 * The gate. Every output is validated BEFORE anything is rendered:
 * core checks + lint (readability) + the email-client plugin (what Outlook,
 * Gmail and Apple Mail remove or change). An error stops the run, so a
 * batch of 40 swimmer emails can never ship 40 copies of one mistake.
 * The verdict is written to checks.json, a file, not a claim.
 */
const templates = [
  { name: "swimmer-email", element: <SwimmerEmail /> },
  { name: "meet-page", element: <MeetPage /> },
  { name: "heat-sheet-document", element: <HeatSheetDocument /> },
  { name: "lane-card", element: <LaneCard /> },
];

const lintPlugin = lint();
const clientsPlugin = await emailClients();
let errors = 0;
let warnings = 0;
const report: unknown[] = [];

for (const { name, element } of templates) {
  // The email-client plugin judges emails; lint judges everything.
  const plugins =
    name === "swimmer-email" ? [lintPlugin, clientsPlugin] : [lintPlugin];
  const { valid, diagnostics } = validate(element, { plugins });
  errors += diagnostics.filter((d) => d.severity === "error").length;
  warnings += diagnostics.filter((d) => d.severity === "warning").length;
  console.log(`\n== ${name}: ${valid ? "VALID" : "INVALID"} ==`);
  console.log(formatDiagnostics(diagnostics) || "(no findings)");
  console.log(outline(element));
  report.push({ name, valid, diagnostics });
}

await mkdir("out", { recursive: true });
await writeFile(
  "out/checks.json",
  JSON.stringify({ errors, warnings, templates: report }, null, 2),
);

console.log(`\nGate: ${errors} errors, ${warnings} warnings across ${templates.length} templates.`);
if (errors > 0) process.exitCode = 1;

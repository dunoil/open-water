### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
OPEN WATER: Eight events, six lanes, one pool, a swim club meet kit (swimmer email, meet page, printed heat-sheet PDF, lane cards from one meet file)

### Project description

One meet file in → **40 personalised swimmer emails, a 16-page printed heat-sheet PDF, a public meet page and 9 lane cards** out, from one theme and one set of shared components.

A gala's paperwork fails in a predictable way: the email says one heat, the poolside sheet another, and the swimmer reports to the wrong lane, a different heat, a different seed time. This kit makes that impossible by construction. Every event code, seed time, heat and lane lives in one meet file: the email quotes it, the page's cards carry it, and the printed heat sheet prints it next to the secretary's note. Heats and lanes are derived from the seed times by a fixed rule, fastest swimmers in the last heat, fastest in lane 3, then 4, 2, 5, 1, 6, so a seeding correction re-renders every artefact at once.

- **Swimmer email** (`Email` → `render()`), the news leads: your heats are seeded, with the heat, lane and seed of every race, the relay team and swim order, the warm-up and the marshalling call. No Svg, no remote images: the LaneStrip (one square per event, coloured by session) is a `Row` of fixed-width `Column`s, so it survives image-blocking inboxes. The table is the compact four-column form, because a 600px email cannot hold six columns without squeezing the event names; the record is already in the prose. `MergeTag` greeting; plain-text twin from the same render.
- **Meet page** (`Page` → `render()`), deep water hero, the eight-event lane strip, every event as a typed `swim.EventCard` grouped by session (3 morning, 3 afternoon, 2 evening), the relay with its six seeded lanes, the club records, the session schedule, phone styles, no client-side JavaScript.
- **Printed heat sheet** (`Document` → `renderPdf()`), the record pinned by the pool door: page one is the gala itself (numbers, how to read an event), then one page per event, split across two pages when an event has more than twelve seeded entries, then sessions, club records, a three-page swimmer index, and the secretary's note. `PageHeader`/`PageFooter` with `PageNumber`. No browser makes this PDF.
- **Lane cards** (`Canvas` → `renderImage()`), 1080×1080 PNGs: the gala cover, plus one card per event with the session, heats, club record and a six-lane visual, lane 3 in signal yellow, in poster type. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (24 Nov 2026):** 40 swimmer emails · 16 heat-sheet pages in one PDF · 9 lane cards · 8 events, 19 heats, 108 individual entries, 40 swimmers, 6 relay teams, 3 sessions · £720 in entry fees · **gate: 0 errors, 0 warnings** · full batch in **5.0s**.

**Corrections pass:** meet data is deterministic (no clock, no randomness), so fixing one seed time re-renders only that swimmer's email and the affected heat-sheet pages, the other 39 emails are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/open-water

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots, pale aqua paper, deep water blue for shapes and text accents, signal yellow for shapes only, mono event codes, Inter bold headings with tight letter spacing, per-format overrides: the Document and the Canvas are forced to Inter because satori only draws the font bytes it is given. One deliberate constraint shaped it: phone styles are an error in a Document or a Canvas, so the theme carries no `mobile` blocks, Email/Page templates set their own.
- **Shared components across roots** (`Wordmark`, `LaneStrip`, `MeetLine`, `EventTable`, `HeatTable`, `SessionList`) are why the emailed heat and lane and the printed one are the same heat and lane.
- **The mark is built from layout primitives on purpose.** An Email cannot hold an Svg, so the LaneStrip is Rows of fixed-width Columns, and it recolours automatically per event, because the squares are data on the events. An 8-cell strip overflows a hero column, so it splits into rows of 8; the gate's layout check caught that before it shipped. The strip also carries its own explicit width, so it hugs its squares instead of taking an equal share of its Row and pushing the next block to the far side, a layout bug the screenshot review caught on the cover card.
- **A custom element with `defineElement()`**: `swim.EventCard` with typed props (`prop.text`). A mistyped event code or a missing record is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 24 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break.

**Run it:** `npm install && npm run check && npm run render && npm run make` (40 emails) · `npm run make:sample` (4) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind.

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the swimmer email (HTML + plain text), the meet page, the printed heat sheet as a PDF and the lane card PNG, all from the demo run, and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026 for the SOWN entry; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.

Posted: https://github.com/hyper-elements/hyper-elements/discussions/352 (25 Nov 2026)

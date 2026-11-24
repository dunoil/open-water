# Examples, real artefacts from the demo run

Produced by `npm run render` on the sample gala in
`src/data/meet.ts` (OPEN WATER Swim Club, Autumn Gala 2026).
Nothing here is hand-made: if it is in this folder, the
library rendered it.

- `swimmer-email.html` / `swimmer-email.txt`, the swimmer email and its
  plain-text twin (the greeting shows `{{first_name}}` because the
  template uses a MergeTag, which the sending platform fills per
  recipient; the batch personalises the swimmer itself: races, heats,
  lanes, seed times, relay team and swimmer number).
- `meet-page.html`, the public meet page.
- `heat-sheet.pdf`, the printed heat sheet: sixteen A4 pages.
- `lane-card.png`, the gala cover card (1080×1080); the batch makes
  one card per event plus this cover.

Regenerate everything with `npm run check && npm run render`.

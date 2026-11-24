Templates use Hyper Elements (@hyper-elements/react).
If it isn't installed, install it with react and react-dom.
Before writing a template, read node_modules/@hyper-elements/react/GUIDE.md.

Validate every template, fix errors, review warnings, and inspect outline() before rendering.

# OPEN WATER invariants, do not break these

1. ONE source of truth. All content comes from src/data/meet.ts.
   Never hard-code event, swimmer, entry, relay or record data inside a template.
2. ONE theme. All styling tokens live in src/theme.ts (defineTheme).
   Templates refer to tokens with token("..."); they do not invent palettes.
3. The LaneStrip is Rows of fixed-width Columns, never a Grid, never
   an Svg and never an Image. An Email cannot hold an Svg; the strip
   must survive image-blocking inboxes. A Grid mark scatters when its
   columns stretch, the strip is a Row with an explicit width, split
   into rows of 8 (perRow) so it fits a narrow column.
4. No Svg in templates/swimmer-email.tsx. No remote images in the email at all.
5. No margins anywhere. Space between blocks is the parent's gap;
   space inside a box is its padding. Roots take no padding.
6. Styles go in style={{ }}, never as props. A root's width is a prop.
7. typeInk is for text; signal yellow #f5b301 is for shapes. Never set
   body text in bright yellow, contrast fails on paper. Text ink is
   deep water ink #0f2a3d or deep water blue #0b4f6c (>= 4.5:1 on aqua).
   Session colours are dark blue/aqua, text-safe.
8. Every template default-exports its component and sets PreviewProps,
   so `npx hyper-elements check templates/` keeps working.
9. The gate runs first. scripts/check.tsx (or the gate inside
   make-open-water.tsx) must pass before any batch render. Never delete the
   gate to make a run pass.
10. Meet data is deterministic. No Date.now(), no Math.random()
    in src/data/meet.ts, a corrections run must re-render only
    changed records. (Date.now() in the batch script only times the run.)
    Heats and lanes are derived from the seed times by a fixed rule:
    fastest swimmers in the last heat, fastest in lane 3, then 4, 2, 5, 1, 6.

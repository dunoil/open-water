# OPEN WATER, design notes

## Concept

A template kit for a swim club's gala meet. One meet file renders
the swimmer email, the public meet page, the printed heat-sheet PDF
and the lane cards. Domain and style are deliberately the opposite
pole from a warm pottery studio: pale aqua paper `#eef6f8`, deep
water blue `#0b4f6c` for shapes and text accents, signal yellow
`#f5b301` for shapes only, mono event codes, Inter bold headings
with tight letter spacing and uppercase kickers for a clean,
poolside feel.

Signature: the **LaneStrip**, one square per event, coloured by
session (deep blue, aqua, signal yellow), plus the **event stamp**
(OW-E01 … OW-E08) that follows every event from the data file into
the page cards, the email table and the heat-sheet PDF, and the
**six-lane visual** on every lane card, six bars with lane 3, the
fastest lane, in signal yellow. One file, one gala: that is the
product idea and the design idea at once. Heats and lanes are
derived, not typed: the fastest swimmers swim in the last heat,
and within a heat the fastest swimmer takes lane 3, then 4, 2, 5,
1, 6, the standard six-lane seeding.

## Build lessons (from the gate and the screenshot review, all fixed)

1. Theme element defaults are flat style objects, no `style:`
   wrapper, and no nested `elements` inside a Table entry
   (`TableCell` gets its own top-level entry).
2. Theme defaults reject `padding: {x, y}`, use the array form
   `[vertical, horizontal]` there (and, in this version, in Section
   styles too).
3. `TableCell` holds text and inline `Span`s directly, never a
   nested `Text`. Inline runs inside `Text` are `Span`s, not nested
   `Text`s.
4. An Email has no `subject` prop and a root has no padding.
5. A mark built from a Grid scatters if its columns stretch, the
   LaneStrip is Rows of fixed-width Columns with an explicit width.
   An 8-cell strip overflows a hero column, so the strip splits
   into rows of 8 (`perRow`) and the hero keeps the six-cell lane
   mark.
6. **A Document page clips what does not fit; it never flows it
   onto the next page.** Twelve seeded entries per event page,
   sixteen pages in all, and every page verified from the actual
   PDF with `pdfinfo`, not from the print HTML.
7. Inter ships at 400 and 700 only in this kit's font files: a
   heading at 800 draws in the nearest weight and warns in the
   render diagnostics, so headings are 700 throughout.
8. Satori only draws the fonts it is given as bytes: the theme's
   `formats.canvas` forces Inter on Canvas headings and text, while
   the Document keeps Inter too, no serif anywhere in this kit.
9. A stamp `Text` alone in a `Row` stretches to the full width,
   wrap it in a `flex: "none"` Column beside an empty Column so it
   hugs its text.
10. A 600px email cannot hold a six-column table without squeezing
    the event names to one word per line, so the email uses the
    compact table (four columns, no Club record): the email already
    states the record in prose for the swimmer's own events. The
    full table stays in the heat-sheet PDF, where the page is wide
    enough.
11. **A strip without an explicit width takes an equal share of its
    Row.** On the canvas cover card the LaneStrip's wrapper Column
    took half the row and pushed the club name to the far side.
    The fix: the outer Column carries the strip's own width
    (`size * cell + (size - 1) * 3`), so it hugs its squares
    everywhere, canvas, document header and page hero alike.
12. The relay is an event with no individual entries, so a naive
    heat count returns 0 for it and the email prints "0 heats".
    The heat count for the relay is 1 by definition, and the
    total heat count is the sum over events, relay included.
    Count the relay as an event everywhere, or the numbers stop
    agreeing between the email, the page and the sheet.
13. Deterministic data is a feature, not a nicety: the eight
    events, 40 swimmers, 108 entries and six relay teams are fixed
    arrays, heats and lanes are derived from the seed times, and
    the batch's counts (19 heats, £720 in entry fees) are computed
    from them, never typed. Read the outline, not just the error
    count.

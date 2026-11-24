import {
  Column,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { Meet, MeetEvent, SeededEntry } from "../data/meet";
import {
  SESSION_COLORS,
  SESSION_LABELS,
  events,
  heatCount,
  sessions,
} from "../data/meet";

/**
 * Shared components, plain functions returning elements, used under
 * several roots, which is exactly why the emailed heat and lane
 * and the printed one can never disagree about a heat or a lane.
 */

/**
 * The LaneStrip: one square per event, coloured by that event's
 * session. Built from a Row of fixed-width Columns with an
 * explicit width, never a Grid, never an Svg, never an image,
 * because an Email cannot hold an Svg and inboxes block images.
 * It is the gala, drawn as eight lanes.
 */
export function LaneStrip({
  events: evts,
  cell = 12,
  perRow,
}: {
  events: MeetEvent[];
  cell?: number;
  /** Split the strip into rows of this many squares, so a long strip fits a narrow column. */
  perRow?: number;
}) {
  const rows: MeetEvent[][] = [];
  const size = perRow ?? evts.length;
  for (let i = 0; i < evts.length; i += size) {
    rows.push(evts.slice(i, i + size));
  }
  // The strip hugs its squares: without an explicit width the outer
  // Column takes an equal share of its Row and the next block sits
  // far to the right (seen on the canvas cover card).
  const width = size * cell + (size - 1) * 3;
  return (
    <Column style={{ gap: 3, width }}>
      {rows.map((row, r) => (
        <Row
          key={r}
          style={{ gap: 3, width: row.length * cell + (row.length - 1) * 3 }}
          stackOnMobile={false}
        >
          {row.map((t, i) => (
            <Column
              key={t.code}
              style={{
                backgroundColor: SESSION_COLORS[t.session],
                border: {
                  width: 1,
                  style: "solid",
                  color: SESSION_COLORS[t.session],
                },
                width: cell,
                height: cell,
                borderRadius: 2,
              }}
            />
          ))}
        </Row>
      ))}
    </Column>
  );
}

export function Wordmark({ meet }: { meet: Meet }) {
  // Six lane squares, deep blue and signal alternating, a Row of
  // fixed-width Columns with an explicit width.
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <Row
        style={{ gap: 3, width: 6 * 9 + 5 * 3 }}
        stackOnMobile={false}
      >
        {cells.map((i) => (
          <Column
            key={i}
            style={{
              backgroundColor: i % 2 === 0 ? "#0b4f6c" : "#f5b301",
              border: {
                width: 1,
                style: "solid",
                color: i % 2 === 0 ? "#0b4f6c" : "#f5b301",
              },
              width: 9,
              height: 9,
              borderRadius: 2,
            }}
          />
        ))}
      </Row>
      <Column style={{ gap: 0 }}>
        <Text style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>
          {meet.name.toUpperCase()}
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          {meet.galaLabel} · {meet.dateLabel}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** The gala in one line. Used by email, page, canvas. */
export function MeetLine({ meet }: { meet: Meet }) {
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {`${meet.galaLabel} · ${meet.dateLabel} · Warm-up ${meet.warmUp} · ${meet.venue}`}
    </Text>
  );
}

/** The event board, as a table, email, page and heat-sheet PDF.
 *  TableCells hold text and inline Spans directly, never a nested Text.
 *  `compact` drops the Record column: a 600px email cannot hold six
 *  columns without squeezing the event names, and the email already
 *  states the record in prose for the swimmer's own events. */
export function EventTable({
  events: evts,
  compact = false,
}: {
  events: MeetEvent[];
  compact?: boolean;
}) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Event</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Session</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Time</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Heats</Span>
        </TableCell>
        {compact ? null : (
          <TableCell>
            <Span style={{ fontWeight: 700 }}>Club record</Span>
          </TableCell>
        )}
      </TableRow>
      {evts.map((e) => (
        <TableRow key={e.code}>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{e.code}</Span>
            {` ${e.name}`}
          </TableCell>
          <TableCell>{SESSION_LABELS[e.session]}</TableCell>
          <TableCell>{e.time}</TableCell>
          <TableCell>{heatCount(e.code)}</TableCell>
          {compact ? null : (
            <TableCell>
              {e.recordTime} · {e.recordHolder}
            </TableCell>
          )}
        </TableRow>
      ))}
    </Table>
  );
}

/** One event's seeded heat sheet: heat, lane, swimmer, age group, seed. */
export function HeatTable({ seeded }: { seeded: SeededEntry[] }) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Heat</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Lane</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Swimmer</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Age</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Seed</Span>
        </TableCell>
      </TableRow>
      {seeded.map((s) => (
        <TableRow key={`${s.heat}-${s.lane}`}>
          <TableCell>{s.heat}</TableCell>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{s.lane}</Span>
          </TableCell>
          <TableCell>
            <Span style={{ fontWeight: 700 }}>{s.swimmer.name}</Span>
            {` · ${s.swimmer.id}`}
          </TableCell>
          <TableCell>{s.swimmer.ageGroup}</TableCell>
          <TableCell>{s.seed}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** The three sessions, page and heat-sheet PDF. */
export function SessionList() {
  return (
    <Column style={{ gap: 6 }}>
      {sessions.map((s) => (
        <Text key={s.no}>
          <Span style={{ fontWeight: 700 }}>
            {s.label}, {s.time}
          </Span>
          {` · ${events
            .filter((e) => e.session === s.no)
            .map((e) => e.code)
            .join(", ")}`}
        </Text>
      ))}
    </Column>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        OPEN WATER Swim Club · 14 Harbour Lane, Bristol · One gala
        at a time, every heat seeded by time
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One meet file rendered this, email, page, heat sheet, and
        lane cards, with Hyper Elements.
      </Text>
    </Column>
  );
}

export function MeetHeading({ meet }: { meet: Meet }) {
  return (
    <Column style={{ gap: 8 }}>
      <Eyebrow>{`${meet.name} presents`}</Eyebrow>
      <Text
        style={{
          fontWeight: 700,
          fontSize: 34,
          lineHeight: 1.2,
        }}
      >
        OPEN WATER, eight events, six lanes, one pool
      </Text>
      <Text style={{ fontSize: 17 }}>
        {meet.galaLabel} · {meet.dateLabel} · Warm-up {meet.warmUp}
      </Text>
    </Column>
  );
}

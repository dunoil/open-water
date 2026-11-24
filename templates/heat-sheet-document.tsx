import {
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@hyper-elements/react";
import { meet, events, relayTeams, swimmers } from "../src/data/meet";
import type { Meet } from "../src/data/meet";
import {
  SESSION_LABELS,
  heatCount,
  racesForSwimmer,
  seededEntries,
  seededRelay,
  swimmerFor,
  totalEntries,
  totalFees,
  totalHeats,
} from "../src/data/meet";
import { openWaterTheme } from "../src/theme";
import { LaneStrip, HeatTable, SessionList } from "../src/components/shared";

/**
 * OUTPUT 3, The printed heat sheet (Document root ->
 * print HTML via render(), PDF via renderPdf() from
 * @hyper-elements/react/pdf).
 *
 * The formal record pinned by the pool door: page one is the gala
 * itself (pitch, numbers, how to read an event); then one page
 * per event, split across two pages when an event has more than
 * twelve seeded entries; the last page is the session schedule,
 * the club records, the relay teams and the secretary's note.
 * Each page carries the same lane strip the email sent, and the
 * footer counts the pages, written for a human holding paper, not
 * a browser print button. Twelve entries per event page, so no
 * table row is ever cut off at a page edge: a Document page clips
 * what does not fit, it never flows it onto the next page.
 */
export function HeatSheetDocument({ meet: m = meet }: { meet?: Meet }) {
  const PER_PAGE = 12;
  return (
    <Document
      theme={openWaterTheme}
      size="A4"
      margin={42}
      title={`${m.name}, ${m.galaLabel} heat sheet`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <LaneStrip events={events.slice(0, 6)} cell={8} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {m.name} · {m.galaLabel} · {m.dateLabel} · Heat sheet
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#47606e" }}>
          Page <PageNumber /> of <PageNumber total /> · One meet
          file rendered this sheet · {m.name} · {m.dateLabel}
        </Text>
      </PageFooter>

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Text style={{ apply: ["eyebrow"] }}>
            {m.name} presents
          </Text>
          <Heading level={1} style={{ fontSize: 28 }}>
            OPEN WATER, eight events, six lanes, one pool
          </Heading>
          <Text>
            {m.galaLabel} · {m.dateLabel} · {m.venue} · Warm-up{" "}
            {m.warmUp} · {m.address} · {m.secretary}
          </Text>
        </Column>

        <Text>{m.pitch}</Text>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>The gala in numbers</Heading>
          <Text>
            {events.length} events · {totalHeats()} heats ·{" "}
            {totalEntries()} individual entries · {swimmers.length}{" "}
            swimmers · {relayTeams.length} relay teams · £
            {totalFees()} in entry fees · {events.length} club
            records on the line.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>How to read an event</Heading>
          <Text>
            Every event carries its code, the session and time, the
            heats, and the club record. Heats are seeded by time:
            the fastest swimmers swim in the last heat, and within a
            heat the fastest swimmer takes lane 3, the next lane 4,
            then 2, 5, 1, 6. Report to the marshalling area two heats
            before yours. Warm-up opens at {m.warmUp}.
          </Text>
        </Column>
      </Document.Page>

      {events.map((event) => {
        if (event.code === "OW-E08") {
          const relay = seededRelay();
          return (
            <Document.Page key={event.code} style={{ gap: 16 }}>
              <Column style={{ gap: 4 }}>
                <Heading level={1} style={{ fontSize: 28 }}>
                  {event.code} · {event.name}
                </Heading>
                <Text>
                  {SESSION_LABELS[event.session]} · {event.time} ·
                  1 heat · 6 teams · Club record {event.recordTime}{" "}
                  · {event.recordHolder}
                </Text>
              </Column>
              <Text>{event.blurb}</Text>
              <Table>
                <TableRow header>
                  <TableCell>
                    <Span style={{ fontWeight: 700 }}>Lane</Span>
                  </TableCell>
                  <TableCell>
                    <Span style={{ fontWeight: 700 }}>Team</Span>
                  </TableCell>
                  <TableCell>
                    <Span style={{ fontWeight: 700 }}>Swimmers</Span>
                  </TableCell>
                  <TableCell>
                    <Span style={{ fontWeight: 700 }}>Seed</Span>
                  </TableCell>
                </TableRow>
                {relay.map((r) => (
                  <TableRow key={r.team.code}>
                    <TableCell>
                      <Span style={{ fontWeight: 700 }}>{r.lane}</Span>
                    </TableCell>
                    <TableCell>
                      <Span style={{ fontWeight: 700 }}>{r.team.name}</Span>
                      {` · ${r.team.code}`}
                    </TableCell>
                    <TableCell>
                      {r.team.swimmers
                        .map((id) => swimmerFor(id).name)
                        .join(", ")}
                    </TableCell>
                    <TableCell>{r.seed}</TableCell>
                  </TableRow>
                ))}
              </Table>
            </Document.Page>
          );
        }
        const seeded = seededEntries(event.code);
        const chunks: (typeof seeded)[] = [];
        for (let i = 0; i < seeded.length; i += PER_PAGE) {
          chunks.push(seeded.slice(i, i + PER_PAGE));
        }
        return chunks.map((chunk, ci) => (
          <Document.Page key={`${event.code}-${ci}`} style={{ gap: 16 }}>
            <Column style={{ gap: 4 }}>
              <Heading level={1} style={{ fontSize: 28 }}>
                {event.code} · {event.name}
                {chunks.length > 1 ? ` (${ci + 1} of ${chunks.length})` : ""}
              </Heading>
              <Text>
                {SESSION_LABELS[event.session]} · {event.time} ·{" "}
                {heatCount(event.code)}{" "}
                {heatCount(event.code) === 1 ? "heat" : "heats"} ·{" "}
                {seeded.length} entries · Club record{" "}
                {event.recordTime} · {event.recordHolder}
              </Text>
            </Column>
            <Text>{event.blurb}</Text>
            <HeatTable seeded={chunk} />
          </Document.Page>
        ));
      })}

      <Document.Page style={{ gap: 16 }}>
        <Column style={{ gap: 4 }}>
          <Heading level={1} style={{ fontSize: 28 }}>
            Sessions, records, and a note from the secretary
          </Heading>
          <Text>
            When each session starts, what the club records are,
            who swims in the relay, and what Dana wants every
            swimmer to know.
          </Text>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Session schedule (3 sessions)</Heading>
          <SessionList />
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>Club records ({events.length})</Heading>
          <Column style={{ gap: 6 }}>
            {events.map((e) => (
              <Text key={e.code}>
                {e.name} ({e.code}) · {e.recordTime} · {e.recordHolder}
              </Text>
            ))}
          </Column>
        </Column>

        <Column style={{ gap: 8 }}>
          <Heading level={3}>A note from the secretary</Heading>
          <Text>{m.secretaryNote}</Text>
        </Column>

        <Column
          style={{
            gap: 6,
            padding: { top: 12 },
            border: { top: "1px dashed #47606e" },
          }}
        >
          <Text style={{ fontWeight: 700 }}>
            Eight events, six lanes, one pool, keep this sheet.
          </Text>
          <Text>
            It is the record of the gala: the same heats, lanes and
            seed times your email carried and the page still shows.
          </Text>
        </Column>
      </Document.Page>

      {[0, 1, 2].map((pi) => {
        const group = swimmers.slice(pi * 14, pi * 14 + 14);
        return (
          <Document.Page key={`swimmers-${pi}`} style={{ gap: 16 }}>
            <Column style={{ gap: 4 }}>
              <Heading level={1} style={{ fontSize: 28 }}>
                Who swims what ({pi + 1} of 3)
              </Heading>
              <Text>
                Every swimmer, with the heat and lane of each race.
              </Text>
            </Column>
            <Column style={{ gap: 6 }}>
              {group.map((s) => (
                <Text key={s.id}>
                  {s.name} ({s.id}, {s.ageGroup}):{" "}
                  {racesForSwimmer(s.id)
                    .map(
                      (r) =>
                        `${r.event.code} heat ${r.heat} lane ${r.lane}`,
                    )
                    .join(", ")}
                </Text>
              ))}
            </Column>
          </Document.Page>
        );
      })}
    </Document>
  );
}

HeatSheetDocument.PreviewProps = { meet };
export default HeatSheetDocument;

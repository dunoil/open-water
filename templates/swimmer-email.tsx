import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
} from "@hyper-elements/react";
import { meet, sampleSwimmer } from "../src/data/meet";
import type { Meet, Swimmer } from "../src/data/meet";
import {
  SESSION_LABELS,
  entries,
  racesForSwimmer,
  relayTeamFor,
  swimmers,
} from "../src/data/meet";
import { openWaterTheme } from "../src/theme";
import {
  MeetLine,
  KitFooter,
  EventTable,
  Wordmark,
} from "../src/components/shared";
import { events } from "../src/data/meet";

/**
 * OUTPUT 1, The swimmer email (Email root -> email-safe HTML + a
 * plain-text twin from the same render).
 *
 * No Svg, no remote images: the LaneStrip is layout, so the
 * seeding survives image-blocking inboxes. The news leads, a
 * swimmer email is, first, the verdict on the swimmer's races:
 * every heat and lane, seeded by time, with the session and the
 * warm-up.
 */
export function SwimmerEmail({
  meet: m = meet,
  swimmer = sampleSwimmer,
}: {
  meet?: Meet;
  swimmer?: Swimmer;
}) {
  const races = racesForSwimmer(swimmer.id);
  const relay = relayTeamFor(swimmer.id);
  const first = races[0];
  const news =
    races.length === 1
      ? `Good news: your race is seeded, ${first.event.name} at ${first.event.time}, heat ${first.heat}, lane ${first.lane}.`
      : `Good news: your ${races.length} races are seeded, first ${first.event.name} at ${first.event.time}, heat ${first.heat}, lane ${first.lane}.`;
  const warmUp =
    `Warm-up opens at ${m.warmUp} on ${m.dateLabel}, at ${m.venue}, ${m.address}. Report to the marshalling area two heats before yours, and check in with the timekeeper at the end of your lane.`;
  return (
    <Email
      theme={openWaterTheme}
      width={600}
      previewText={`${swimmer.id}, ${news}`}
      title={`${m.name}, Gala entry ${swimmer.id}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark meet={m} />
        <Heading level={1} style={{ mobile: { fontSize: 26 } }}>
          Your heats are seeded, <MergeTag name="first_name" />
        </Heading>
        <Text style={{ fontSize: 17, fontWeight: 700 }}>{news}</Text>
        <Text>{warmUp}</Text>
        <MeetLine meet={m} />
        <Table>
          <TableRow header>
            <TableCell>
              <Span style={{ fontWeight: 700 }}>Event</Span>
            </TableCell>
            <TableCell>
              <Span style={{ fontWeight: 700 }}>Heat</Span>
            </TableCell>
            <TableCell>
              <Span style={{ fontWeight: 700 }}>Lane</Span>
            </TableCell>
            <TableCell>
              <Span style={{ fontWeight: 700 }}>Seed</Span>
            </TableCell>
          </TableRow>
          {races.map((r) => (
            <TableRow key={r.event.code}>
              <TableCell>
                <Span style={{ fontWeight: 700 }}>{r.event.code}</Span>
                {` ${r.event.name}`}
              </TableCell>
              <TableCell>{r.heat}</TableCell>
              <TableCell>
                <Span style={{ fontWeight: 700 }}>{r.lane}</Span>
              </TableCell>
              <TableCell>{r.seed}</TableCell>
            </TableRow>
          ))}
        </Table>
        {relay ? (
          <Text style={{ fontSize: 14 }}>
            <Span style={{ fontWeight: 700 }}>Relay: </Span>
            {relay.name} ({relay.code}), 4x50m freestyle, heat{" "}
            {races.find((r) => r.event.code === "OW-E08")?.heat}, lane{" "}
            {races.find((r) => r.event.code === "OW-E08")?.lane}, seed{" "}
            {relay.seed}. Swim order:{" "}
            {relay.swimmers
              .map((id) => swimmers.find((s) => s.id === id)?.name)
              .join(", ")}
            .
          </Text>
        ) : null}
        <Text style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700 }}>Swimmer: </Span>
          {swimmer.id} ·{" "}
          <Span style={{ fontWeight: 700 }}>Age group: </Span>
          {swimmer.ageGroup} ·{" "}
          <Span style={{ fontWeight: 700 }}>Races: </Span>
          {races.length} ·{" "}
          <Span style={{ fontWeight: 700 }}>Sessions: </Span>
          {[...new Set(races.map((r) => SESSION_LABELS[r.event.session]))].join(", ")}
          .
        </Text>
        <Text style={{ fontSize: 14 }}>
          {races
            .map(
              (r) =>
                `${r.event.name}, ${r.event.time}, heat ${r.heat}, lane ${r.lane}`,
            )
            .join("; ")}
          .
        </Text>
        <Heading level={2}>The gala</Heading>
        <Text>
          {m.galaLabel} runs {m.dateLabel}: eight events,{" "}
          {entries.length} individual entries, six relay teams, three
          sessions from 09:30 to the last relay.
        </Text>
        <EventTable events={events} compact />
        <Button href="https://openwater.example/gala/2026">
          See the full gala
        </Button>
        <Text style={{ apply: ["quiet"] }}>
          Swimmer {swimmer.id} · {m.name}, {m.galaLabel},{" "}
          {m.dateLabel}.
        </Text>
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive this email because you entered the gala at OPEN
        WATER Swim Club.{" "}
        <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

SwimmerEmail.PreviewProps = { meet, swimmer: sampleSwimmer };
export default SwimmerEmail;

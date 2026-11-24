import {
  Button,
  Column,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Span,
  Text,
  token,
} from "@hyper-elements/react";
import { meet, events, relayTeams, swimmers } from "../src/data/meet";
import type { Meet } from "../src/data/meet";
import {
  SESSION_LABELS,
  entries,
  eventsForSession,
  heatCount,
  seededRelay,
  swimmerFor,
  totalEntries,
  totalFees,
  totalHeats,
} from "../src/data/meet";
import { openWaterTheme } from "../src/theme";
import {
  MeetLine,
  LaneStrip,
  KitFooter,
  SessionList,
} from "../src/components/shared";
import { EventCard } from "../src/components/event-card";

/**
 * OUTPUT 2, The public meet page (Page root -> responsive web
 * HTML, no client-side JavaScript).
 *
 * The email's public twin. Where the email must survive Outlook,
 * the page gets the full aquatic treatment: a deep water hero, the
 * eight-event lane strip, every event as a typed swim.EventCard
 * grouped by session, the club records, the relay teams and the
 * session schedule.
 */
export function MeetPage({ meet: m = meet }: { meet?: Meet }) {
  const session1 = eventsForSession(1);
  const session2 = eventsForSession(2);
  const session3 = eventsForSession(3);
  const relay = seededRelay();
  return (
    <Page
      theme={openWaterTheme}
      width={1100}
      title={`OPEN WATER, ${m.galaLabel} · ${m.dateLabel}`}
      description={m.pitch}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#083049",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#eaf4f7",
            muted: "#b8d4de",
            primary: "#f5d76e",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#b8d4de",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${m.name} · ${m.galaLabel}`}
            </Text>
            <Heading
              level={1}
              style={{ fontSize: 46, mobile: { fontSize: 32 } }}
            >
              OPEN WATER, eight events, six lanes, one pool
            </Heading>
            <Text style={{ fontSize: 17 }}>
              {m.dateLabel} · {m.venue} · Warm-up {m.warmUp} ·{" "}
              {m.address} · {m.secretary}
            </Text>
            <Text style={{ fontSize: 17 }}>{m.pitch}</Text>
            <MeetLine meet={m} />
            <Row style={{ gap: 12 }}>
              <Button href="https://openwater.example/gala/2026/enter">
                Enter the gala
              </Button>
              <Button
                href="https://openwater.example/gala/2026"
                variant="secondary"
                style={{ color: "#0f2a3d" }}
              >
                Visit the pool
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 10 }}>
            <LaneStrip events={events.slice(0, 6)} cell={14} />
            <Text style={{ apply: ["quiet"], color: "#b8d4de" }}>
              The lane mark: one square per event, coloured by
              session, the same mark your email and heat sheet carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <Heading level={2}>The gala in numbers</Heading>
        <Text style={{ fontSize: 17 }}>
          {events.length} events · {totalHeats()} heats ·{" "}
          {totalEntries()} individual entries · {swimmers.length}{" "}
          swimmers · {relayTeams.length} relay teams · £{totalFees()}{" "}
          in entry fees.
        </Text>
        <LaneStrip events={events} cell={12} perRow={8} />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          The lane strip: one square per event, coloured by session,
          in event code order.
        </Text>

        <Heading level={2}>Session 1, morning ({session1.length})</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {session1.map((e) => (
            <EventCard
              key={e.code}
              code={e.code}
              name={e.name}
              stroke={e.stroke}
              session={SESSION_LABELS[e.session]}
              time={e.time}
              heats={String(heatCount(e.code))}
              record={e.recordTime}
              recordHolder={e.recordHolder}
              entries={`${entries.filter((x) => x.eventCode === e.code).length} entries`}
              fee="£6"
            />
          ))}
        </Grid>

        <Heading level={2}>Session 2, afternoon ({session2.length})</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {session2.map((e) => (
            <EventCard
              key={e.code}
              code={e.code}
              name={e.name}
              stroke={e.stroke}
              session={SESSION_LABELS[e.session]}
              time={e.time}
              heats={String(heatCount(e.code))}
              record={e.recordTime}
              recordHolder={e.recordHolder}
              entries={`${entries.filter((x) => x.eventCode === e.code).length} entries`}
              fee="£6"
            />
          ))}
        </Grid>

        <Heading level={2}>Session 3, evening ({session3.length})</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {session3.map((e) => (
            <EventCard
              key={e.code}
              code={e.code}
              name={e.name}
              stroke={e.stroke}
              session={SESSION_LABELS[e.session]}
              time={e.time}
              heats={String(heatCount(e.code))}
              record={e.recordTime}
              recordHolder={e.recordHolder}
              entries={
                e.code === "OW-E08"
                  ? `${relayTeams.length} teams`
                  : String(entries.filter((x) => x.eventCode === e.code).length)
              }
              fee={e.code === "OW-E08" ? "£12 per team" : "£6"}
            />
          ))}
        </Grid>

        <Heading level={2}>The relay, one heat ({relay.length} teams)</Heading>
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Six teams, six lanes, the gala closer. Fastest team in lane
          3, the rest seeded out from the middle.
        </Text>
        <Column style={{ gap: 6 }}>
          {relay.map((r) => (
            <Text key={r.team.code}>
              <Span style={{ fontWeight: 700 }}>
                Lane {r.lane} · {r.team.name} ({r.team.code})
              </Span>
              {` · seed ${r.seed} · ${r.team.swimmers.map((id) => swimmerFor(id).name).join(", ")}`}
            </Text>
          ))}
        </Column>

        <Heading level={2}>Club records ({events.length})</Heading>
        <Column style={{ gap: 6 }}>
          {events.map((e) => (
            <Text key={e.code}>
              <Span style={{ fontWeight: 700 }}>
                {e.name} ({e.code})
              </Span>
              {` · ${e.recordTime} · ${e.recordHolder} · ${e.blurb}`}
            </Text>
          ))}
        </Column>

        <Heading level={2}>Session schedule</Heading>
        <SessionList />
        <Text style={{ color: token("colors.muted"), fontSize: 13 }}>
          Questions: {m.contact}. {m.galaLabel} runs {m.dateLabel},
          warm-up {m.warmUp}, at {m.venue}, {m.address}.
        </Text>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

MeetPage.PreviewProps = { meet };
export default MeetPage;

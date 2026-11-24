import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
} from "@hyper-elements/react";
import { meet, events, relayTeams, swimmers } from "../src/data/meet";
import type { Meet, MeetEvent } from "../src/data/meet";
import {
  SESSION_LABELS,
  heatCount,
  seededEntries,
  totalEntries,
  totalFees,
  totalHeats,
} from "../src/data/meet";
import { openWaterTheme } from "../src/theme";
import { LaneStrip } from "../src/components/shared";

/**
 * OUTPUT 4, The lane card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square social card rendered on the server with renderImage().
 * The batch makes nine cards: the gala cover, plus one per event.
 * Fonts are passed in as bytes by the scripts; nothing is
 * fetched. The theme's canvas format forces Inter here, satori
 * only has the Inter bytes we give it. The Canvas root takes no
 * tokens prop; colours are set on the elements directly.
 *
 * The lane visual is six bars, one per lane, built from layout
 * Columns: lane 3, the fastest lane, is signal yellow, the rest
 * are aqua, so the card reads as a pool seen from above.
 */
export function LaneCard({
  meet: m = meet,
  event,
}: {
  meet?: Meet;
  event?: MeetEvent;
}) {
  const isCover = !event;
  const seeded = event && event.code !== "OW-E08" ? seededEntries(event.code) : [];
  return (
    <Canvas
      theme={openWaterTheme}
      width={1080}
      height={1080}
      title={
        isCover
          ? `${m.name}, ${m.galaLabel} cover`
          : `${event.name}, ${event.code}`
      }
      lang="en"
      style={{
        padding: 72,
        gap: 28,
        justifyContent: "space-between",
        backgroundColor: "#083049",
      }}
    >
      <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
        <LaneStrip events={events.slice(0, 6)} cell={16} />
        <Column style={{ gap: 0 }}>
          <Text
            style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2, color: "#eaf4f7" }}
          >
            {m.name.toUpperCase()}
          </Text>
          <Text style={{ fontSize: 20, color: "#b8d4de" }}>
            {m.galaLabel} · {m.dateLabel}
          </Text>
        </Column>
      </Row>

      <Column style={{ gap: 24 }}>
        <Column style={{ backgroundColor: "#f5b301", height: 18, borderRadius: 4 }} />
        {isCover ? (
          <>
            <Text style={{ apply: ["eyebrow"], fontSize: 20, color: "#b8d4de" }}>
              {`${m.galaLabel} · ${m.dateLabel}`}
            </Text>
            <Heading
              level={1}
              style={{
                fontSize: 96,
                lineHeight: 1.1,
                color: "#eaf4f7",
              }}
            >
              Eight events. Six lanes. One pool.
            </Heading>
            <Text style={{ fontSize: 28, color: "#eaf4f7" }}>
              {events.length} events · {totalHeats()} heats ·{" "}
              {totalEntries()} entries · {swimmers.length} swimmers.
            </Text>
          </>
        ) : (
          <>
            <Text style={{ apply: ["eyebrow"], fontSize: 20, color: "#b8d4de" }}>
              {`${event.code} · ${SESSION_LABELS[event.session]} · ${event.time}`}
            </Text>
            <Heading
              level={1}
              style={{
                fontSize: 88,
                lineHeight: 1.1,
                color: "#eaf4f7",
              }}
            >
              {event.name}
            </Heading>
            <Text style={{ fontSize: 28, color: "#eaf4f7" }}>
              {event.code === "OW-E08"
                ? `${relayTeams.length} teams · 1 heat · Club record ${event.recordTime} · ${event.recordHolder}`
                : `${heatCount(event.code)} ${heatCount(event.code) === 1 ? "heat" : "heats"} · ${seeded.length} entries · Club record ${event.recordTime} · ${event.recordHolder}`}
            </Text>
            <Text style={{ fontSize: 28, color: "#b8d4de" }}>
              {event.blurb}
            </Text>
          </>
        )}
      </Column>

      <Column style={{ gap: 10 }}>
        {[1, 2, 3, 4, 5, 6].map((lane) => (
          <Row key={lane} style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
            <Text style={{ fontSize: 18, color: "#b8d4de", width: 70 }}>
              Lane {lane}
            </Text>
            <Column
              style={{
                backgroundColor: lane === 3 ? "#f5b301" : "#1b7f9e",
                width: 936 - 72 - 70 - 12 - lane * 40,
                height: 16,
                borderRadius: 3,
              }}
            />
          </Row>
        ))}
      </Column>

      <Column style={{ gap: 14 }}>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#b8d4de" }}>
          {`${events.length} events · ${totalHeats()} heats · ${totalEntries()} entries · ${swimmers.length} swimmers`}
        </Text>
        <Text style={{ apply: ["mono"], fontSize: 22, color: "#b8d4de" }}>
          {`${relayTeams.length} relay teams · 3 sessions · £${totalFees()} in entry fees`}
        </Text>
        <Text style={{ fontSize: 20, color: "#b8d4de" }}>
          {m.name} · {m.secretary} · {m.contact}
        </Text>
      </Column>
    </Canvas>
  );
}

LaneCard.PreviewProps = { meet };
export default LaneCard;

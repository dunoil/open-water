import { Column, Row, Span, Text, defineElement, prop, token } from "@hyper-elements/react";

/**
 * `swim.EventCard`, one event, as a club card: a deep rule, the
 * event code stamp, the name and stroke, the session and time, the
 * heats, the club record, and the entries count.
 *
 * A custom element because the event is the kit's unit of reuse:
 * the page lists eight of them, and a mistyped event code or a
 * missing record should be a diagnostic with a path, not a broken
 * page. Props are typed with the prop.* builders, so the checker and
 * the editor both enforce them.
 */
export const EventCard = defineElement({
  type: "swim.EventCard",
  label: "Event card",
  description:
    "One event: code, name, stroke, session, time, heats, club record holder and time, entries and fee.",
  props: {
    code: prop.text({ label: "Event code", required: true }),
    name: prop.text({ label: "Name", required: true }),
    stroke: prop.text({ label: "Stroke", required: true }),
    session: prop.text({ label: "Session", required: true }),
    time: prop.text({ label: "Time", required: true }),
    heats: prop.text({ label: "Heats", required: true }),
    record: prop.text({ label: "Club record", required: true }),
    recordHolder: prop.text({ label: "Record holder", required: true }),
    entries: prop.text({ label: "Entries", required: true }),
    fee: prop.text({ label: "Entry fee", required: true }),
  },
  render: ({ code, name, stroke, session, time, heats, record, recordHolder, entries, fee }) => {
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: { width: 1, style: "solid", color: token("colors.border") },
          borderRadius: 6,
          padding: 18,
        }}
      >
        <Column style={{ apply: ["deepRule"], width: 48 }} />
        <Text
          style={{
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          {name}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 700 }}>
          {stroke} · {session}
        </Text>
        <Text style={{ fontSize: 14 }}>
          {time} · {heats} {heats === "1" ? "heat" : "heats"} ·{" "}
          {entries}
        </Text>
        <Text style={{ fontSize: 14 }}>
          Club record: {record} · {recordHolder}
        </Text>
        <Text style={{ fontSize: 14 }}>Entry fee: {fee}</Text>
        <Row style={{ gap: 0 }} stackOnMobile={false}>
          <Column style={{ flex: "none" }}>
            <Text style={{ apply: ["stamp"], color: "#0b4f6c" }}>
              {code.toUpperCase()}
            </Text>
          </Column>
          <Column />
        </Row>
        <Text style={{ fontSize: 14 }}>
          <Span style={{ fontWeight: 700, color: "#0b4f6c" }}>
            Heats seeded
          </Span>
        </Text>
      </Column>
    );
  },
});

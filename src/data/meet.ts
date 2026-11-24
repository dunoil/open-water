/**
 * The meet file, the kit's single source of truth.
 *
 * One record set renders the swimmer email, the public meet page,
 * the printed heat-sheet PDF and the lane cards. Change `meet`,
 * `events`, `swimmers`, `entries` or `relayTeams` and every
 * artefact agrees, because every artefact reads this file.
 *
 * Everything here is fixed text: no clock, no randomness. Heats
 * and lanes are derived from the seed times by a fixed rule, so a
 * corrections run re-renders only the records that changed.
 */

export type SessionNo = 1 | 2 | 3;

export interface MeetEvent {
  /** "OW-E01", the event code printed on every artefact. */
  code: string;
  /** "50m Freestyle" */
  name: string;
  /** "Freestyle" */
  stroke: string;
  /** 50 */
  distance: number;
  session: SessionNo;
  /** "09:30" */
  time: string;
  /** Club record holder, e.g. "Mara Voss, 2024" */
  recordHolder: string;
  /** Club record time, e.g. "25.80" */
  recordTime: string;
  /** One line about the event, for the page and the card. */
  blurb: string;
}

export interface Swimmer {
  /** "OW-SW-01" */
  id: string;
  name: string;
  /** "12-13" */
  ageGroup: string;
}

export interface Entry {
  /** Swimmer id, e.g. "OW-SW-01" */
  swimmerId: string;
  /** Event code, e.g. "OW-E01" */
  eventCode: string;
  /** Seed time, "28.40" or "1:02.35" */
  seed: string;
}

export interface RelayTeam {
  /** "OW-R01" */
  code: string;
  name: string;
  /** Four swimmer ids, in swim order. */
  swimmers: [string, string, string, string];
  /** Seed time, "1:52.30" */
  seed: string;
}

export interface Meet {
  name: string;
  /** "Autumn Gala 2026" */
  galaLabel: string;
  /** "Saturday 12 December 2026" */
  dateLabel: string;
  /** "Harbour Lane Pool, 25m, 6 lanes" */
  venue: string;
  address: string;
  /** "08:30" */
  warmUp: string;
  secretary: string;
  /** One-paragraph pitch used by the email and the page hero. */
  pitch: string;
  /** The secretary's note, printed in the heat-sheet PDF. */
  secretaryNote: string;
  contact: string;
}

export const meet: Meet = {
  name: "OPEN WATER Swim Club",
  galaLabel: "Autumn Gala 2026",
  dateLabel: "Saturday 12 December 2026",
  venue: "Harbour Lane Pool, 25m, 6 lanes",
  address: "14 Harbour Lane, Bristol",
  warmUp: "08:30",
  secretary: "Dana Whitfield",
  pitch:
    "Eight events, six lanes, one pool. OPEN WATER is a small swim club that races one gala at a time: every swimmer is seeded by time, every heat is drawn by lane, and every result lands on the same sheet your email carried. This gala has 40 swimmers across eight events, 108 individual entries and six relay teams, three sessions from 09:30 to the last relay, and eight club records on the line. The list below is the whole gala, with the heat, the lane, the seed time and the club record of every event.",
  secretaryNote:
    "Thank you for entering, for turning up to warm-up on time, and for trusting us with your seed times. A heat sheet is a promise: the heat and lane on your email are the heat and lane you swim in, and we do not move a swimmer to fit a timetable. If your event says heats seeded, your lane is drawn and fixed. Report to the marshalling area two heats before yours, and check in with the timekeeper at the end of your lane. If a record falls, the board by the pool is updated before the next session, and the swimmer's name goes on it in full. Dana Whitfield, OPEN WATER Swim Club",
  contact: "hello@openwater.example",
};

export const sessions: { no: SessionNo; label: string; time: string }[] = [
  { no: 1, label: "Session 1, morning", time: "09:30" },
  { no: 2, label: "Session 2, afternoon", time: "13:30" },
  { no: 3, label: "Session 3, evening", time: "16:00" },
];

export const events: MeetEvent[] = [
  { code: "OW-E01", name: "50m Freestyle", stroke: "Freestyle", distance: 50, session: 1, time: "09:30", recordHolder: "Mara Voss, 2024", recordTime: "25.80", blurb: "The sprint that opens the gala: one length, no breathing room, the fastest 50 metres in the club." },
  { code: "OW-E02", name: "100m Freestyle", stroke: "Freestyle", distance: 100, session: 1, time: "10:15", recordHolder: "Mara Voss, 2023", recordTime: "57.40", blurb: "Two lengths, the gala's benchmark: every squad trains for this one, and the record has stood since 2023." },
  { code: "OW-E03", name: "50m Backstroke", stroke: "Backstroke", distance: 50, session: 1, time: "11:00", recordHolder: "Tom Rigg, 2025", recordTime: "34.10", blurb: "One length on the back, start in the water, finish on the touchpad, no turn to hide behind." },
  { code: "OW-E04", name: "100m Breaststroke", stroke: "Breaststroke", distance: 100, session: 2, time: "13:30", recordHolder: "Ana Sousa, 2024", recordTime: "1:11.90", blurb: "The technical event: two lengths where the turn and the pullout decide it, not the sprint." },
  { code: "OW-E05", name: "100m Butterfly", stroke: "Butterfly", distance: 100, session: 2, time: "14:20", recordHolder: "Mara Voss, 2024", recordTime: "1:03.20", blurb: "Two lengths of fly, the hardest race on the sheet, and the one the crowd stands for." },
  { code: "OW-E06", name: "200m Freestyle", stroke: "Freestyle", distance: 200, session: 2, time: "15:05", recordHolder: "Tom Rigg, 2025", recordTime: "2:06.40", blurb: "Eight lengths, a race of pacing: go out too fast and the last 50 metres will tell everyone." },
  { code: "OW-E07", name: "200m Individual Medley", stroke: "Medley", distance: 200, session: 3, time: "16:00", recordHolder: "Ana Sousa, 2023", recordTime: "2:26.10", blurb: "All four strokes in one race: fly, back, breast, free, eight lengths, the gala's all-rounder." },
  { code: "OW-E08", name: "4x50m Freestyle Relay", stroke: "Freestyle", distance: 200, session: 3, time: "17:10", recordHolder: "Dolphins, 2025", recordTime: "1:48.60", blurb: "Four swimmers, one length each, the gala closer: six teams, six lanes, one heat, no second chance." },
];

export const swimmers: Swimmer[] = [
  { id: "OW-SW-01", name: "Ada", ageGroup: "14-15" },
  { id: "OW-SW-02", name: "Ben", ageGroup: "16-17" },
  { id: "OW-SW-03", name: "Cleo", ageGroup: "12-13" },
  { id: "OW-SW-04", name: "Dan", ageGroup: "16-17" },
  { id: "OW-SW-05", name: "Elif", ageGroup: "12-13" },
  { id: "OW-SW-06", name: "Finn", ageGroup: "18+" },
  { id: "OW-SW-07", name: "Greta", ageGroup: "12-13" },
  { id: "OW-SW-08", name: "Hugo", ageGroup: "18+" },
  { id: "OW-SW-09", name: "Iris", ageGroup: "14-15" },
  { id: "OW-SW-10", name: "Jonah", ageGroup: "14-15" },
  { id: "OW-SW-11", name: "Kara", ageGroup: "16-17" },
  { id: "OW-SW-12", name: "Liam", ageGroup: "18+" },
  { id: "OW-SW-13", name: "Mira", ageGroup: "12-13" },
  { id: "OW-SW-14", name: "Noah", ageGroup: "14-15" },
  { id: "OW-SW-15", name: "Odette", ageGroup: "12-13" },
  { id: "OW-SW-16", name: "Pablo", ageGroup: "16-17" },
  { id: "OW-SW-17", name: "Quinn", ageGroup: "14-15" },
  { id: "OW-SW-18", name: "Rosa", ageGroup: "16-17" },
  { id: "OW-SW-19", name: "Sam", ageGroup: "18+" },
  { id: "OW-SW-20", name: "Tilda", ageGroup: "12-13" },
  { id: "OW-SW-21", name: "Umar", ageGroup: "16-17" },
  { id: "OW-SW-22", name: "Vera", ageGroup: "18+" },
  { id: "OW-SW-23", name: "Will", ageGroup: "14-15" },
  { id: "OW-SW-24", name: "Xenia", ageGroup: "14-15" },
  { id: "OW-SW-25", name: "Yusuf", ageGroup: "16-17" },
  { id: "OW-SW-26", name: "Zara", ageGroup: "18+" },
  { id: "OW-SW-27", name: "Alfie", ageGroup: "12-13" },
  { id: "OW-SW-28", name: "Bea", ageGroup: "14-15" },
  { id: "OW-SW-29", name: "Callum", ageGroup: "16-17" },
  { id: "OW-SW-30", name: "Delia", ageGroup: "12-13" },
  { id: "OW-SW-31", name: "Ezra", ageGroup: "14-15" },
  { id: "OW-SW-32", name: "Freya", ageGroup: "16-17" },
  { id: "OW-SW-33", name: "Gus", ageGroup: "18+" },
  { id: "OW-SW-34", name: "Hana", ageGroup: "14-15" },
  { id: "OW-SW-35", name: "Isaac", ageGroup: "12-13" },
  { id: "OW-SW-36", name: "Josie", ageGroup: "16-17" },
  { id: "OW-SW-37", name: "Kit", ageGroup: "18+" },
  { id: "OW-SW-38", name: "Lila", ageGroup: "14-15" },
  { id: "OW-SW-39", name: "Max", ageGroup: "18+" },
  { id: "OW-SW-40", name: "Nell", ageGroup: "16-17" },
];

/** [swimmer number, seed time] per event, in entry order. */
const rawEntries: Record<string, [number, string][]> = {
  "OW-E01": [
    [1, "27.85"], [2, "29.40"], [3, "31.05"], [4, "28.90"], [5, "30.20"],
    [6, "26.95"], [7, "33.10"], [8, "27.40"], [9, "32.60"], [10, "29.95"],
    [11, "28.10"], [12, "27.05"], [13, "30.75"], [14, "31.80"], [15, "34.25"],
    [16, "28.55"], [17, "29.15"], [18, "31.45"], [19, "27.70"], [20, "33.85"],
    [21, "30.05"], [22, "28.30"], [23, "32.15"], [24, "29.60"],
  ],
  "OW-E02": [
    [1, "1:01.20"], [2, "1:05.80"], [4, "1:03.45"], [6, "58.90"], [8, "59.75"],
    [11, "1:02.10"], [12, "59.20"], [16, "1:04.30"], [19, "1:00.85"], [22, "1:03.90"],
    [25, "1:08.40"], [26, "1:06.55"], [27, "1:10.20"], [29, "1:07.15"], [31, "1:12.60"],
    [33, "1:09.85"], [35, "1:15.30"], [37, "1:11.45"],
  ],
  "OW-E03": [
    [3, "36.20"], [5, "38.45"], [7, "41.30"], [9, "39.80"], [13, "37.15"],
    [15, "42.60"], [17, "35.90"], [20, "44.10"], [23, "38.90"], [28, "36.75"],
    [30, "40.55"], [32, "37.90"],
  ],
  "OW-E04": [
    [2, "1:18.20"], [3, "1:22.45"], [6, "1:12.80"], [10, "1:20.15"], [12, "1:14.60"],
    [14, "1:24.30"], [18, "1:19.75"], [21, "1:16.90"], [24, "1:21.05"], [26, "1:17.55"],
    [29, "1:23.40"], [31, "1:26.85"], [34, "1:19.20"], [36, "1:25.60"], [38, "1:21.90"],
    [39, "1:15.45"], [40, "1:18.95"], [8, "1:13.35"],
  ],
  "OW-E05": [
    [1, "1:08.40"], [4, "1:11.25"], [6, "1:04.80"], [11, "1:09.15"], [16, "1:12.60"],
    [19, "1:06.95"], [22, "1:10.30"], [25, "1:15.20"], [27, "1:13.75"], [33, "1:14.45"],
    [35, "1:18.90"], [37, "1:12.05"],
  ],
  "OW-E06": [
    [2, "2:18.40"], [8, "2:09.75"], [12, "2:11.20"], [19, "2:14.85"], [26, "2:16.30"],
    [29, "2:20.15"], [31, "2:24.60"], [33, "2:19.45"], [36, "2:26.90"], [38, "2:21.75"],
    [39, "2:12.55"], [40, "2:17.20"],
  ],
  "OW-E07": [
    [1, "2:38.20"], [3, "2:45.60"], [6, "2:29.85"], [10, "2:41.30"], [13, "2:47.15"],
    [17, "2:36.45"], [21, "2:39.90"], [24, "2:44.75"], [28, "2:42.60"], [30, "2:49.35"],
    [34, "2:40.20"], [37, "2:46.80"],
  ],
};

export const entries: Entry[] = Object.entries(rawEntries).flatMap(
  ([eventCode, list]) =>
    list.map(([n, seed]) => ({
      swimmerId: `OW-SW-${String(n).padStart(2, "0")}`,
      eventCode,
      seed,
    })),
);

export const relayTeams: RelayTeam[] = [
  { code: "OW-R01", name: "Dolphins", swimmers: ["OW-SW-06", "OW-SW-12", "OW-SW-01", "OW-SW-19"], seed: "1:52.30" },
  { code: "OW-R02", name: "Sharks", swimmers: ["OW-SW-08", "OW-SW-16", "OW-SW-04", "OW-SW-22"], seed: "1:55.80" },
  { code: "OW-R03", name: "Otters", swimmers: ["OW-SW-02", "OW-SW-11", "OW-SW-26", "OW-SW-29"], seed: "2:01.45" },
  { code: "OW-R04", name: "Seals", swimmers: ["OW-SW-33", "OW-SW-35", "OW-SW-31", "OW-SW-37"], seed: "2:04.20" },
  { code: "OW-R05", name: "Turtles", swimmers: ["OW-SW-03", "OW-SW-13", "OW-SW-28", "OW-SW-34"], seed: "2:07.65" },
  { code: "OW-R06", name: "Penguins", swimmers: ["OW-SW-07", "OW-SW-15", "OW-SW-20", "OW-SW-36"], seed: "2:11.90" },
];

export const sampleSwimmer: Swimmer = swimmers[0];

/** The batch takes the first N swimmers, in swimmer number order, deterministic. */
export function makeSwimmers(count: number): Swimmer[] {
  return swimmers.slice(0, count);
}

export function eventFor(code: string): MeetEvent {
  const found = events.find((e) => e.code === code);
  if (!found) throw new Error(`No event with code ${code}`);
  return found;
}

export function swimmerFor(id: string): Swimmer {
  const found = swimmers.find((s) => s.id === id);
  if (!found) throw new Error(`No swimmer with id ${id}`);
  return found;
}

/** "1:02.35" or "28.40" to seconds, for seeding. */
export function parseSeed(seed: string): number {
  const parts = seed.split(":");
  if (parts.length === 2) return Number(parts[0]) * 60 + Number(parts[1]);
  return Number(parts[0]);
}

export const LANES = 6;

/** Standard six-lane seeding: fastest in lane 3, then 4, 2, 5, 1, 6. */
export const LANE_ORDER = [3, 4, 2, 5, 1, 6];

export interface SeededEntry {
  swimmer: Swimmer;
  seed: string;
  heat: number;
  lane: number;
}

export interface SeededRelay {
  team: RelayTeam;
  seed: string;
  heat: number;
  lane: number;
}

/**
 * Heats and lanes for one event, derived from the seed times.
 * Fastest swimmers swim in the last heat; within a heat the
 * fastest swimmer takes lane 3, the next lane 4, then 2, 5, 1, 6.
 */
export function seededEntries(eventCode: string): SeededEntry[] {
  const list = entries
    .filter((e) => e.eventCode === eventCode)
    .map((e) => ({ swimmer: swimmerFor(e.swimmerId), seed: e.seed }))
    .sort((a, b) => parseSeed(a.seed) - parseSeed(b.seed));
  const heats = Math.ceil(list.length / LANES);
  const out: SeededEntry[] = [];
  for (let h = 0; h < heats; h++) {
    const heatNo = heats - h;
    const chunk = list.slice(h * LANES, (h + 1) * LANES);
    chunk.forEach((entry, i) => {
      out.push({ ...entry, heat: heatNo, lane: LANE_ORDER[i] });
    });
  }
  return out.sort((a, b) => a.heat - b.heat || a.lane - b.lane);
}

export function heatCount(eventCode: string): number {
  // The relay has one heat, six teams, no individual entries.
  if (eventCode === "OW-E08") return 1;
  return Math.ceil(
    entries.filter((e) => e.eventCode === eventCode).length / LANES,
  );
}

export function seededRelay(): SeededRelay[] {
  const list = [...relayTeams].sort((a, b) => parseSeed(a.seed) - parseSeed(b.seed));
  return list.map((team, i) => ({
    team,
    seed: team.seed,
    heat: 1,
    lane: LANE_ORDER[i],
  }));
}

export interface SwimmerRace {
  event: MeetEvent;
  seed: string;
  heat: number;
  lane: number;
}

/** Every race one swimmer is in, in event order, with heat and lane. */
export function racesForSwimmer(id: string): SwimmerRace[] {
  const races: SwimmerRace[] = [];
  for (const event of events) {
    if (event.code === "OW-E08") continue;
    const seeded = seededEntries(event.code).find(
      (s) => s.swimmer.id === id,
    );
    if (seeded) {
      races.push({ event, seed: seeded.seed, heat: seeded.heat, lane: seeded.lane });
    }
  }
  const relay = seededRelay().find((r) =>
    r.team.swimmers.includes(id),
  );
  if (relay) {
    races.push({
      event: eventFor("OW-E08"),
      seed: relay.seed,
      heat: relay.heat,
      lane: relay.lane,
    });
  }
  return races;
}

export function relayTeamFor(id: string): RelayTeam | undefined {
  return relayTeams.find((t) => t.swimmers.includes(id));
}

/** Session colours: the LaneStrip colours one square per event by session. */
export const SESSION_COLORS: Record<SessionNo, string> = {
  1: "#0b4f6c",
  2: "#1b7f9e",
  3: "#f5b301",
};

export const SESSION_LABELS: Record<SessionNo, string> = {
  1: "Session 1, morning",
  2: "Session 2, afternoon",
  3: "Session 3, evening",
};

export function eventsForSession(no: SessionNo): MeetEvent[] {
  return events.filter((e) => e.session === no);
}

export function totalEntries(): number {
  return entries.length;
}

export function totalHeats(): number {
  return events.reduce((sum, e) => sum + heatCount(e.code), 0);
}

/** Entry fees in pounds: 6 per individual entry, 12 per relay team. */
export function totalFees(): number {
  return entries.length * 6 + relayTeams.length * 12;
}

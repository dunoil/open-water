import { defineTheme } from "@hyper-elements/react";

/**
 * OPEN WATER theme, "aquatic minimal": pale aqua paper, deep
 * water blue for shapes and text accents, signal yellow for
 * shapes only, mono event codes, Inter bold headings.
 *
 * One theme serves all four roots, so it carries NO `mobile` blocks
 * (phone styles are an error in a Document or a Canvas); Email and
 * Page templates set their own phone styles.
 *
 * Signal yellow #f5b301 is a shape colour only, it never sets body
 * text. Text ink is deep water ink #0f2a3d or deep water blue
 * #0b4f6c (both >= 4.5:1 on the pale aqua paper and on white).
 * Session colours are dark enough to be text: session 1 deep blue
 * #0b4f6c, session 2 aqua #16697f, session 3 is signal yellow for
 * shapes and deep blue for its text. Headings are Inter 700
 * throughout: the kit ships Inter at 400 and 700 only.
 */
export const openWaterTheme = defineTheme({
  colors: {
    background: "#eef6f8",
    paper: "#ffffff",
    foreground: "#0f2a3d",
    muted: "#47606e",
    primary: "#0b4f6c",
    primaryForeground: "#ffffff",
    border: "#b8d4de",
    deep: "#083049",
    aqua: "#1b7f9e",
    aquaDark: "#16697f",
    signal: "#f5b301",
    session1: "#0b4f6c",
    session2: "#16697f",
    session3: "#f5b301",
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 28, xl: 44 },
  fontSizes: { sm: 12, md: 15, lg: 19, xl: 30 },
  lineHeights: { tight: 1.25, normal: 1.55 },
  fonts: {
    body: "Inter, Helvetica, Arial, sans-serif",
    heading: "Inter, Helvetica, Arial, sans-serif",
    mono: "'Cascadia Code', Consolas, 'Courier New', monospace",
  },
  radii: { sm: 2, md: 6 },
  elements: {
    Heading: {
      fontFamily: "Inter, Helvetica, Arial, sans-serif",
      fontWeight: 700,
      letterSpacing: -0.5,
      by: {
        level: {
          1: { fontSize: 34 },
          2: { fontSize: 23 },
          3: { fontSize: 16 },
        },
      },
    },
    Text: { fontSize: 15, lineHeight: 1.55 },
    Button: {
      backgroundColor: "#0b4f6c",
      fontWeight: 700,
      padding: [12, 22],
      borderRadius: 2,
      hover: { backgroundColor: "#083a50" },
      variants: {
        secondary: {
          backgroundColor: "#ffffff",
          color: "#0f2a3d",
          border: { width: 1, style: "solid", color: "#0f2a3d" },
          hover: { backgroundColor: "#eef6f8" },
        },
        small: { fontSize: 13, padding: [8, 14] },
      },
    },
    Table: { border: { bottom: "1px solid #b8d4de" } },
    TableCell: { padding: [10, 8], fontSize: 13 },
  },
  styles: {
    card: {
      backgroundColor: "#ffffff",
      padding: 28,
      gap: 16,
      borderRadius: 6,
      border: { width: 1, style: "solid", color: "#b8d4de" },
    },
    quiet: { color: "#47606e", fontSize: 12 },
    eyebrow: {
      color: "#0b4f6c",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 2,
      textTransform: "uppercase",
    },
    stamp: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 1,
      padding: [5, 10],
      border: { width: 1, style: "dashed", color: "#0b4f6c" },
      borderRadius: 4,
    },
    mono: {
      fontFamily: "'Cascadia Code', Consolas, 'Courier New', monospace",
      fontSize: 13,
    },
    deepRule: {
      backgroundColor: "#0b4f6c",
      height: 4,
      borderRadius: 2,
    },
    signalRule: {
      backgroundColor: "#f5b301",
      height: 4,
      borderRadius: 2,
    },
  },
  formats: {
    email: { elements: { Button: { borderRadius: 2 } } },
    document: {
      styles: { quiet: { fontSize: 10 } },
      elements: {
        Text: { fontSize: 11, lineHeight: 1.45 },
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
    canvas: {
      elements: {
        Heading: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
        Text: { fontFamily: "Inter, Helvetica, Arial, sans-serif" },
      },
    },
  },
});

declare module "@hyper-elements/react" {
  interface Register {
    theme: typeof openWaterTheme;
  }
}

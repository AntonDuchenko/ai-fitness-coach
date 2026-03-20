/**
 * AI Fitness Coach — Color Tokens
 *
 * Single source of truth for all colors used across the product.
 * Use these tokens when you need raw hex values (e.g., charts, emails, OG images).
 * For component styling, prefer Tailwind classes referencing CSS variables.
 */

export const colors = {
  /* ─── Primary (Blue) — Trust, Technology, AI ─── */
  primary: {
    DEFAULT: "#2563EB",
    light: "#3B82F6",
    lighter: "#60A5FA",
    lightest: "#93C5FD",
    dark: "#1D4ED8",
    darker: "#1E40AF",
    /** Use for subtle blue backgrounds on light theme */
    tint: "#EFF6FF",
    /** Use for blue glow/shadow effects */
    glow: "rgba(37, 99, 235, 0.4)",
  },

  /* ─── Success (Green) — Progress, Results, Health ─── */
  success: {
    DEFAULT: "#10B981",
    light: "#34D399",
    lighter: "#6EE7B7",
    dark: "#059669",
    darker: "#047857",
    /** Use for subtle green backgrounds */
    tint: "#ECFDF5",
  },

  /* ─── Neutral — Backgrounds, Text, Borders ─── */
  neutral: {
    /** Main dark background */
    950: "#0A0A0A",
    /** Sidebar / secondary dark bg */
    900: "#111111",
    /** Card dark bg */
    850: "#161618",
    /** Elevated dark surface */
    800: "#1F2937",
    /** Dark border */
    750: "#1F1F23",
    /** Muted dark text */
    600: "#4B5563",
    /** Secondary text (dark bg) / Labels */
    500: "#6B7280",
    /** Muted text (dark bg) */
    400: "#9CA3AF",
    /** Secondary text (light bg) */
    300: "#D1D5DB",
    /** Light border */
    200: "#E5E7EB",
    /** Light card border */
    150: "#F1F5F9",
    /** Light surface */
    100: "#F9FAFB",
    /** White */
    0: "#FFFFFF",
  },

  /* ─── Destructive (Red) — Errors, Warnings ─── */
  destructive: {
    DEFAULT: "#DC2626",
    light: "#EF4444",
    dark: "#B91C1C",
    tint: "#FEF2F2",
  },

  /* ─── Warning (Amber) ─── */
  warning: {
    DEFAULT: "#F59E0B",
    light: "#FBBF24",
    dark: "#D97706",
    tint: "#FFFBEB",
  },

  /* ─── Chart palette ─── */
  chart: {
    blue: "#2563EB",
    green: "#10B981",
    lightBlue: "#60A5FA",
    lightGreen: "#34D399",
    cyan: "#06B6D4",
  },
} as const;

/**
 * Gradient presets used in the design
 */
export const gradients = {
  /** Primary icon circles, avatar backgrounds */
  primaryIcon: "linear-gradient(135deg, #2563EB, #60A5FA)",
  /** Hero section subtle glow */
  heroGlow:
    "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.15), transparent 70%)",
  /** Card hover effect */
  cardHover:
    "linear-gradient(135deg, rgba(37, 99, 235, 0.05), rgba(16, 185, 129, 0.05))",
  /** Success stat highlight */
  successGlow:
    "radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15), transparent 70%)",
} as const;

/**
 * Shadow presets
 */
export const shadows = {
  /** Subtle card shadow */
  card: "0 4px 16px rgba(0, 0, 0, 0.06)",
  /** Elevated card */
  cardHover: "0 12px 40px rgba(0, 0, 0, 0.1)",
  /** Primary button glow */
  primaryGlow: "0 8px 24px rgba(37, 99, 235, 0.4)",
  /** Success element glow */
  successGlow: "0 6px 20px rgba(16, 185, 129, 0.4)",
  /** Icon circle glow */
  iconGlow: "0 8px 24px rgba(37, 99, 235, 0.4)",
} as const;

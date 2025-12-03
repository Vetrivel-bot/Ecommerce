// src/theme.js

export const lightTheme = {
  name: "light",
  bg: "#ffffff",
  text: "#000000",
  navbar: {
    bg: "rgba(255, 255, 255, 0.85)",
    border: "rgba(0, 0, 0, 0.1)",
    shadow:
      "0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 20px 25px -5px rgba(0, 0, 0, 0.15)",
    textIdle: "#6b7280",
    textHover: "#000000",
    activePill: "rgba(0, 0, 0, 0.08)",
    logoBg: "#0000007a",
    logoText: "#ffffff",
    searchBg: "rgba(0, 0, 0, 0.06)",
    searchHoverBg: "rgba(0, 0, 0, 0.1)",
    searchText: "#374151",
    searchBorder: "rgba(0, 0, 0, 0.05)",
    iconColor: "#1f2937",
    modalBg: "#ffffff",
    modalOverlay: "rgba(255, 255, 255, 0.8)",
  },
  // --- NEW CARD CONFIG ---
  card: {
    imgBg: "rgba(243, 244, 246, 0)", // Light gray for image background
    border: "rgba(0, 0, 0, 0.08)",
    textPrimary: "#111827",
    textSecondary: "#6b7280",
    btnBg: "#000000", // Black button on light theme
    btnText: "#ffffff",
    iconBtnBg: "rgba(255, 255, 255, 0.6)",
    iconBtnColor: "#000000",
  },
  // --- NEW BADGE CONFIG ---
  badges: {
    new: { bg: "#2563eb", text: "#ffffff" }, // Blue
    sale: { bg: "#dc2626", text: "#ffffff" }, // Red
    hot: { bg: "#ea580c", text: "#ffffff" }, // Orange
    default: { bg: "#000000", text: "#ffffff" }, // Black
  },
};

export const darkTheme = {
  name: "dark",
  bg: "#050505",
  text: "#ffffff",
  navbar: {
    bg: "rgba(26, 26, 26, 0.85)",
    border: "rgba(255, 255, 255, 0.1)",
    shadow:
      "0 35px 60px -15px rgba(255, 255, 255, 0.18), 0 20px 25px -5px rgba(255, 255, 255, 0.12)",
    textIdle: "#d1d5db",
    textHover: "#ffffff",
    activePill: "rgba(255, 255, 255, 0.1)",
    logoBg: "#ffffff",
    logoText: "#000000",
    searchBg: "rgba(255, 255, 255, 0.1)",
    searchHoverBg: "rgba(255, 255, 255, 0.2)",
    searchText: "#9ca3af",
    searchBorder: "rgba(255, 255, 255, 0.05)",
    iconColor: "#ffffff",
    modalBg: "#1a1a1a",
    modalOverlay: "rgba(0, 0, 0, 0.8)",
  },
  // --- NEW CARD CONFIG ---
  card: {
    imgBg: "rgba(17, 24, 39, 0)", // Dark gray (gray-900)
    border: "rgba(255, 255, 255, 0.1)",
    textPrimary: "#f3f4f6",
    textSecondary: "#9ca3af",
    btnBg: "#ffffff", // White button on dark theme
    btnText: "#000000",
    iconBtnBg: "rgba(0, 0, 0, 0.5)",
    iconBtnColor: "#ffffff",
  },
  // --- NEW BADGE CONFIG ---
  badges: {
    new: { bg: "#3b82f6", text: "#ffffff" }, // Lighter Blue
    sale: { bg: "#ef4444", text: "#ffffff" }, // Red
    hot: { bg: "#fbbf24", text: "#000000" }, // Amber/Yellow
    default: { bg: "#ffffff", text: "#000000" }, // White
  },
};

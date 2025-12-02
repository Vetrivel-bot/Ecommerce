// src/theme.js

export const lightTheme = {
  name: "light",
  bg: "#ffffff", // Global Page Background
  text: "#000000", // Global Page Text
  // Specific section for Navbar as requested
  navbar: {
    bg: "rgba(255, 255, 255, 0.85)", // Glassy White
    border: "rgba(0, 0, 0, 0.1)",
    shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)", // Softer shadow for light
    textIdle: "#6b7280", // Gray-500
    textHover: "#000000",
    activePill: "rgba(0, 0, 0, 0.08)", // Subtle gray pill
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
};

export const darkTheme = {
  name: "dark",
  bg: "#050505", // Deep black Global Page Background
  text: "#ffffff", // Global Page Text
  // Specific section for Navbar (Matches your original code)
  navbar: {
    bg: "rgba(26, 26, 26, 0.85)", // #1a1a1a with alpha
    border: "rgba(255, 255, 255, 0.1)",
    shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    textIdle: "#d1d5db", // Gray-300
    textHover: "#ffffff",
    activePill: "rgba(255, 255, 255, 0.1)", // White/10
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
};

// src/theme.js

export const lightTheme = {
  name: "light",
  bg: "#ffffff",
  text: "#000000",
  navbar: {
    bg: "rgba(255, 255, 255, 0.85)",
    border: "rgba(0, 0, 0, 0.1)",

    // Stronger, deeper Black shadow for 3D float
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
};

export const darkTheme = {
  name: "dark",
  bg: "#050505",
  text: "#ffffff",
  navbar: {
    bg: "rgba(26, 26, 26, 0.85)",
    border: "rgba(255, 255, 255, 0.1)",

    // Stronger, deeper White/Glow shadow for 3D float
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
};

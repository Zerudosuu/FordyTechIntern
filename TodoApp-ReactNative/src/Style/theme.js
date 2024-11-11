// theme.js

const theme = {
  colors: {
    primary: "#0070ce", // Light blue (30%)
    secondary: "#fefedf", // 60% opacity white
    background: "#ffffff",
    textPrimary: "#333333",
    textSecondary: "#666666",
    accent: "#0096c7", // Example accent color
  },
  fontScales: {
    xs: 12, // Extra small - for captions or small hints
    sm: 14, // Small - for subtext or annotations
    md: 16, // Medium - for body text
    lg: 18, // Large - for subtitles or section headers
    xl: 24, // Extra large - for main headers
    xxl: 32, // Double extra large - for display or prominent headers
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    full: 9999, // For pill-shaped elements
  },
  typography: {
    fontFamily: "System", // Default system font for React Native
    fontWeight: {
      regular: "400",
      bold: "700",
    },
  },
};

export default theme;

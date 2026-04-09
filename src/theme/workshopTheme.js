import { createTheme } from "@mui/material/styles";

/** Card header tints (orange → pink → green → blue), cycle for each new workshop */
export const WORKSHOP_CARD_HEADER_COLORS = ["#f3d7b2", "#efd6dc", "#dbeee9", "#dbe6f4"];

export function workshopCardHeaderBg(cardAccentIndex) {
  const colors = WORKSHOP_CARD_HEADER_COLORS;
  const n = colors.length;
  let i = Math.floor(Number(cardAccentIndex));
  if (!Number.isFinite(i)) i = 0;
  i = ((i % n) + n) % n;
  return colors[i];
}

/** Matches :root palette in former globalStyles */
export const workshopPalette = {
  cream: "#FFF5EF",
  warmWhite: "#FFFBF8",
  panelBg: "#FFFCFA",
  stone: "#EDD8CD",
  tan: "#D4B8A8",
  brown: "#7A5C4E",
  dark: "#5A3E42",
  accent: "#E8706A",
  accentLight: "#FFC9C1",
  green: "#6A9B7D",
  greenLight: "#E8F4EC",
  teal: "#6EB88A",
  tealSolid: "#5A9E7A",
  tealSoft: "#DFF5EA",
  kimchi: "#D94E1F",
  kimchiDeep: "#B84018",
  yellow: "#FFE8A8",
  text: "#4A3728",
  textMuted: "#8B7264",
  shadow: "0 6px 24px rgba(90, 62, 66, 0.08)",
  shadowLg: "0 14px 40px rgba(90, 62, 66, 0.12)",
};

const lora = '"Lora", Georgia, "Times New Roman", serif';
const plusJakartaSans = '"Plus Jakarta Sans", "Segoe UI", Arial, sans-serif';
const poppins = '"Poppins", "Plus Jakarta Sans", "Segoe UI", Arial, sans-serif';

export const workshopTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: workshopPalette.accent,
      light: workshopPalette.accentLight,
      dark: "#d95a52",
      contrastText: "#fff",
    },
    secondary: {
      main: workshopPalette.tealSolid,
      light: workshopPalette.tealSoft,
      dark: "#4a8a62",
      contrastText: "#fff",
    },
    success: {
      main: workshopPalette.green,
      light: workshopPalette.greenLight,
      contrastText: "#fff",
    },
    error: {
      main: "#FF7B7B",
    },
    background: {
      default: workshopPalette.cream,
      paper: workshopPalette.panelBg,
    },
    text: {
      primary: workshopPalette.text,
      secondary: workshopPalette.textMuted,
    },
    divider: workshopPalette.stone,
  },
  typography: {
    fontFamily: plusJakartaSans,
    fontSize: 17,
    h1: { fontFamily: lora, fontWeight: 700 },
    h2: { fontFamily: lora, fontWeight: 700 },
    h3: { fontFamily: lora, fontWeight: 700 },
    h4: { fontFamily: lora, fontWeight: 700 },
    h5: { fontFamily: lora, fontWeight: 700 },
    h6: { fontFamily: lora, fontWeight: 700 },
    subtitle1: { fontFamily: poppins },
    subtitle2: { fontFamily: poppins, fontWeight: 600 },
    body1: { fontFamily: plusJakartaSans, lineHeight: 1.65 },
    body2: { fontFamily: plusJakartaSans, lineHeight: 1.65 },
    button: { fontFamily: plusJakartaSans, fontWeight: 600, textTransform: "none" },
    caption: { fontFamily: poppins },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: workshopPalette.cream,
          color: workshopPalette.text,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 12, fontWeight: 600, paddingInline: 18 },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "medium" },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: "static",
          transform: "none",
          display: "block",
          marginBottom: 6,
          color: workshopPalette.brown,
          fontWeight: 600,
          lineHeight: 1.2,
          maxWidth: "100%",
        },
        shrink: {
          transform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: workshopPalette.stone,
            borderWidth: 2,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: workshopPalette.tan,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: workshopPalette.accent,
            borderWidth: 2,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 22,
          border: `3px solid ${workshopPalette.stone}`,
          backgroundColor: workshopPalette.warmWhite,
          boxShadow: "0 28px 64px rgba(90, 62, 66, 0.18)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 22,
          border: "2px solid rgba(237, 216, 205, 0.85)",
          boxShadow: workshopPalette.shadow,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 12,
          minHeight: 40,
        },
      },
    },
  },
});

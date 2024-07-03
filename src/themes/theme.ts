import { createTheme } from "@mui/material/styles";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });
// Your custom colors
const primaryColor = "#3B5CAD";
const lightTextColor = "#454646";
const lightGray = "#D9D9D9";
const darkTextColor = "#fff";
const warningTextColor = "#ce0a05";
const successTextColor = "#2B9C4A";
const secondaryColor = "#E80E5A";
const backgroundColor = "#FFFFFF"; // White for light mode
const paperColor = "#F7F7F7"; // Slightly off-white for paper backgrounds in light mode
const darkBackgroundColor = "#121212"; // Dark grey for dark mode
const darkPaperColor = "#1E1E1E"; // Darker grey for paper in dark mode

// Create a light theme instance
const lightTheme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    error: {
      main: warningTextColor,
    },
    success: {
      main: successTextColor,
    },
    text: {
      primary: lightTextColor,
      secondary: lightGray,
    },
    background: {
      default: backgroundColor,
      paper: paperColor,
    },
  },
});

// Create a dark theme instance
const darkTheme = createTheme({
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    text: {
      primary: darkTextColor,
    },
    background: {
      default: darkBackgroundColor,
      paper: darkPaperColor,
    },
    // ...define other dark mode specific colors
  },
});

export { lightTheme, darkTheme };

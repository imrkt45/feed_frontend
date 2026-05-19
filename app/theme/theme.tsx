import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#667eea",
    },

    secondary: {
      main: "#764ba2",
    },

    background: {
      default: "#141e30",
      paper: "#ffffff",
    },
  },

  typography: {
    fontFamily:
      "var(--font-geist-sans)",

    h4: {
      fontWeight: 700,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "10px 20px",
          borderRadius: "12px",
          background:
            "linear-gradient(to right, #667eea, #764ba2)",

          "&:hover": {
            background:
              "linear-gradient(to right, #5a67d8, #6b46c1)",
          },
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          boxShadow:
            "0px 10px 30px rgba(0,0,0,0.3)",
        },
      },
    },
  },
});

export default theme;
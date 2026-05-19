"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";

import CssBaseline from "@mui/material/CssBaseline";

interface ThemeContextType {
  toggleTheme: () => void;

  mode: "light" | "dark";
}

const ThemeContext =
  createContext<
    ThemeContextType | undefined
  >(undefined);

export const useThemeContext =
  () => {
    const context =
      useContext(ThemeContext);

    if (!context) {
      throw new Error(
        "ThemeContext missing"
      );
    }

    return context;
  };

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<
    "light" | "dark"
  >("dark");

  const toggleTheme = () => {
    setMode((prev) =>
      prev === "dark"
        ? "light"
        : "dark"
    );
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          primary: {
            main: "#667eea",
          },

          secondary: {
            main: "#764ba2",
          },
        },

        shape: {
          borderRadius: 12,
        },

        typography: {
          fontFamily:
            "var(--font-geist-sans)",
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        mode,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
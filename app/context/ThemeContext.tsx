"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  // SAME SERVER + CLIENT INITIAL VALUE
  const [mode, setMode] = useState<
    "light" | "dark"
  >("dark");

  // LOAD THEME AFTER MOUNT
  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "theme"
      ) as
        | "light"
        | "dark"
        | null;

    if (savedTheme) {
      // DEFER STATE UPDATE
      queueMicrotask(() => {
        setMode(savedTheme);
      });
    }
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode =
        prev === "dark"
          ? "light"
          : "dark";

      localStorage.setItem(
        "theme",
        newMode
      );

      return newMode;
    });
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
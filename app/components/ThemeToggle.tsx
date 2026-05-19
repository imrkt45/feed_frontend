"use client";

import IconButton from "@mui/material/IconButton";

import LightModeIcon from "@mui/icons-material/LightMode";

import DarkModeIcon from "@mui/icons-material/DarkMode";

import {
  useThemeContext,
} from "../context/ThemeContext";

export default function ThemeToggle() {
  const {
    toggleTheme,
    mode,
  } = useThemeContext();

  return (
    <IconButton
      onClick={toggleTheme}
      sx={{
        color:
          mode === "dark"
            ? "white"
            : "black",

        border:
          mode === "dark"
            ? "1px solid white"
            : "1px solid black",
      }}
    >
      {mode === "dark" ? (
        <LightModeIcon />
      ) : (
        <DarkModeIcon />
      )}
    </IconButton>
  );
}
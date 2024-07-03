"use client";

import React, { createContext, useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { IWithChildrenProps } from "@/types/baseTypes";
import { darkTheme, lightTheme } from "./theme";

interface IThemeContext {
  mode: string;
  toggleTheme: () => void;
}

// Create a context for the theme
const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeProvider = ({ children }: IWithChildrenProps) => {
  const [mode, setMode] = useState("light"); // Default to light mode

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = mode === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

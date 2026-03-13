import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  Theme,
} from "@react-navigation/native";

import { tokens } from "./tokens";

export const appTheme = tokens;

export const navigationThemes: Record<"light" | "dark", Theme> = {
  light: {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: appTheme.colors.background,
      card: appTheme.colors.white,
      primary: appTheme.colors.primary,
      text: appTheme.colors.text,
      border: appTheme.colors.border,
    },
  },
  dark: {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: appTheme.colors.background,
      card: appTheme.colors.white,
      primary: appTheme.colors.primary,
      text: appTheme.colors.text,
      border: appTheme.colors.border,
    },
  },
};

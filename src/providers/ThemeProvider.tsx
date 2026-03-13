import { PropsWithChildren } from "react";
import {
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { navigationThemes } from "@/theme/theme";

export function ThemeProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <NavigationThemeProvider value={navigationThemes[colorScheme]}>
      {children}
    </NavigationThemeProvider>
  );
}

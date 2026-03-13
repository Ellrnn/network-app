import { PropsWithChildren } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/colors";

import { QueryProvider } from "./QueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { UserProvider } from "./UserProvider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary }}
      edges={["top", "left", "right"]}
    >
      <ThemeProvider>
        <QueryProvider>
          <UserProvider>{children}</UserProvider>
        </QueryProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}

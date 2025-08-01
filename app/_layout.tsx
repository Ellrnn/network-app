import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserProvider } from "../hooks/UserContext";
import { useColorScheme } from "../hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.primary }}
      edges={["top", "left", "right"]}
    >
      <UserProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="main" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </UserProvider>
    </SafeAreaView>
  );
}

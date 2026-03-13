import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";

import { AppProviders } from "@/providers/AppProviders";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AppProviders>
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <Stack>
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="main" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </KeyboardProvider>
    </AppProviders>
  );
}

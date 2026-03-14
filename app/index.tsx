import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

import { colors } from "@/constants/colors";
import { useUser } from "@/hooks/useUser";

export default function Index() {
  const { username, isLoading } = useUser();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (username) {
    return <Redirect href="/main" />;
  }

  return <Redirect href="/signup" />;
}

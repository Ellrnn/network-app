import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

import { colors } from "@/constants/colors";
import { useUser } from "@/hooks/useUser";

import { UsernameForm } from "../components/UsernameForm";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const { setUsername: saveUsername } = useUser();
  const router = useRouter();

  const handleEnter = () => {
    if (!username.trim()) {
      return;
    }

    saveUsername(username.trim());
    router.replace("/main");
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
      bottomOffset={62}
      enabled
      extraKeyboardSpace={20}
    >
      <UsernameForm
        username={username}
        onUsernameChange={setUsername}
        onSubmit={handleEnter}
      />
    </KeyboardAwareScrollView>
  );
}

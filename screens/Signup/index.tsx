import { StyledButton } from "@/components/Button/styles";
import { StyledInput } from "@/components/Input/styles";
import { colors } from "@/constants/Colors";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as S from "./styles";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const { setUsername: saveUsername } = useUser();
  const router = useRouter();

  const handleEnter = () => {
    if (!username.trim()) return;
    saveUsername(username.trim());
    router.push("/main");
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
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <S.Card>
        <S.Title>Welcome to CodeLeap network!</S.Title>
        <S.Label>Please enter your username</S.Label>
        <StyledInput
          testID="username-input"
          placeholder="John doe"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor={colors.placeholder}
        />
        <S.ButtonRow>
          <StyledButton
            testID="enter-button"
            onPress={handleEnter}
            disabled={!username.trim()}
          >
            <S.ButtonText>ENTER</S.ButtonText>
          </StyledButton>
        </S.ButtonRow>
      </S.Card>
    </KeyboardAwareScrollView>
  );
}

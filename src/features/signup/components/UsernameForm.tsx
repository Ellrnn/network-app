import Animated, { FadeInUp } from "react-native-reanimated";

import { colors } from "@/constants/colors";
import { StyledButton } from "@/components/Button";
import { StyledInput } from "@/components/Input";

import * as S from "./UsernameForm.styles";

type UsernameFormProps = {
  username: string;
  onUsernameChange: (value: string) => void;
  onSubmit: () => void;
};

export function UsernameForm({
  username,
  onUsernameChange,
  onSubmit,
}: UsernameFormProps) {
  return (
    <Animated.View entering={FadeInUp.duration(400)}>
      <S.Card>
        <S.Title>Welcome to CodeLeap network!</S.Title>
        <S.Label>Please enter your username</S.Label>
        <StyledInput
          testID="username-input"
          placeholder="John doe"
          value={username}
          onChangeText={onUsernameChange}
          placeholderTextColor={colors.placeholder}
          onSubmitEditing={onSubmit}
          returnKeyType="go"
        />
        <S.ButtonRow>
          <StyledButton
            testID="enter-button"
            onPress={onSubmit}
            disabled={!username.trim()}
          >
            <S.ButtonText>ENTER</S.ButtonText>
          </StyledButton>
        </S.ButtonRow>
      </S.Card>
    </Animated.View>
  );
}

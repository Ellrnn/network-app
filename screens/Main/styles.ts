import { Text } from "react-native";
import s from "styled-components/native";
import { colors } from "../../constants/Colors";

export const Container = s.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Header: typeof Text = s(Text)`
  background-color: ${colors.primary};
  color: ${colors.white};
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  padding: 16px;
`;

export const Card = s.View`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  padding: 16px;
  margin: 16px;
`;

export const Label = s.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const TextArea = s.TextInput`
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 8px;
  min-height: 80px;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const ButtonRow = s.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = s.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props) =>
    props.disabled ? colors.gray : colors.primary};
  border-radius: 8px;
  padding: 10px 20px;
`;

export const ButtonText = s.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

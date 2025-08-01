import s from "styled-components/native";
import { colors } from "../../constants/Colors";

export const Card = s.View`
  background-color: ${colors.white};
  border: 1px solid ${colors.border};
  border-radius: 16px;
  padding: 16px;
  margin: 16px;
`;
export const ButtonRow = s.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ButtonText = s.Text`
  color: ${colors.black};
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

export const Label = s.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

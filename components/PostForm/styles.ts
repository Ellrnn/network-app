import { colors } from "@/constants/Colors";
import s from "styled-components/native";

export const TextArea = s.TextInput`
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 8px;
  min-height: 80px;
  margin-bottom: 12px;
  font-size: 14px;
`;

export const Label = s.Text`
  font-size: 12px;
  font-weight: semibold;
  margin-bottom: 8px;
`;

import s from "styled-components/native";

import { colors } from "@/constants/colors";

export const Container = s.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const HeaderRow = s.View`
  background-color: ${colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Header = s.Text`
  color: ${colors.white};
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  padding: 16px;
  flex: 1;
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

export const ButtonRow = s.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const ButtonText = s.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;

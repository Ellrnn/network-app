import s from "styled-components/native";
import { colors } from "../../constants/Colors";

export const Card = s.View`
  padding: 0 16px;
`;

export const Title = s.Text`
  color: ${colors.white};
  font-size: 16px;
  font-weight: bold;
  flex: 1;
`;

export const Actions = s.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const IconButton = s.TouchableOpacity`
  padding: 4px;
`;

export const CardHeader = s.View`
  border-radius: 16px 16px 0 0;
  background-color: ${colors.primary};
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CardBody = s.View`
  border-radius: 0 0 16px 16px;
  padding: 16px;
  background-color: ${colors.background};
  border: 1px solid ${colors.border};
  border-top-width: 0;
`;

export const MetaRow = s.View`
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Username = s.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.text};
`;

export const Time = s.Text`
  font-size: 12px;
  color: ${colors.border};
`;

export const Content = s.Text`
  font-size: 14px;
  color: ${colors.text};
`;

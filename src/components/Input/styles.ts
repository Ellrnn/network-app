import s from "styled-components/native";

import { colors } from "@/constants/colors";

export const StyledInput = s.TextInput`
  border: 1px solid ${colors.border};
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 12px;
  font-size: 14px;
`;

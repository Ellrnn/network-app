import { colors } from "@/constants/Colors";
import s from "styled-components/native";

type ButtonProps = {
  disabled?: boolean;
  variant?: "primary" | "outline" | "danger" | "success";
};

export const StyledButton = s.TouchableOpacity<ButtonProps>`
  background-color: ${(props) => {
    if (props.disabled) return colors.gray;
    if (props.variant === "outline") return "transparent";
    if (props.variant === "danger") return colors.danger;
    if (props.variant === "success") return colors.success;
    return colors.primary;
  }};
  border: ${(props) =>
    props.variant === "outline" ? `1px solid ${colors.border}` : "none"};
  padding: 8px 32px;
  border-radius: 8px;
`;

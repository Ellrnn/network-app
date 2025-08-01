import s from "styled-components/native";

export const Card = s.View`
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 16px;
  padding: 20px;
  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
`;

export const Title = s.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 24px;
`;

export const Label = s.Text`
  font-size: 14px;
  margin-bottom: 8px;
  color: #333;
`;

export const ButtonRow = s.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Button = s.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  padding: 8px 32px;
  border-radius: 8px;
`;

export const ButtonText = s.Text`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
`;

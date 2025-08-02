import { act, render } from "@testing-library/react-native";

import { UserProvider } from "@/hooks/UserContext";
import SignupScreen from "@/screens/Signup";

describe("<SignupScreen />", () => {
  test("Text renders correctly on SignupScreen", () => {
    const { getByText } = render(
      <UserProvider>
        <SignupScreen />
      </UserProvider>
    );

    getByText("Welcome to CodeLeap network!");
    getByText("Please enter your username");
  });

  test("Button is disabled when input is empty", () => {
    const { getByTestId } = render(
      <UserProvider>
        <SignupScreen />
      </UserProvider>
    );

    const button = getByTestId("enter-button");
    expect(button.props.accessibilityState.disabled).toBe(true);

    const input = getByTestId("username-input");

    act(() => {
      input.props.onChangeText("John Doe");
    });

    expect(button.props.accessibilityState.disabled).toBe(false);

  });
});

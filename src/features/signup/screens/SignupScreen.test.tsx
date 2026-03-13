import { act, fireEvent, render } from "@testing-library/react-native";

import SignupScreen from "@/features/signup/screens/SignupScreen";
import { UserProvider } from "@/providers/UserProvider";

const mockPush = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("<SignupScreen />", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

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

  test("Stores username and navigates to main route", () => {
    const { getByTestId } = render(
      <UserProvider>
        <SignupScreen />
      </UserProvider>
    );

    const input = getByTestId("username-input");
    const button = getByTestId("enter-button");

    act(() => {
      input.props.onChangeText("John Doe");
    });

    fireEvent.press(button);

    expect(mockPush).toHaveBeenCalledWith("/main");
  });
});

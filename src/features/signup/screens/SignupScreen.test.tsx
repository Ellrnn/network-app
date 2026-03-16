import { act, fireEvent, render, waitFor } from "@testing-library/react-native";

import SignupScreen from "@/features/signup/screens/SignupScreen";
import { UserProvider } from "@/providers/UserProvider";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: {
      View,
      createAnimatedComponent: (c: unknown) => c,
    },
    FadeInUp: { duration: () => ({}) },
  };
});

jest.mock("react-native-keyboard-controller", () => {
  const { ScrollView } = require("react-native");
  return { KeyboardAwareScrollView: ScrollView };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({
    replace: mockReplace,
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

describe("<SignupScreen />", () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it("renders the welcome text and prompt", () => {
    const { getByText } = render(
      <UserProvider>
        <SignupScreen />
      </UserProvider>
    );

    expect(getByText("Welcome to CodeLeap network!")).toBeTruthy();
    expect(getByText("Please enter your username")).toBeTruthy();
  });

  it("disables the button when input is empty", () => {
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

  it("navigates to /main with replace when submitting", () => {
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

    expect(mockReplace).toHaveBeenCalledWith("/main");
  });

  it("persists the username via UserProvider on submit", async () => {
    const AsyncStorage =
      require("@react-native-async-storage/async-storage") as {
        setItem: jest.Mock;
      };

    const { getByTestId } = render(
      <UserProvider>
        <SignupScreen />
      </UserProvider>
    );

    const input = getByTestId("username-input");
    const button = getByTestId("enter-button");

    act(() => {
      input.props.onChangeText("Alice");
    });

    fireEvent.press(button);

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "@network_app/username",
        "Alice"
      );
    });
  });

  it("does not navigate when username is blank", () => {
    const { getByTestId } = render(
      <UserProvider>
        <SignupScreen />
      </UserProvider>
    );

    const input = getByTestId("username-input");
    const button = getByTestId("enter-button");

    act(() => {
      input.props.onChangeText("   ");
    });

    fireEvent.press(button);

    expect(mockReplace).not.toHaveBeenCalled();
  });
});

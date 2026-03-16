import { render, fireEvent, act } from "@testing-library/react-native";

import { UsernameForm } from "../UsernameForm";

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

describe("<UsernameForm />", () => {
  const defaultProps = {
    username: "",
    onUsernameChange: jest.fn(),
    onSubmit: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("renders welcome title and label", () => {
    const { getByText } = render(<UsernameForm {...defaultProps} />);
    expect(getByText("Welcome to CodeLeap network!")).toBeTruthy();
    expect(getByText("Please enter your username")).toBeTruthy();
  });

  it("renders the input with correct testID", () => {
    const { getByTestId } = render(<UsernameForm {...defaultProps} />);
    expect(getByTestId("username-input")).toBeTruthy();
  });

  it("disables the button when username is empty", () => {
    const { getByTestId } = render(<UsernameForm {...defaultProps} />);
    const button = getByTestId("enter-button");
    expect(button.props.accessibilityState.disabled).toBe(true);
  });

  it("enables the button when username is non-empty", () => {
    const { getByTestId } = render(
      <UsernameForm {...defaultProps} username="alice" />
    );
    const button = getByTestId("enter-button");
    expect(button.props.accessibilityState.disabled).toBe(false);
  });

  it("calls onUsernameChange when input text changes", () => {
    const { getByTestId } = render(<UsernameForm {...defaultProps} />);
    fireEvent.changeText(getByTestId("username-input"), "bob");
    expect(defaultProps.onUsernameChange).toHaveBeenCalledWith("bob");
  });

  it("calls onSubmit when the button is pressed", () => {
    const { getByTestId } = render(
      <UsernameForm {...defaultProps} username="alice" />
    );

    fireEvent.press(getByTestId("enter-button"));
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });
});

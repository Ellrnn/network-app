import { act, render } from "@testing-library/react-native";

import { UserProvider } from "@/hooks/UserContext";
import MainScreen from "@/screens/Main";

describe("<MainScreen />", () => {
  test.only("Text renders correctly on MainScreen", () => {
    const { getByText } = render(
      <UserProvider>
        <MainScreen />
      </UserProvider>
    );

    getByText("CodeLeap Network");
    getByText("What’s on your mind?");
    getByText("Title");
    getByText("Content");
  });

  test("Create post button is disabled when title or content is empty", () => {
    const { getByTestId } = render(
      <UserProvider>
        <MainScreen />
      </UserProvider>
    );

    const button = getByTestId("create-post-button");
    expect(button.props.accessibilityState.disabled).toBe(true);

    const titleInput = getByTestId("post-title-input");
    act(() => {
      titleInput.props.onChangeText("New Post Title");
    });

    expect(button.props.accessibilityState.disabled).toBe(true);

    const contentInput = getByTestId("post-content-input");
    act(() => {
      contentInput.props.onChangeText("This is the content of the post.");
    });

    expect(button.props.accessibilityState.disabled).toBe(false);
  });

  test("Renders posts", () => {});
});

import { render, fireEvent } from "@testing-library/react-native";

import { PostForm } from "../PostForm";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (c: unknown) => c },
  };
});

describe("<PostForm />", () => {
  const defaultProps = {
    title: "",
    setTitle: jest.fn(),
    content: "",
    setContent: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("renders Title and Content labels", () => {
    const { getByText } = render(<PostForm {...defaultProps} />);
    expect(getByText("Title")).toBeTruthy();
    expect(getByText("Content")).toBeTruthy();
  });

  it("renders inputs with default testIDs", () => {
    const { getByTestId } = render(<PostForm {...defaultProps} />);
    expect(getByTestId("post-title-input")).toBeTruthy();
    expect(getByTestId("post-content-input")).toBeTruthy();
  });

  it("uses custom testIDs when provided", () => {
    const { getByTestId } = render(
      <PostForm
        {...defaultProps}
        titleTestId="custom-title"
        contentTestId="custom-content"
      />
    );
    expect(getByTestId("custom-title")).toBeTruthy();
    expect(getByTestId("custom-content")).toBeTruthy();
  });

  it("calls setTitle when title input changes", () => {
    const { getByTestId } = render(<PostForm {...defaultProps} />);
    fireEvent.changeText(getByTestId("post-title-input"), "New Title");
    expect(defaultProps.setTitle).toHaveBeenCalledWith("New Title");
  });

  it("calls setContent when content input changes", () => {
    const { getByTestId } = render(<PostForm {...defaultProps} />);
    fireEvent.changeText(getByTestId("post-content-input"), "New Content");
    expect(defaultProps.setContent).toHaveBeenCalledWith("New Content");
  });

  it("displays the current title and content values", () => {
    const { getByTestId } = render(
      <PostForm {...defaultProps} title="My Title" content="My Content" />
    );
    expect(getByTestId("post-title-input").props.value).toBe("My Title");
    expect(getByTestId("post-content-input").props.value).toBe("My Content");
  });
});

import { render, fireEvent } from "@testing-library/react-native";

import { CommentsSheet } from "../CommentsSheet";
import { Comment } from "../../types";

jest.mock("react-native-modal", () => {
  const { View } = require("react-native");
  const React = require("react");
  return {
    __esModule: true,
    default: ({
      isVisible,
      children,
    }: {
      isVisible: boolean;
      children: React.ReactNode;
    }) => (isVisible ? <View>{children}</View> : null),
  };
});

jest.mock("@expo/vector-icons", () => {
  const { Text } = require("react-native");
  return {
    Ionicons: (props: Record<string, unknown>) => (
      <Text>{String(props.name)}</Text>
    ),
  };
});

const sampleComments: Comment[] = [
  {
    id: "c1",
    postId: 1,
    username: "alice",
    content: "Great post!",
    createdDatetime: new Date().toISOString(),
  },
  {
    id: "c2",
    postId: 1,
    username: "bob",
    content: "Thanks!",
    createdDatetime: new Date().toISOString(),
  },
];

describe("<CommentsSheet />", () => {
  const onClose = jest.fn();
  const onAddComment = jest.fn();
  const onDeleteComment = jest.fn();

  const defaultProps = {
    visible: true,
    onClose,
    comments: sampleComments,
    currentUser: "alice",
    onAddComment,
    onDeleteComment,
  };

  beforeEach(() => jest.clearAllMocks());

  it("renders nothing when not visible", () => {
    const { queryByText } = render(
      <CommentsSheet {...defaultProps} visible={false} />
    );
    expect(queryByText("Comments (2)")).toBeNull();
  });

  it("renders comments count in the title", () => {
    const { getByText } = render(<CommentsSheet {...defaultProps} />);
    expect(getByText("Comments (2)")).toBeTruthy();
  });

  it("renders each comment's username and content", () => {
    const { getByText } = render(<CommentsSheet {...defaultProps} />);
    expect(getByText("@alice")).toBeTruthy();
    expect(getByText("Great post!")).toBeTruthy();
    expect(getByText("@bob")).toBeTruthy();
    expect(getByText("Thanks!")).toBeTruthy();
  });

  it("shows empty state when there are no comments", () => {
    const { getByText } = render(
      <CommentsSheet {...defaultProps} comments={[]} />
    );
    expect(getByText("No comments yet. Be the first!")).toBeTruthy();
  });

  it("calls onAddComment with trimmed text when send is pressed", () => {
    const { getByPlaceholderText, getByText } = render(
      <CommentsSheet {...defaultProps} />
    );

    const input = getByPlaceholderText("Write a comment...");
    fireEvent.changeText(input, "  New comment  ");
    fireEvent.press(getByText("send"));

    expect(onAddComment).toHaveBeenCalledWith("New comment");
  });

  it("does not call onAddComment when input is empty/whitespace", () => {
    const { getByPlaceholderText, getByText } = render(
      <CommentsSheet {...defaultProps} />
    );

    const input = getByPlaceholderText("Write a comment...");
    fireEvent.changeText(input, "   ");
    fireEvent.press(getByText("send"));

    expect(onAddComment).not.toHaveBeenCalled();
  });
});

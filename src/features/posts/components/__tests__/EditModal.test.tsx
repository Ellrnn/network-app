import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { EditModal } from "../EditModal";
import { postsService } from "../../services/posts.service";
import { Post } from "../../types";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: { View, createAnimatedComponent: (c: unknown) => c },
  };
});

jest.mock("react-native-modal", () => {
  const { View } = require("react-native");
  const React = require("react");
  return {
    __esModule: true,
    default: ({
      isVisible,
      children,
      testID,
    }: {
      isVisible: boolean;
      children: React.ReactNode;
      testID?: string;
    }) => (isVisible ? <View testID={testID}>{children}</View> : null),
  };
});

jest.mock("react-native-keyboard-controller", () => {
  const { ScrollView } = require("react-native");
  return { KeyboardAwareScrollView: ScrollView };
});

jest.mock("../../services/posts.service", () => ({
  postsService: {
    getPosts: jest.fn(),
    getPostsPage: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  },
}));

function createWrapper() {
  const qc = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: PropsWithChildren) {
    return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
  };
}

const samplePost: Post = {
  id: 1,
  title: "Original Title",
  content: "Original Content",
  username: "alice",
  created_datetime: "2024-01-01T00:00:00Z",
};

describe("<EditModal />", () => {
  const onClose = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("renders nothing when not visible", () => {
    const { queryByTestId } = render(
      <EditModal isVisible={false} onClose={onClose} post={samplePost} />,
      { wrapper: createWrapper() }
    );
    expect(queryByTestId("edit-modal")).toBeNull();
  });

  it("pre-fills the form with the post data", () => {
    const { getByTestId } = render(
      <EditModal isVisible={true} onClose={onClose} post={samplePost} />,
      { wrapper: createWrapper() }
    );

    expect(getByTestId("edit-title-input").props.value).toBe(
      "Original Title"
    );
    expect(getByTestId("edit-content-input").props.value).toBe(
      "Original Content"
    );
  });

  it("calls onClose when cancel is pressed", () => {
    const { getByTestId } = render(
      <EditModal isVisible={true} onClose={onClose} post={samplePost} />,
      { wrapper: createWrapper() }
    );
    fireEvent.press(getByTestId("cancel-edit-button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls updatePost and onClose when save is pressed", async () => {
    (postsService.updatePost as jest.Mock).mockResolvedValue(samplePost);

    const { getByTestId } = render(
      <EditModal isVisible={true} onClose={onClose} post={samplePost} />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByTestId("save-edit-button"));

    await waitFor(() => {
      expect(postsService.updatePost).toHaveBeenCalledWith({
        id: 1,
        title: "Original Title",
        content: "Original Content",
      });
      expect(onClose).toHaveBeenCalled();
    });
  });
});

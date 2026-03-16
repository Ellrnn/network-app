import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { PropsWithChildren } from "react";

import { postsService } from "../../services/posts.service";
import { DeleteModal } from "../DeleteModal";

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

describe("<DeleteModal />", () => {
  const onClose = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it("renders nothing when not visible", () => {
    const { queryByTestId } = render(
      <DeleteModal isVisible={false} onClose={onClose} postId={1} />,
      { wrapper: createWrapper() }
    );
    expect(queryByTestId("delete-modal")).toBeNull();
  });

  it("renders confirmation text when visible", () => {
    const { getByText } = render(
      <DeleteModal isVisible={true} onClose={onClose} postId={1} />,
      { wrapper: createWrapper() }
    );
    expect(
      getByText("Are you sure you want to delete this item?")
    ).toBeTruthy();
  });

  it("calls onClose when cancel is pressed", () => {
    const { getByTestId } = render(
      <DeleteModal isVisible={true} onClose={onClose} postId={1} />,
      { wrapper: createWrapper() }
    );
    fireEvent.press(getByTestId("cancel-delete-button"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls deletePost and onClose when confirm is pressed", async () => {
    (postsService.deletePost as jest.Mock).mockResolvedValue(undefined);

    const { getByTestId } = render(
      <DeleteModal isVisible={true} onClose={onClose} postId={42} />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByTestId("confirm-delete-button"));

    await waitFor(() => {
      expect(postsService.deletePost).toHaveBeenCalledWith(42);
      expect(onClose).toHaveBeenCalled();
    });
  });
});

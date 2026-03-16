import { render, fireEvent } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import PostCard from "../PostCard";
import { EnrichedPost } from "../../types";

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native");
  return {
    __esModule: true,
    default: {
      View,
      createAnimatedComponent: (c: unknown) => c,
    },
    useSharedValue: (v: unknown) => ({ value: v }),
    useAnimatedStyle: () => ({}),
    withTiming: (v: unknown) => v,
    withSequence: (v: unknown) => v,
    Easing: { out: () => ({}), inOut: () => ({}), ease: {} },
    FadeInDown: { delay: () => ({ duration: () => ({}) }) },
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

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: "light" },
}));

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

jest.mock("../../services/interactions.mock.service", () => ({
  interactionsMockService: {
    getStore: jest.fn().mockResolvedValue({}),
    toggleLike: jest.fn().mockResolvedValue({ liked: true, likesCount: 1 }),
    addComment: jest.fn().mockResolvedValue({
      id: "c1",
      postId: 1,
      username: "alice",
      content: "test",
      createdDatetime: new Date().toISOString(),
    }),
    deleteComment: jest.fn().mockResolvedValue(undefined),
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

const basePost: EnrichedPost = {
  id: 1,
  title: "Test Post",
  content: "Hello @bob",
  username: "alice",
  created_datetime: new Date().toISOString(),
  likesCount: 3,
  likedByMe: false,
  commentsCount: 1,
  comments: [
    {
      id: "c1",
      postId: 1,
      username: "bob",
      content: "Nice!",
      createdDatetime: new Date().toISOString(),
    },
  ],
  mentions: ["bob"],
};

describe("<PostCard />", () => {
  beforeEach(() => jest.clearAllMocks());

  it("renders post title and username", () => {
    const { getByText } = render(
      <PostCard post={basePost} currentUser="alice" index={0} />,
      { wrapper: createWrapper() }
    );
    expect(getByText("Test Post")).toBeTruthy();
    expect(getByText("@alice")).toBeTruthy();
  });

  it("shows edit and delete icons when current user is the owner", () => {
    const { getByTestId } = render(
      <PostCard post={basePost} currentUser="alice" index={0} />,
      { wrapper: createWrapper() }
    );
    expect(getByTestId("edit-post-button")).toBeTruthy();
    expect(getByTestId("delete-post-button")).toBeTruthy();
  });

  it("hides edit and delete icons when current user is NOT the owner", () => {
    const { queryByTestId } = render(
      <PostCard post={basePost} currentUser="bob" index={0} />,
      { wrapper: createWrapper() }
    );
    expect(queryByTestId("edit-post-button")).toBeNull();
    expect(queryByTestId("delete-post-button")).toBeNull();
  });

  it("renders likes and comments counts", () => {
    const { getByText } = render(
      <PostCard post={basePost} currentUser="alice" index={0} />,
      { wrapper: createWrapper() }
    );
    expect(getByText("3")).toBeTruthy();
    expect(getByText("1")).toBeTruthy();
  });

  it("opens delete modal when trash icon is pressed", () => {
    const { getByTestId } = render(
      <PostCard post={basePost} currentUser="alice" index={0} />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByTestId("delete-post-button"));
    expect(getByTestId("delete-modal")).toBeTruthy();
  });

  it("opens edit modal when edit icon is pressed", () => {
    const { getByTestId } = render(
      <PostCard post={basePost} currentUser="alice" index={0} />,
      { wrapper: createWrapper() }
    );

    fireEvent.press(getByTestId("edit-post-button"));
    expect(getByTestId("edit-modal")).toBeTruthy();
  });
});

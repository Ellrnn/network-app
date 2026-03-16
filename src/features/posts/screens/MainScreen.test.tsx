import { act, render, waitFor, fireEvent } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import MainScreen from "@/features/posts/screens/MainScreen";
import { postsService } from "@/features/posts/services/posts.service";
import { interactionsMockService } from "@/features/posts/services/interactions.mock.service";
import { UserProvider } from "@/providers/UserProvider";

const mockReplace = jest.fn();

jest.mock("expo-router", () => ({
  useRouter: () => ({ replace: mockReplace, push: jest.fn(), back: jest.fn() }),
}));

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
    FadeInUp: { duration: () => ({}) },
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

jest.mock("react-native-keyboard-controller", () => {
  const { ScrollView } = require("react-native");
  return { KeyboardAwareScrollView: ScrollView };
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

jest.mock("@legendapp/list", () => {
  const { FlatList } = require("react-native");
  return { LegendList: FlatList };
});

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("@/features/posts/services/posts.service", () => ({
  postsService: {
    getPosts: jest.fn(),
    getPostsPage: jest.fn(),
    createPost: jest.fn(),
    deletePost: jest.fn(),
    updatePost: jest.fn(),
  },
}));

jest.mock("@/features/posts/services/interactions.mock.service", () => ({
  interactionsMockService: {
    getStore: jest.fn(),
    toggleLike: jest.fn(),
    addComment: jest.fn(),
    deleteComment: jest.fn(),
  },
}));

const mockPostsPage = {
  count: 3,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      title: "First Post",
      content: "Content of the first post.",
      username: "user1",
      created_datetime: "2023-01-01T10:00:00Z",
    },
    {
      id: 2,
      title: "Second Post",
      content: "Content of the second post.",
      username: "user2",
      created_datetime: "2023-01-02T15:30:00Z",
    },
    {
      id: 3,
      title: "Third Post",
      content: "Another post here.",
      username: "user3",
      created_datetime: "2023-01-03T09:15:00Z",
    },
  ],
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { gcTime: Infinity, retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: PropsWithChildren) {
    return (
      <QueryClientProvider client={queryClient}>
        <UserProvider>{children}</UserProvider>
      </QueryClientProvider>
    );
  };
}

describe("<MainScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (interactionsMockService.getStore as jest.Mock).mockResolvedValue({});
  });

  it("renders the header and form labels", async () => {
    (postsService.getPostsPage as jest.Mock).mockResolvedValue({
      ...mockPostsPage,
      results: [],
    });

    const { getByText } = render(<MainScreen />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(getByText("CodeLeap Network")).toBeTruthy();
      expect(getByText("What's on your mind?")).toBeTruthy();
      expect(getByText("Title")).toBeTruthy();
      expect(getByText("Content")).toBeTruthy();
    });
  });

  it("disables create button when title or content is empty", async () => {
    (postsService.getPostsPage as jest.Mock).mockResolvedValue({
      ...mockPostsPage,
      results: [],
    });

    const { getByTestId } = render(<MainScreen />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(getByTestId("create-post-button")).toBeTruthy();
    });

    const button = getByTestId("create-post-button");
    expect(button.props.accessibilityState.disabled).toBe(true);

    const titleInput = getByTestId("post-title-input");
    act(() => {
      titleInput.props.onChangeText("New Post Title");
    });
    expect(button.props.accessibilityState.disabled).toBe(true);

    const contentInput = getByTestId("post-content-input");
    act(() => {
      contentInput.props.onChangeText("New post content here.");
    });
    expect(button.props.accessibilityState.disabled).toBe(false);
  });

  it("renders a list of posts from getPostsPage", async () => {
    (postsService.getPostsPage as jest.Mock).mockResolvedValue(mockPostsPage);

    const { getByText, getByTestId } = render(<MainScreen />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(getByTestId("posts-list")).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText("First Post")).toBeTruthy();
      expect(getByText("Second Post")).toBeTruthy();
      expect(getByText("Third Post")).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText("@user1")).toBeTruthy();
      expect(getByText("@user2")).toBeTruthy();
      expect(getByText("@user3")).toBeTruthy();
    });

    expect(postsService.getPostsPage).toHaveBeenCalledTimes(1);
  });

  it("handles an empty posts list", async () => {
    (postsService.getPostsPage as jest.Mock).mockResolvedValue({
      ...mockPostsPage,
      count: 0,
      results: [],
    });

    const { getByText } = render(<MainScreen />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(
        getByText("No posts yet. Create the first one!")
      ).toBeTruthy();
    });
  });

  it("renders sort and filter chips", async () => {
    (postsService.getPostsPage as jest.Mock).mockResolvedValue({
      ...mockPostsPage,
      results: [],
    });

    const { getByText } = render(<MainScreen />, {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(getByText("Newest")).toBeTruthy();
      expect(getByText("Oldest")).toBeTruthy();
      expect(getByText("Most Liked")).toBeTruthy();
      expect(getByText("All")).toBeTruthy();
      expect(getByText("My Posts")).toBeTruthy();
      expect(getByText("Mentions Me")).toBeTruthy();
    });
  });
});

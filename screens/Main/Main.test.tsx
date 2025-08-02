import { act, render, waitFor } from "@testing-library/react-native";

import { UserProvider } from "@/hooks/UserContext";
import MainScreen from "@/screens/Main";

import { getPosts } from "@/services/api/posts";

jest.mock("@/services/api/posts", () => ({
  getPosts: jest.fn(),
  createPost: jest.fn(),
  deletePost: jest.fn(),
  updatePost: jest.fn(),
}));

const mockPosts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first post.",
    username: "user1",
    created_datetime: "2023-01-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second post with more details.",
    username: "user2",
    created_datetime: "2023-01-02T15:30:00Z",
  },
  {
    id: 3,
    title: "Third Post",
    content: "Another interesting post content here.",
    username: "testuser",
    created_datetime: "2023-01-03T09:15:00Z",
  },
];

describe("<MainScreen />", () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args: any[]) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes(
          "Warning: An update to %s inside a test was not wrapped in act"
        )
      ) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Text renders correctly on MainScreen", async () => {
    (getPosts as jest.Mock).mockResolvedValue([]);

    const { getByText } = render(
      <UserProvider>
        <MainScreen />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByText("CodeLeap Network")).toBeTruthy();
      expect(getByText("What's on your mind?")).toBeTruthy();
      expect(getByText("Title")).toBeTruthy();
      expect(getByText("Content")).toBeTruthy();
    });
  });

  test("Create post button is disabled when title or content is empty", async () => {
    (getPosts as jest.Mock).mockResolvedValue([]);

    const { getByTestId } = render(
      <UserProvider>
        <MainScreen />
      </UserProvider>
    );

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
      contentInput.props.onChangeText("This is the content of the post.");
    });

    expect(button.props.accessibilityState.disabled).toBe(false);
  });

  test("Renders posts", async () => {
    (getPosts as jest.Mock).mockResolvedValue(mockPosts);

    const { getByTestId, getByText } = render(
      <UserProvider>
        <MainScreen />
      </UserProvider>
    );

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
      expect(getByText("@testuser")).toBeTruthy();
    });

    await waitFor(() => {
      expect(getByText("This is the content of the first post.")).toBeTruthy();
      expect(
        getByText("This is the content of the second post with more details.")
      ).toBeTruthy();
      expect(getByText("Another interesting post content here.")).toBeTruthy();
    });

    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  test("Handles empty posts list", async () => {
    (getPosts as jest.Mock).mockResolvedValue([]);

    const { getByTestId } = render(
      <UserProvider>
        <MainScreen />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByTestId("posts-list")).toBeTruthy();
    });

    expect(getPosts).toHaveBeenCalledTimes(1);
  });

  test("Handles API error when fetching posts", async () => {
    (getPosts as jest.Mock).mockRejectedValue(new Error("API Error"));

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const { getByTestId } = render(
      <UserProvider>
        <MainScreen />
      </UserProvider>
    );

    await waitFor(() => {
      expect(getByTestId("posts-list")).toBeTruthy();
    });

    expect(getPosts).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Erro ao buscar posts",
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});

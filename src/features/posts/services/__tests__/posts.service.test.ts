import {
  fetchPostsRequest,
  fetchPostsPageRequest,
  createPostRequest,
  updatePostRequest,
  deletePostRequest,
} from "@/services/api/posts.api";
import { postsService } from "../posts.service";

jest.mock("@/services/api/posts.api", () => ({
  fetchPostsRequest: jest.fn(),
  fetchPostsPageRequest: jest.fn(),
  createPostRequest: jest.fn(),
  updatePostRequest: jest.fn(),
  deletePostRequest: jest.fn(),
}));

const samplePost = {
  id: 1,
  title: "Hello",
  content: "World",
  username: "alice",
  created_datetime: "2024-01-01T00:00:00Z",
};

describe("postsService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getPosts", () => {
    it("delegates to fetchPostsRequest and maps results", async () => {
      (fetchPostsRequest as jest.Mock).mockResolvedValue([samplePost]);

      const result = await postsService.getPosts();

      expect(fetchPostsRequest).toHaveBeenCalledTimes(1);
      expect(result).toEqual([samplePost]);
    });
  });

  describe("getPostsPage", () => {
    it("delegates to fetchPostsPageRequest and maps results", async () => {
      const pageData = {
        count: 1,
        next: null,
        previous: null,
        results: [samplePost],
      };
      (fetchPostsPageRequest as jest.Mock).mockResolvedValue(pageData);

      const result = await postsService.getPostsPage({
        limit: 10,
        offset: 0,
      });

      expect(fetchPostsPageRequest).toHaveBeenCalledWith({
        limit: 10,
        offset: 0,
      });
      expect(result.results).toEqual([samplePost]);
    });
  });

  describe("createPost", () => {
    it("delegates to createPostRequest", async () => {
      (createPostRequest as jest.Mock).mockResolvedValue(samplePost);

      const input = { username: "alice", title: "Hello", content: "World" };
      const result = await postsService.createPost(input);

      expect(createPostRequest).toHaveBeenCalledWith(input);
      expect(result).toEqual(samplePost);
    });
  });

  describe("updatePost", () => {
    it("delegates to updatePostRequest with correct params", async () => {
      const updated = { ...samplePost, title: "Updated" };
      (updatePostRequest as jest.Mock).mockResolvedValue(updated);

      const input = { id: 1, title: "Updated", content: "World" };
      const result = await postsService.updatePost(input);

      expect(updatePostRequest).toHaveBeenCalledWith(1, {
        title: "Updated",
        content: "World",
      });
      expect(result).toEqual(updated);
    });
  });

  describe("deletePost", () => {
    it("delegates to deletePostRequest", async () => {
      (deletePostRequest as jest.Mock).mockResolvedValue(undefined);

      await postsService.deletePost(1);

      expect(deletePostRequest).toHaveBeenCalledWith(1);
    });
  });
});

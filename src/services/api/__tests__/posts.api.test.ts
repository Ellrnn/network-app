import { apiClient } from "../client";
import {
  fetchPostsRequest,
  fetchPostsPageRequest,
  createPostRequest,
  updatePostRequest,
  deletePostRequest,
} from "../posts.api";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

const samplePost = {
  id: 1,
  title: "Hello",
  content: "World",
  username: "alice",
  created_datetime: "2024-01-01T00:00:00Z",
};

describe("posts.api", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("fetchPostsRequest", () => {
    it("calls GET / and returns results array", async () => {
      mockedClient.get.mockResolvedValue({
        data: { count: 1, next: null, previous: null, results: [samplePost] },
      });

      const result = await fetchPostsRequest();

      expect(mockedClient.get).toHaveBeenCalledWith("/");
      expect(result).toEqual([samplePost]);
    });
  });

  describe("fetchPostsPageRequest", () => {
    it("calls GET / with limit and offset params", async () => {
      const pageData = {
        count: 20,
        next: "url",
        previous: null,
        results: [samplePost],
      };
      mockedClient.get.mockResolvedValue({ data: pageData });

      const result = await fetchPostsPageRequest({ limit: 10, offset: 0 });

      expect(mockedClient.get).toHaveBeenCalledWith("/", {
        params: { limit: 10, offset: 0 },
      });
      expect(result).toEqual(pageData);
    });
  });

  describe("createPostRequest", () => {
    it("calls POST / with the payload and returns the created post", async () => {
      mockedClient.post.mockResolvedValue({ data: samplePost });

      const payload = { username: "alice", title: "Hello", content: "World" };
      const result = await createPostRequest(payload);

      expect(mockedClient.post).toHaveBeenCalledWith("/", payload);
      expect(result).toEqual(samplePost);
    });
  });

  describe("updatePostRequest", () => {
    it("calls PATCH /:id/ with title and content", async () => {
      const updated = { ...samplePost, title: "Updated" };
      mockedClient.patch.mockResolvedValue({ data: updated });

      const result = await updatePostRequest(1, {
        title: "Updated",
        content: "World",
      });

      expect(mockedClient.patch).toHaveBeenCalledWith("/1/", {
        title: "Updated",
        content: "World",
      });
      expect(result).toEqual(updated);
    });
  });

  describe("deletePostRequest", () => {
    it("calls DELETE /:id/", async () => {
      mockedClient.delete.mockResolvedValue({});

      await deletePostRequest(1);

      expect(mockedClient.delete).toHaveBeenCalledWith("/1/");
    });
  });

  describe("error propagation", () => {
    it("propagates network errors from GET", async () => {
      mockedClient.get.mockRejectedValue(new Error("Network Error"));
      await expect(fetchPostsRequest()).rejects.toThrow("Network Error");
    });
  });
});

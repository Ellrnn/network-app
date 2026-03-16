import AsyncStorage from "@react-native-async-storage/async-storage";

import { interactionsMockService } from "../interactions.mock.service";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
  removeItem: jest.fn(() => Promise.resolve()),
}));

jest.mock("../../utils/mockLatency", () => ({
  mockLatency: () => Promise.resolve(),
  generateId: (() => {
    let counter = 0;
    return () => `test-id-${++counter}`;
  })(),
}));

describe("interactionsMockService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getStore", () => {
    it("reads from AsyncStorage on first call", async () => {
      const store = await interactionsMockService.getStore();

      expect(AsyncStorage.getItem).toHaveBeenCalled();
      expect(store).toEqual({});
    });
  });

  describe("toggleLike", () => {
    it("adds a like when user has not liked", async () => {
      const result = await interactionsMockService.toggleLike(100, "alice");

      expect(result.liked).toBe(true);
      expect(result.likesCount).toBe(1);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });

    it("removes a like when user already liked the same post", async () => {
      const result = await interactionsMockService.toggleLike(100, "alice");

      expect(result.liked).toBe(false);
      expect(result.likesCount).toBe(0);
    });
  });

  describe("addComment", () => {
    it("adds a comment and persists", async () => {
      const comment = await interactionsMockService.addComment(
        200,
        "bob",
        "Nice post!"
      );

      expect(comment.username).toBe("bob");
      expect(comment.content).toBe("Nice post!");
      expect(comment.postId).toBe(200);
      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("deleteComment", () => {
    it("removes a comment by id", async () => {
      const comment = await interactionsMockService.addComment(
        300,
        "charlie",
        "To delete"
      );

      await interactionsMockService.deleteComment(300, comment.id);

      const store = await interactionsMockService.getStore();
      const remaining = store[300]?.comments ?? [];
      expect(remaining.find((c) => c.id === comment.id)).toBeUndefined();
    });

    it("does nothing when post has no interactions", async () => {
      await expect(
        interactionsMockService.deleteComment(999, "nonexistent")
      ).resolves.toBeUndefined();
    });
  });
});

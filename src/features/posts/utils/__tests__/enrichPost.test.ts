import { InteractionsStore, Post } from "../../types";
import { enrichPost } from "../enrichPost";

const basePost: Post = {
  id: 1,
  title: "Test Post",
  content: "Hello @alice and @bob",
  username: "charlie",
  created_datetime: "2024-01-01T00:00:00Z",
};

describe("enrichPost", () => {
  it("enriches a post with interactions from the store", () => {
    const store: InteractionsStore = {
      1: {
        likedBy: ["alice", "bob"],
        comments: [
          {
            id: "c1",
            postId: 1,
            username: "alice",
            content: "Nice!",
            createdDatetime: "2024-01-01T01:00:00Z",
          },
        ],
      },
    };

    const result = enrichPost(basePost, store, "alice");

    expect(result.likesCount).toBe(2);
    expect(result.likedByMe).toBe(true);
    expect(result.commentsCount).toBe(1);
    expect(result.comments).toHaveLength(1);
    expect(result.mentions).toEqual(["alice", "bob"]);
  });

  it("returns zero counts when post has no interactions in store", () => {
    const result = enrichPost(basePost, {}, "alice");

    expect(result.likesCount).toBe(0);
    expect(result.likedByMe).toBe(false);
    expect(result.commentsCount).toBe(0);
    expect(result.comments).toEqual([]);
  });

  it("sets likedByMe to false when current user has not liked", () => {
    const store: InteractionsStore = {
      1: { likedBy: ["bob"], comments: [] },
    };

    const result = enrichPost(basePost, store, "alice");
    expect(result.likedByMe).toBe(false);
  });

  it("preserves original post fields", () => {
    const result = enrichPost(basePost, {}, "alice");

    expect(result.id).toBe(basePost.id);
    expect(result.title).toBe(basePost.title);
    expect(result.content).toBe(basePost.content);
    expect(result.username).toBe(basePost.username);
    expect(result.created_datetime).toBe(basePost.created_datetime);
  });

  it("extracts mentions from post content", () => {
    const noMentionPost: Post = { ...basePost, content: "no mentions here" };
    const result = enrichPost(noMentionPost, {}, "alice");
    expect(result.mentions).toEqual([]);
  });
});

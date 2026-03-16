import { EnrichedPost } from "../../types";
import { applyFiltering } from "../filtering";

const makePosts = (): EnrichedPost[] => [
  {
    id: 1,
    title: "Post A",
    content: "hello @bob",
    username: "alice",
    created_datetime: "2024-01-01T00:00:00Z",
    likesCount: 2,
    likedByMe: false,
    commentsCount: 0,
    comments: [],
    mentions: ["bob"],
  },
  {
    id: 2,
    title: "Post B",
    content: "no mentions here",
    username: "bob",
    created_datetime: "2024-01-02T00:00:00Z",
    likesCount: 0,
    likedByMe: false,
    commentsCount: 0,
    comments: [],
    mentions: [],
  },
  {
    id: 3,
    title: "Post C",
    content: "hey @alice",
    username: "charlie",
    created_datetime: "2024-01-03T00:00:00Z",
    likesCount: 5,
    likedByMe: true,
    commentsCount: 1,
    comments: [],
    mentions: ["alice"],
  },
];

describe("applyFiltering", () => {
  it('returns all posts for "all" filter', () => {
    const posts = makePosts();
    expect(applyFiltering(posts, "all", "alice")).toHaveLength(3);
  });

  it('returns only the user\'s posts for "my_posts"', () => {
    const posts = makePosts();
    const result = applyFiltering(posts, "my_posts", "alice");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("alice");
  });

  it('returns posts that mention the user for "mentioned_me"', () => {
    const posts = makePosts();
    const result = applyFiltering(posts, "mentioned_me", "alice");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  it("returns empty array when no posts match the filter", () => {
    const posts = makePosts();
    expect(applyFiltering(posts, "my_posts", "nobody")).toHaveLength(0);
  });

  it("handles empty posts array", () => {
    expect(applyFiltering([], "all", "alice")).toEqual([]);
  });
});

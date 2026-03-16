import { EnrichedPost } from "../../types";
import { applySorting } from "../sorting";

const makePosts = (): EnrichedPost[] => [
  {
    id: 1,
    title: "Old Post",
    content: "",
    username: "a",
    created_datetime: "2024-01-01T00:00:00Z",
    likesCount: 10,
    likedByMe: false,
    commentsCount: 0,
    comments: [],
    mentions: [],
  },
  {
    id: 2,
    title: "Middle Post",
    content: "",
    username: "b",
    created_datetime: "2024-06-01T00:00:00Z",
    likesCount: 5,
    likedByMe: false,
    commentsCount: 0,
    comments: [],
    mentions: [],
  },
  {
    id: 3,
    title: "New Post",
    content: "",
    username: "c",
    created_datetime: "2024-12-01T00:00:00Z",
    likesCount: 1,
    likedByMe: false,
    commentsCount: 0,
    comments: [],
    mentions: [],
  },
];

describe("applySorting", () => {
  it("sorts by newest first", () => {
    const result = applySorting(makePosts(), "newest");
    expect(result.map((p) => p.id)).toEqual([3, 2, 1]);
  });

  it("sorts by oldest first", () => {
    const result = applySorting(makePosts(), "oldest");
    expect(result.map((p) => p.id)).toEqual([1, 2, 3]);
  });

  it("sorts by most liked", () => {
    const result = applySorting(makePosts(), "most_liked");
    expect(result.map((p) => p.id)).toEqual([1, 2, 3]);
  });

  it("does not mutate the original array", () => {
    const posts = makePosts();
    const original = [...posts];
    applySorting(posts, "newest");
    expect(posts.map((p) => p.id)).toEqual(original.map((p) => p.id));
  });

  it("handles empty array", () => {
    expect(applySorting([], "newest")).toEqual([]);
  });

  it("handles single element array", () => {
    const single = [makePosts()[0]];
    expect(applySorting(single, "newest")).toHaveLength(1);
  });
});

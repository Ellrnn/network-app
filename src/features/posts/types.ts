export type Post = {
  id: number;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
};

export type Comment = {
  id: string;
  postId: number;
  username: string;
  content: string;
  createdDatetime: string;
};

export type PostInteractions = {
  likedBy: string[];
  comments: Comment[];
};

export type InteractionsStore = Record<number, PostInteractions>;

export type EnrichedPost = Post & {
  likesCount: number;
  likedByMe: boolean;
  commentsCount: number;
  comments: Comment[];
  mentions: string[];
};

export type CreatePostInput = {
  username: string;
  title: string;
  content: string;
};

export type UpdatePostInput = {
  id: number;
  title: string;
  content: string;
};

export type PostsPage = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
};

export type SortOption = "newest" | "oldest" | "most_liked";

export type FilterOption = "all" | "my_posts" | "mentioned_me";

export type Post = {
  id: number;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
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

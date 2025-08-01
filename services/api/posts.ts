import { apiClient } from "./client";

export type Post = {
  id: number;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
};

export async function getPosts() {
  const res = await apiClient.get("/");
  return res.data.results as Post[];
}

export async function createPost(
  username: string,
  title: string,
  content: string
) {
  const res = await apiClient.post("/", { username, title, content });
  return res.data as Post;
}

export async function deletePost(id: number) {
  await apiClient.delete(`/${id}/`);
}

export async function updatePost(id: number, title: string, content: string) {
  const res = await apiClient.patch(`/${id}/`, { title, content });
  return res.data as Post;
}

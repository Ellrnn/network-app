import { apiClient } from "@/services/api/client";

type PostApiModel = {
  id: number;
  title: string;
  content: string;
  username: string;
  created_datetime: string;
};

type PostsListResponse = {
  results: PostApiModel[];
};

export async function fetchPostsRequest() {
  const response = await apiClient.get<PostsListResponse>("/");
  return response.data.results;
}

export async function createPostRequest(payload: {
  username: string;
  title: string;
  content: string;
}) {
  const response = await apiClient.post<PostApiModel>("/", payload);
  return response.data;
}

export async function updatePostRequest(
  id: number,
  payload: { title: string; content: string }
) {
  const response = await apiClient.patch<PostApiModel>(`/${id}/`, payload);
  return response.data;
}

export async function deletePostRequest(id: number) {
  await apiClient.delete(`/${id}/`);
}

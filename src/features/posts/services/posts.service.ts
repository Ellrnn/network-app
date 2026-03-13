import {
  createPostRequest,
  deletePostRequest,
  fetchPostsRequest,
  updatePostRequest,
} from "@/services/api/posts.api";

import { CreatePostInput, Post, UpdatePostInput } from "../types";

const toPost = (post: Post): Post => post;

export const postsService = {
  async getPosts() {
    const posts = await fetchPostsRequest();
    return posts.map(toPost);
  },
  async createPost(input: CreatePostInput) {
    const post = await createPostRequest(input);
    return toPost(post);
  },
  async updatePost(input: UpdatePostInput) {
    const post = await updatePostRequest(input.id, {
      title: input.title,
      content: input.content,
    });
    return toPost(post);
  },
  async deletePost(id: number) {
    await deletePostRequest(id);
  },
};

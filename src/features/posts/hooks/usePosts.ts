import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { postsService } from "@/features/posts/services/posts.service";
import { CreatePostInput, UpdatePostInput } from "@/features/posts/types";

export const postsQueryKeys = {
  all: ["posts"] as const,
};

export function usePostsQuery() {
  return useQuery({
    queryKey: postsQueryKeys.all,
    queryFn: () => postsService.getPosts(),
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePostInput) => postsService.createPost(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postsQueryKeys.all });
    },
  });
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UpdatePostInput) => postsService.updatePost(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postsQueryKeys.all });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => postsService.deletePost(postId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: postsQueryKeys.all });
    },
  });
}

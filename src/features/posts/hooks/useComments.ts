import { useMutation, useQueryClient } from "@tanstack/react-query";

import { interactionsMockService } from "@/features/posts/services/interactions.mock.service";
import { InteractionsStore } from "@/features/posts/types";
import { generateId } from "@/features/posts/utils/mockLatency";

import { postsQueryKeys } from "./usePosts";

export function useAddCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      username,
      content,
    }: {
      postId: number;
      username: string;
      content: string;
    }) => interactionsMockService.addComment(postId, username, content),
    onMutate: async ({ postId, username, content }) => {
      await queryClient.cancelQueries({
        queryKey: postsQueryKeys.interactions,
      });
      const previous = queryClient.getQueryData<InteractionsStore>(
        postsQueryKeys.interactions
      );
      queryClient.setQueryData<InteractionsStore>(
        postsQueryKeys.interactions,
        (old) => {
          if (!old) return old;
          const entry = old[postId] ?? {
            likedBy: [],
            comments: [],
          };
          return {
            ...old,
            [postId]: {
              ...entry,
              comments: [
                {
                  id: generateId(),
                  postId,
                  username,
                  content,
                  createdDatetime: new Date().toISOString(),
                },
                ...entry.comments,
              ],
            },
          };
        }
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          postsQueryKeys.interactions,
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.interactions,
      });
    },
  });
}

export function useDeleteCommentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      postId,
      commentId,
    }: {
      postId: number;
      commentId: string;
    }) => interactionsMockService.deleteComment(postId, commentId),
    onMutate: async ({ postId, commentId }) => {
      await queryClient.cancelQueries({
        queryKey: postsQueryKeys.interactions,
      });
      const previous = queryClient.getQueryData<InteractionsStore>(
        postsQueryKeys.interactions
      );
      queryClient.setQueryData<InteractionsStore>(
        postsQueryKeys.interactions,
        (old) => {
          if (!old) return old;
          const entry = old[postId];
          if (!entry) return old;
          return {
            ...old,
            [postId]: {
              ...entry,
              comments: entry.comments.filter((c) => c.id !== commentId),
            },
          };
        }
      );
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          postsQueryKeys.interactions,
          context.previous
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: postsQueryKeys.interactions,
      });
    },
  });
}

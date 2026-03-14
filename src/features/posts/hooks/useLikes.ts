import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { interactionsMockService } from "@/features/posts/services/interactions.mock.service";
import { InteractionsStore } from "@/features/posts/types";

import { postsQueryKeys } from "./usePosts";

export function useInteractionsStore() {
  return useQuery<InteractionsStore>({
    queryKey: postsQueryKeys.interactions,
    queryFn: () => interactionsMockService.getStore(),
    staleTime: Infinity,
  });
}

export function useLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, username }: { postId: number; username: string }) =>
      interactionsMockService.toggleLike(postId, username),
    onMutate: async ({ postId, username }) => {
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
          const alreadyLiked = entry.likedBy.includes(username);
          return {
            ...old,
            [postId]: {
              ...entry,
              likedBy: alreadyLiked
                ? entry.likedBy.filter((u) => u !== username)
                : [...entry.likedBy, username],
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

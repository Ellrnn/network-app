import { useInfiniteQuery } from "@tanstack/react-query";

import { postsService } from "@/features/posts/services/posts.service";
import { PostsPage } from "@/features/posts/types";

import { postsQueryKeys } from "./usePosts";

const PAGE_SIZE = 10;

export function useInfinitePosts() {
  return useInfiniteQuery<PostsPage>({
    queryKey: postsQueryKeys.list,
    queryFn: ({ pageParam }) =>
      postsService.getPostsPage({
        limit: PAGE_SIZE,
        offset: pageParam as number,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.next) return undefined;
      return allPages.reduce((acc, page) => acc + page.results.length, 0);
    },
  });
}

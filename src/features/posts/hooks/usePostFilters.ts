import { useCallback, useMemo, useState } from "react";

import {
  EnrichedPost,
  FilterOption,
  SortOption,
} from "@/features/posts/types";
import { applyFiltering } from "@/features/posts/utils/filtering";
import { applySorting } from "@/features/posts/utils/sorting";

export function usePostFilters() {
  const [sort, setSort] = useState<SortOption>("newest");
  const [filter, setFilter] = useState<FilterOption>("all");

  const resetFilters = useCallback(() => {
    setSort("newest");
    setFilter("all");
  }, []);

  return { sort, setSort, filter, setFilter, resetFilters };
}

export function useFilteredPosts(
  posts: EnrichedPost[],
  sort: SortOption,
  filter: FilterOption,
  username: string
): EnrichedPost[] {
  return useMemo(() => {
    const filtered = applyFiltering(posts, filter, username);
    return applySorting(filtered, sort);
  }, [posts, sort, filter, username]);
}

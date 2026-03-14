import { EnrichedPost, SortOption } from "../types";

export function applySorting(
  posts: EnrichedPost[],
  sort: SortOption
): EnrichedPost[] {
  const sorted = [...posts];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.created_datetime).getTime() -
          new Date(a.created_datetime).getTime()
      );
    case "oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.created_datetime).getTime() -
          new Date(b.created_datetime).getTime()
      );
    case "most_liked":
      return sorted.sort((a, b) => b.likesCount - a.likesCount);
    default:
      return sorted;
  }
}

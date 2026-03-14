import { EnrichedPost, FilterOption } from "../types";

export function applyFiltering(
  posts: EnrichedPost[],
  filter: FilterOption,
  username: string
): EnrichedPost[] {
  switch (filter) {
    case "my_posts":
      return posts.filter((p) => p.username === username);
    case "mentioned_me":
      return posts.filter((p) => p.mentions.includes(username));
    default:
      return posts;
  }
}

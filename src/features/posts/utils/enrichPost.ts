import { EnrichedPost, InteractionsStore, Post } from "../types";
import { extractMentions } from "./mentions";

const EMPTY_INTERACTIONS = {
  likedBy: [] as string[],
  comments: [] as never[],
};

export function enrichPost(
  post: Post,
  store: InteractionsStore,
  username: string
): EnrichedPost {
  const interactions = store[post.id] ?? EMPTY_INTERACTIONS;

  return {
    ...post,
    likesCount: interactions.likedBy.length,
    likedByMe: interactions.likedBy.includes(username),
    commentsCount: interactions.comments.length,
    comments: interactions.comments,
    mentions: extractMentions(post.content),
  };
}

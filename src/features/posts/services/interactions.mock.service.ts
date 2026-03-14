import AsyncStorage from "@react-native-async-storage/async-storage";

import { Comment, InteractionsStore, PostInteractions } from "../types";
import { generateId, mockLatency } from "../utils/mockLatency";

const STORAGE_KEY = "@network_app/interactions";

let store: InteractionsStore = {};
let initialized = false;

function emptyInteractions(): PostInteractions {
  return { likedBy: [], comments: [] };
}

async function init(): Promise<void> {
  if (initialized) return;
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) store = JSON.parse(raw);
  } catch {
    store = {};
  }
  initialized = true;
}

async function persist(): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

function ensureEntry(postId: number): PostInteractions {
  if (!store[postId]) {
    store[postId] = emptyInteractions();
  }
  return store[postId];
}

export const interactionsMockService = {
  async getStore(): Promise<InteractionsStore> {
    await init();
    return { ...store };
  },

  async toggleLike(
    postId: number,
    username: string
  ): Promise<{ liked: boolean; likesCount: number }> {
    await init();
    await mockLatency();
    const entry = ensureEntry(postId);
    const idx = entry.likedBy.indexOf(username);
    if (idx >= 0) {
      entry.likedBy.splice(idx, 1);
    } else {
      entry.likedBy.push(username);
    }
    await persist();
    return { liked: idx < 0, likesCount: entry.likedBy.length };
  },

  async addComment(
    postId: number,
    username: string,
    content: string
  ): Promise<Comment> {
    await init();
    await mockLatency();
    const entry = ensureEntry(postId);
    const comment: Comment = {
      id: generateId(),
      postId,
      username,
      content,
      createdDatetime: new Date().toISOString(),
    };
    entry.comments.unshift(comment);
    await persist();
    return comment;
  },

  async deleteComment(postId: number, commentId: string): Promise<void> {
    await init();
    await mockLatency();
    if (store[postId]) {
      store[postId].comments = store[postId].comments.filter(
        (c) => c.id !== commentId
      );
      await persist();
    }
  },
};

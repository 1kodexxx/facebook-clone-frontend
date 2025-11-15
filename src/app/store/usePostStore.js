// src/app/store/usePostStore.js
"use client";

import {
  commentsPost,
  createPost,
  createStory,
  deletePost,
  deleteStory,
  getAllPosts,
  getAllStory,
  getAllUserPosts,
  likePost,
  sharePost,
} from "@/service/post.service";
import toast from "react-hot-toast";
import { create } from "zustand";

export const usePostStore = create((set, get) => ({
  posts: [],
  userPosts: [],
  story: [],
  loading: false,
  error: null,

  // Получить все посты
  fetchPost: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await getAllPosts();
      set({ posts: posts || [], loading: false });
    } catch (error) {
      console.error("fetchPost error:", error);
      set({ error, loading: false });
    }
  },

  // Получить посты пользователя
  fetchUserPost: async (userId) => {
    set({ loading: true, error: null });
    try {
      const userPosts = await getAllUserPosts(userId);
      set({ userPosts: userPosts || [], loading: false });
    } catch (error) {
      console.error("fetchUserPost error:", error);
      set({ error, loading: false });
    }
  },

  // Получить все сторис
  fetchStoryPost: async () => {
    set({ loading: true, error: null });
    try {
      const story = await getAllStory();
      set({ story: story || [], loading: false });
    } catch (error) {
      console.error("fetchStoryPost error:", error);
      set({ error, loading: false });
    }
  },

  // Создать пост
  handleCreatePost: async (postData /* FormData */) => {
    set({ loading: true, error: null });
    try {
      const newPost = await createPost(postData);
      set((state) => ({
        posts: newPost ? [newPost, ...(state.posts || [])] : state.posts,
        loading: false,
      }));
      toast.success("Пост успешно создан");
    } catch (error) {
      console.error("handleCreatePost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось создать пост");
    }
  },

  // Создать сторис
  handleCreateStory: async (storyData /* FormData */) => {
    set({ loading: true, error: null });
    try {
      const newStory = await createStory(storyData);
      set((state) => ({
        story: newStory ? [newStory, ...(state.story || [])] : state.story,
        loading: false,
      }));
      toast.success("Сторис успешно создана");
    } catch (error) {
      console.error("handleCreateStory error:", error);
      set({ error, loading: false });
      toast.error("Не удалось создать сторис");
    }
  },

  // Лайк/анлайк поста
  handleLikePost: async (postId) => {
    try {
      await likePost(postId);
      const { posts } = get();
      const updated = (posts || []).map((p) =>
        p?._id === postId
          ? {
              ...p,
              hasLiked: !p.hasLiked,
              likeCount: (p.likeCount || 0) + (p.hasLiked ? -1 : 1),
            }
          : p
      );
      set({ posts: updated });
    } catch (error) {
      console.error("handleLikePost error:", error);
      set({ error });
    }
  },

  // Добавить комментарий
  handleCommentPost: async (postId, text) => {
    set({ loading: true, error: null });
    try {
      const updatedPost = await commentsPost(postId, { text });
      set((state) => ({
        posts: (state.posts || []).map((post) =>
          post?._id === postId ? updatedPost : post
        ),
        loading: false,
      }));
      toast.success("Комментарий добавлен");
    } catch (error) {
      console.error("handleCommentPost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось добавить комментарий");
    }
  },

  // Репост
  handleSharePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      const updatedPost = await sharePost(postId);
      set((state) => ({
        posts: (state.posts || []).map((post) =>
          post?._id === postId ? updatedPost : post
        ),
        loading: false,
      }));
      toast.success("Пост репостнут");
    } catch (error) {
      console.error("handleSharePost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось репостнуть пост");
    }
  },

  // Удалить пост
  handleDeletePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      await deletePost(postId);
      set((state) => ({
        posts: (state.posts || []).filter((p) => p?._id !== postId),
        loading: false,
      }));
      toast.success("Пост удалён");
    } catch (error) {
      console.error("handleDeletePost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось удалить пост");
    }
  },

  // Удалить сторис
  handleDeleteStory: async (storyId) => {
    set({ loading: true, error: null });
    try {
      await deleteStory(storyId);
      set((state) => ({
        story: (state.story || []).filter((s) => s?._id !== storyId),
        loading: false,
      }));
      toast.success("Сторис удалена");
    } catch (error) {
      console.error("handleDeleteStory error:", error);
      set({ error, loading: false });
      toast.error("Не удалось удалить сторис");
    }
  },
}));

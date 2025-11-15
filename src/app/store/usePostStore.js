// === src/app/store/usePostStore.js ===
"use client";

import {
  commentsPost,
  createPost,
  createStory,
  getAllPosts,
  getAllStory,
  getAllUserPosts,
  likePost,
  sharePost,
} from "@/service/post.service";
import toast from "react-hot-toast";
import { create } from "zustand";

/**
 * Стор постов, комментариев, лайков и сторис.
 *
 * Важно: все запросы к бэкенду вынесены в post.service.
 */
export const usePostStore = create((set, get) => ({
  posts: [], // лента
  userPosts: [], // посты конкретного пользователя (профиль)
  story: [], // сторисы
  loading: false,
  error: null,

  /**
   * Получить все посты (главная лента).
   */
  fetchPost: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await getAllPosts();
      set({ posts: posts || [], loading: false });
    } catch (error) {
      console.error("fetchPost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось загрузить ленту");
    }
  },

  /**
   * Получить все посты конкретного пользователя.
   */
  fetchUserPost: async (userId) => {
    set({ loading: true, error: null });
    try {
      const userPosts = await getAllUserPosts(userId);
      set({ userPosts: userPosts || [], loading: false });
    } catch (error) {
      console.error("fetchUserPost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось загрузить посты пользователя");
    }
  },

  /**
   * Получить все сторисы.
   */
  fetchStoryPost: async () => {
    set({ loading: true, error: null });
    try {
      const story = await getAllStory();
      set({ story: story || [], loading: false });
    } catch (error) {
      console.error("fetchStoryPost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось загрузить сторис");
    }
  },

  /**
   * Создать новый пост.
   * postData — FormData (content + media).
   */
  handleCreatePost: async (postData) => {
    set({ loading: true, error: null });
    try {
      const newPost = await createPost(postData);

      set((state) => ({
        posts: newPost ? [newPost, ...(state.posts || [])] : state.posts,
        loading: false,
      }));

      toast.success("Пост успешно опубликован");
    } catch (error) {
      console.error("handleCreatePost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось создать пост");
    }
  },

  /**
   * Создать сторис.
   * storyData — FormData (media).
   */
  handleCreateStory: async (storyData) => {
    set({ loading: true, error: null });
    try {
      const newStory = await createStory(storyData);

      set((state) => ({
        story: newStory ? [newStory, ...(state.story || [])] : state.story,
        loading: false,
      }));

      toast.success("Сторис успешно опубликована");
    } catch (error) {
      console.error("handleCreateStory error:", error);
      set({ error, loading: false });
      toast.error("Не удалось создать сторис");
    }
  },

  /**
   * Лайк / анлайк поста.
   * Мы делаем оптимистичное обновление стейта.
   */
  handleLikePost: async (postId) => {
    try {
      await likePost(postId);

      const { posts } = get();
      const updated = (posts || []).map((post) => {
        if (post?._id !== postId) return post;

        const hasLiked = !!post.hasLiked;
        const likeCount = (post.likeCount || 0) + (hasLiked ? -1 : 1);

        return {
          ...post,
          hasLiked: !hasLiked,
          likeCount: likeCount < 0 ? 0 : likeCount,
        };
      });

      set({ posts: updated });
    } catch (error) {
      console.error("handleLikePost error:", error);
      set({ error });
      toast.error("Не удалось поставить лайк");
    }
  },

  /**
   * Добавить комментарий к посту.
   * text — строка комментария.
   */
  handleCommentPost: async (postId, text) => {
    set({ loading: true, error: null });
    try {
      // Бэкенд возвращает ОБНОВЛЁННЫЙ пост
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

  /**
   * Репост поста.
   */
  handleSharePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      await sharePost(postId);
      set({ loading: false });
      toast.success("Пост успешно репостнут");
    } catch (error) {
      console.error("handleSharePost error:", error);
      set({ error, loading: false });
      toast.error("Не удалось сделать репост");
    }
  },
}));

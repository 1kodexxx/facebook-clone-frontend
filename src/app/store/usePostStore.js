"use client";

import {
  createPost,
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
  storyPosts: [],
  loading: false,
  error: null,

  // ===== Fetch =====
  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const posts = await getAllPosts();
      set({ posts: posts ?? [], loading: false });
    } catch (error) {
      set({ error, loading: false });
      toast.error("Failed to load posts");
    }
  },

  fetchUserPosts: async (userId) => {
    set({ loading: true, error: null });
    try {
      const userPosts = await getAllUserPosts(userId);
      set({ userPosts: userPosts ?? [], loading: false });
    } catch (error) {
      set({ error, loading: false });
      toast.error("Failed to load user posts");
    }
  },

  fetchStories: async () => {
    set({ loading: true, error: null });
    try {
      const storyPosts = await getAllStory();
      set({ storyPosts: storyPosts ?? [], loading: false });
    } catch (error) {
      set({ error, loading: false });
      toast.error("Failed to load stories");
    }
  },

  // ===== Create =====
  handleCreatePost: async (postData) => {
    set({ loading: true, error: null });
    try {
      const newPost = await createPost(postData);
      set((state) => ({
        posts: [newPost, ...(state.posts ?? [])],
        loading: false,
      }));
      toast.success("Post created successfully");
    } catch (error) {
      set({ error, loading: false });
      toast.error("Failed to create a post");
    }
  },

  handleCreateStory: async (storyData) => {
    set({ loading: true, error: null });
    try {
      // если есть отдельный сервис createStory — используй его.
      const newStory = await createPost(storyData);
      set((state) => ({
        storyPosts: [newStory, ...(state.storyPosts ?? [])],
        loading: false,
      }));
      toast.success("Story created successfully");
    } catch (error) {
      set({ error, loading: false });
      toast.error("Failed to create a story");
    }
  },

  // ===== Like (оптимистично) =====
  handleLikePost: async (postId) => {
    const prev = get().posts;
    // Оптимистичный апдейт
    set({
      posts: prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              isLiked: !p.isLiked,
              likesCount: (p.likesCount ?? 0) + (p.isLiked ? -1 : 1),
            }
          : p
      ),
    });

    try {
      await likePost(postId);
    } catch (error) {
      // откат при ошибке
      set({ posts: prev, error });
      toast.error("Failed to like the post");
    }
  },

  // Create a new comment
  handleCommentPost: async (postId, text) => {
    set({ loading: true });

    try {
      const newComments = await createPost(PostCard, { text });
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId
            ? { ...post, commentsPost: [...post.comments, newComments] }
            : post
        ),
      }));
      toast.success("Comments added successfully");
    } catch (error) {
      set({ error, loading: false });
      toast.error("Failed to create a story");
    }
  },

  // Create a new story
  handleSharePost: async (postId) => {
    set({ loading: true });
    try {
      await sharePost(postId);
      toast.success("post share successfully");
    } catch (error) {
      set({ error, loading: false });
      toast.error("failed to share this post");
    }
  },
}));

// === src/app/store/usePostStore.js ===
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
      toast.success("Post created successfully");
    } catch (error) {
      console.error("handleCreatePost error:", error);
      set({ error, loading: false });
      toast.error("Failed to create a post");
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
      toast.success("Story created successfully");
    } catch (error) {
      console.error("handleCreateStory error:", error);
      set({ error, loading: false });
      toast.error("Failed to create a story");
    }
  },

  // Лайк/анлайк поста
  handleLikePost: async (postId) => {
    try {
      await likePost(postId);
      // по желанию можно оптимистично обновить стейт:
      const { posts } = get();
      const updated = posts.map((p) =>
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
      const newComments = await commentsPost(postId, { text });
      set((state) => ({
        posts: state.posts.map((post) =>
          post?._id === postId
            ? { ...post, comments: [...(post.comments || []), newComments] }
            : post
        ),
        loading: false,
      }));
      toast.success("Comments added successfully");
    } catch (error) {
      console.error("handleCommentPost error:", error);
      set({ error, loading: false });
      toast.error("Failed to add comments");
    }
  },

  // Репост
  handleSharePost: async (postId) => {
    set({ loading: true, error: null });
    try {
      await sharePost(postId);
      set({ loading: false });
      toast.success("Post shared successfully");
    } catch (error) {
      console.error("handleSharePost error:", error);
      set({ error, loading: false });
      toast.error("Failed to share this post");
    }
  },
}));

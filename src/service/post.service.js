// src/service/post.service.js
import axiosInstance from "./url.service";

/**
 * Создать пост (текст и/или медиа)
 * FormData:
 *  - content: string
 *  - media: File (опционально)
 */
export const createPost = async (postData) => {
  try {
    const result = await axiosInstance.post("/posts", postData);
    return result?.data?.data;
  } catch (error) {
    console.error("createPost error:", error);
    throw error;
  }
};

/**
 * Создать сторис
 * FormData:
 *  - media: File
 */
export const createStory = async (storyData) => {
  try {
    // если на бэке router подмонтирован на /posts и там /story:
    const result = await axiosInstance.post("/posts/story", storyData);
    // или, если у тебя отдельный роут без префикса, тогда "/story"
    return result?.data?.data;
  } catch (error) {
    console.error("createStory error:", error);
    throw error;
  }
};

/**
 * Получить все посты
 */
export const getAllPosts = async () => {
  try {
    const result = await axiosInstance.get("/posts");
    return result?.data?.data;
  } catch (error) {
    console.error("getAllPosts error:", error);
    throw error;
  }
};

/**
 * Получить все сторис
 */
export const getAllStory = async () => {
  try {
    const result = await axiosInstance.get("/posts/story"); // или "/story"
    return result?.data?.data;
  } catch (error) {
    console.error("getAllStory error:", error);
    throw error;
  }
};

/**
 * Лайк/анлайк поста
 */
export const likePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/posts/likes/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("likePost error:", error);
    throw error;
  }
};

/**
 * Комментарий к посту
 */
export const commentsPost = async (postId, comments) => {
  try {
    const result = await axiosInstance.post(
      `/posts/comments/${postId}`,
      comments
    );
    return result?.data?.data;
  } catch (error) {
    console.error("commentsPost error:", error);
    throw error;
  }
};

/**
 * Репост поста
 */
export const sharePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/posts/share/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("sharePost error:", error);
    throw error;
  }
};

/**
 * Посты конкретного пользователя
 */
export const getAllUserPosts = async (userId) => {
  try {
    const result = await axiosInstance.get(`/posts/user/${userId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("getAllUserPosts error:", error);
    throw error;
  }
};

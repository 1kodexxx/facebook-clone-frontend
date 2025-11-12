// === src/service/post.service.js ===
import axiosInstance from "./url.service";

/**
 * Создать пост (текст и/или медиа)
 * ОЖИДАЕТ FormData с полями:
 *  - content (string)
 *  - media (File)  // опционально
 */
export const createPost = async (postData /* FormData */) => {
  try {
    const result = await axiosInstance.post("/users/posts", postData);
    // responseHandler возвращает { status, code, message, data }
    return result?.data?.data;
  } catch (error) {
    console.error("createPost error:", error);
    throw error;
  }
};

/**
 * Создать сторис (только медиа)
 * ОЖИДАЕТ FormData с полем:
 *  - media (File)
 */
export const createStory = async (storyData /* FormData */) => {
  try {
    const result = await axiosInstance.post("/users/story", storyData);
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
    const result = await axiosInstance.get("/users/posts");
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
    const result = await axiosInstance.get("/users/story");
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
    const result = await axiosInstance.post(`/users/posts/likes/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("likePost error:", error);
    throw error;
  }
};

/**
 * Комментарий к посту
 * @param {string} postId
 * @param {{ text: string }} comments
 */
export const commentsPost = async (postId, comments) => {
  try {
    const result = await axiosInstance.post(
      `/users/posts/comments/${postId}`,
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
    const result = await axiosInstance.post(`/users/posts/share/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("sharePost error:", error);
    throw error;
  }
};

/**
 * Получить посты конкретного пользователя
 */
export const getAllUserPosts = async (userId) => {
  try {
    const result = await axiosInstance.get(`/users/posts/user/${userId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("getAllUserPosts error:", error);
    throw error;
  }
};

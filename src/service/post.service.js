// === src/service/post.service.js ===
// Сервисы для работы с постами, комментариями, репостами и сторис
import axiosInstance from "./url.service";

/**
 * 📝 Создать пост (текст и/или медиа)
 *
 * Ожидается FormData:
 * - content: string
 * - media: File (опционально)
 * @param {FormData} postData
 * @returns {Promise<Object>} - созданный пост
 */

export const createPost = async (postData) => {
  try {
    const result = await axiosInstance.post("/posts", postData);
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при создании поста (createPost):", error);
    throw error;
  }
};

/**
 * 📚 Получить все посты (общая лента)
 *
 * @returns {Promise<Object[]>}
 */
export const getAllPosts = async () => {
  try {
    const result = await axiosInstance.get("/posts");
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при получении постов (getAllPosts):", error);
    throw error;
  }
};

/**
 * 📚 Получить все посты конкретного пользователя
 *
 * @param {string} userId
 * @returns {Promise<Object[]>}
 */

export const getAllUserPosts = async (userId) => {
  try {
    const result = await axiosInstance.get(`/posts/user/${userId}`);
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении постов пользователя (getAllUserPosts):",
      error
    );
  }
};

/**
 * ⭐ Лайк / анлайк поста
 *
 * @param {string} postId
 * @returns {Promise<Object>} - обновлённый пост
 */

export const likePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/posts/likes/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при лайке поста (likePost):", error);
    throw error;
  }
};

/**
 * 💬 Добавить комментарий к посту
 *
 * @param {string} postId
 * @param {Object} commentData - тело запроса, например { text: "Комментарий" }
 * @returns {Promise<Object>} - пост с добавленным комментарием
 */

export const commentsPost = async (postId, commentData) => {
  try {
    const result = await axiosInstance.post(
      `/posts/comments/${postId}`,
      commentData
    );
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при добавлении комментария (commentsPost):",
      error
    );
    throw error;
  }
};

/**
 * 🔁 Репост поста
 *
 * @param {string} postId
 * @returns {Promise<Object>} - пост с обновлёнными данными о репостах
 */
export const sharePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/posts/share/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при репосте поста (sharePost):", error);
    throw error;
  }
};

/**
 * 📸 Создать сторис
 *
 * FormData:
 * - media: File
 *
 * @param {FormData} storyData
 * @returns {Promise<Object>} - созданная сторис
 */
export const createStory = async (storyData) => {
  try {
    // На бэкенде сторис живут под /posts/story
    const result = await axiosInstance.post("/posts/story", storyData);
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при создании сторис (createStory):", error);
    throw error;
  }
};

/**
 * 📸 Получить все сторис
 *
 * @returns {Promise<Object[]>}
 */
export const getAllStory = async () => {
  try {
    const result = await axiosInstance.get("/posts/story");
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при получении сторис (getAllStory):", error);
    throw error;
  }
};

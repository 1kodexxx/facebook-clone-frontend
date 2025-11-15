// === src/service/user.service.js ===
// Сервисы для работы с пользователями, подписками, заявками, профилем и BIO

import axiosInstance from "./url.service";

/**
 * 🤝 Подписаться на пользователя
 *
 * @param {string} userIdToFollow
 */
export const followUser = async (userIdToFollow) => {
  try {
    const result = await axiosInstance.post("/users/follow", {
      userIdToFollow,
    });
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при подписке (followUser):", error);
    throw error;
  }
};

/**
 * 🙅‍♂️ Отписаться от пользователя
 *
 * @param {string} userIdToUnfollow
 */
export const unfollowUser = async (userIdToUnfollow) => {
  try {
    const result = await axiosInstance.post("/users/unfollow", {
      userIdToUnfollow,
    });
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при отписке (unfollowUser):", error);
    throw error;
  }
};

/**
 * 🗑 Удалить входящую "заявку в друзья"
 *
 * @param {string} requestSenderId
 */
export const deleteUserFromRequest = async (requestSenderId) => {
  try {
    const result = await axiosInstance.post("/users/friend-request/remove", {
      requestSenderId,
    });
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при удалении заявки в друзья (deleteUserFromRequest):",
      error
    );
    throw error;
  }
};

/**
 * 📥 Получить входящие заявки (кто подписан на меня, а я нет)
 */
export const getAllFriendsRequest = async () => {
  try {
    const result = await axiosInstance.get("/users/friend-request");
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении входящих заявок (getAllFriendsRequest):",
      error
    );
    throw error;
  }
};

/**
 * 🧩 Пользователи без связи (ни я на них, ни они на меня)
 */
export const getAllUserForRequest = async () => {
  try {
    const result = await axiosInstance.get("/users/user-to-request");
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении пользователей без связи (getAllUserForRequest):",
      error
    );
    throw error;
  }
};

/**
 * 👥 Общие друзья между мной и другим пользователем
 *
 * @param {string} userIdToFollow
 */
export const getAllMutualFriends = async (userIdToFollow) => {
  try {
    const result = await axiosInstance.get(
      `/users/mutual-friends?userIdToFollow=${userIdToFollow}`
    );
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении общих друзей (getAllMutualFriends):",
      error
    );
    throw error;
  }
};

/**
 * 📋 Получить всех пользователей (кроме текущего)
 */
export const getAllUsers = async () => {
  try {
    const result = await axiosInstance.get("/users");
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении пользователей (getAllUsers):",
      error
    );
    throw error;
  }
};

/**
 * 👤 Получить профиль пользователя по ID
 *
 * @param {string} userId
 */
export const getUserProfile = async (userId) => {
  try {
    const result = await axiosInstance.get(`/users/profile/${userId}`);
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при получении профиля (getUserProfile):", error);
    throw error;
  }
};

/**
 * 📝 Обновить или создать BIO пользователя
 *
 * @param {string} userId
 * @param {Object} bioData
 */
export const updateUserBio = async (userId, bioData) => {
  try {
    const result = await axiosInstance.put(`/users/bio/${userId}`, bioData);
    return result?.data?.data;
  } catch (error) {
    console.error("🔴 Ошибка при обновлении BIO (updateUserBio):", error);
    throw error;
  }
};

/**
 * 🧑 Обновить профиль пользователя (имя, пол, дата рождения, аватар)
 *
 * Ожидается FormData:
 *  - username?: string
 *  - gender?: string
 *  - dateOfBirth?: string
 *  - profilePicture?: File
 *
 * @param {string} userId
 * @param {FormData} formData
 */
export const updateUserProfile = async (userId, formData) => {
  try {
    const result = await axiosInstance.put(
      `/users/profile/${userId}`,
      formData
    );
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при обновлении профиля (updateUserProfile):",
      error
    );
    throw error;
  }
};

/**
 * 🖼 Обновить обложку профиля
 *
 * FormData:
 *  - coverPhoto: File
 *
 * @param {string} userId
 * @param {FormData} formData
 */
export const updateCoverPhoto = async (userId, formData) => {
  try {
    const result = await axiosInstance.put(
      `/users/profile/cover-photo/${userId}`,
      formData
    );
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при обновлении обложки (updateCoverPhoto):",
      error
    );
    throw error;
  }
};

// === src/service/notification.service.js ===
// Сервисы для работы с уведомлениями

import axiosInstance from "./url.service";

/**
 * 🔔 Получить список уведомлений текущего пользователя
 */
export const getNotifications = async () => {
  try {
    const result = await axiosInstance.get("/notifications");
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении уведомлений (getNotifications):",
      error
    );
    throw error;
  }
};

/**
 * ✅ Отметить одно уведомление как прочитанное
 *
 * @param {string} notificationId
 */
export const markNotificationRead = async (notificationId) => {
  try {
    const result = await axiosInstance.patch(
      `/notifications/${notificationId}/read`
    );
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при отметке уведомления прочитанным (markNotificationRead):",
      error
    );
    throw error;
  }
};

/**
 * ✅ Отметить все уведомления как прочитанные
 */
export const markAllNotificationsRead = async () => {
  try {
    const result = await axiosInstance.patch("/notifications/read-all");
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при отметке всех уведомлений прочитанными (markAllNotificationsRead):",
      error
    );
    throw error;
  }
};

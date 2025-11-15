// === src/service/chat.service.js ===
// Сервисы для работы с личными сообщениями (DM)

import axiosInstance from "./url.service";

/**
 * 👥 Создать или получить диалог с другим пользователем
 *
 * @param {string} partnerId - ID пользователя, с которым хотим открыть диалог
 */
export const createOrGetConversation = async (partnerId) => {
  try {
    const result = await axiosInstance.post("/chat/conversations", {
      partnerId,
    });
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при создании/получении диалога (createOrGetConversation):",
      error
    );
    throw error;
  }
};

/**
 * 💬 Получить все диалоги текущего пользователя
 */
export const getUserConversations = async () => {
  try {
    const result = await axiosInstance.get("/chat/conversations");
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении диалогов (getUserConversations):",
      error
    );
    throw error;
  }
};

/**
 * 📨 Получить сообщения конкретного диалога
 *
 * @param {string} conversationId
 * @param {Object} [options]
 * @param {number} [options.limit=20] - сколько сообщений за раз
 * @param {string} [options.before]   - ISO-строка даты для пагинации "вверх"
 */
export const getConversationMessages = async (
  conversationId,
  { limit = 20, before } = {}
) => {
  try {
    const params = new URLSearchParams();
    if (limit) params.set("limit", String(limit));
    if (before) params.set("before", before);

    const url = `/chat/conversations/${conversationId}/messages?${
      params.toString() || ""
    }`;

    const result = await axiosInstance.get(url);
    return result?.data?.data;
  } catch (error) {
    console.error(
      "🔴 Ошибка при получении сообщений диалога (getConversationMessages):",
      error
    );
    throw error;
  }
};

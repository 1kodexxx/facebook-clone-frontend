// === src/app/store/chatStore.js ===
"use client";

import {
  createOrGetConversation,
  getConversationMessages,
  getUserConversations,
} from "@/service/chat.service";
import { create } from "zustand";

/**
 * Стор личных сообщений (DM) и диалогов.
 *
 * Плюс задел под интеграцию с Socket.IO.
 */
const useChatStore = create((set, get) => ({
  conversations: [], // список диалогов
  messagesById: {}, // словарь: { [conversationId]: Message[] }
  activeConversationId: null, // текущий открытый диалог
  loading: false,
  error: null,

  /**
   * Загрузить все диалоги пользователя.
   */
  fetchConversations: async () => {
    set({ loading: true, error: null });
    try {
      const conversations = (await getUserConversations()) || [];
      set({ conversations, loading: false });
    } catch (error) {
      console.error("fetchConversations error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Открыть диалог с пользователем:
   *  - создаём/получаем диалог
   *  - сохраняем его в список
   *  - ставим активным
   */
  openConversationWithUser: async (partnerId) => {
    set({ loading: true, error: null });
    try {
      const conversation = await createOrGetConversation(partnerId);

      if (!conversation?._id) {
        set({ loading: false });
        return;
      }

      const { conversations } = get();
      const exists = (conversations || []).some(
        (c) => c._id === conversation._id
      );

      set({
        conversations: exists
          ? conversations
          : [conversation, ...(conversations || [])],
        activeConversationId: conversation._id,
        loading: false,
      });

      // при желании можно сразу подгрузить сообщения
      await get().fetchMessages(conversation._id);
    } catch (error) {
      console.error("openConversationWithUser error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Загрузить сообщения конкретного диалога.
   */
  fetchMessages: async (conversationId, options) => {
    if (!conversationId) return;
    set({ loading: true, error: null });
    try {
      const messages =
        (await getConversationMessages(conversationId, options)) || [];

      set((state) => ({
        messagesById: {
          ...state.messagesById,
          [conversationId]: messages,
        },
        loading: false,
      }));
    } catch (error) {
      console.error("fetchMessages error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Локально добавить сообщение (например, после отправки через сокет).
   */
  pushMessageToConversation: (conversationId, message) => {
    if (!conversationId || !message) return;

    set((state) => {
      const existing = state.messagesById[conversationId] || [];
      return {
        messagesById: {
          ...state.messagesById,
          [conversationId]: [...existing, message],
        },
      };
    });
  },

  /**
   * Установить активный диалог (при клике в списке).
   */
  setActiveConversationId: (conversationId) =>
    set({ activeConversationId: conversationId }),
}));

export default useChatStore;

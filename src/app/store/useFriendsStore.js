// === src/app/store/friendsStore.js ===
"use client";

import {
  deleteUserFromRequest,
  followUser,
  getAllFriendsRequest,
  getAllMutualFriends,
  getAllUser,
  getAllUserForRequest,
  unfollowUser,
} from "@/service/user.service";
import toast from "react-hot-toast";
import { create } from "zustand";

/**
 * Стор "друзей" / подписок:
 *  - кто на меня подписан
 *  - на кого подписан я
 *  - рекомендации
 *  - общие друзья
 */
const useFriendsStore = create((set, get) => ({
  allUsers: [], // все пользователи (кроме меня)
  incomingRequests: [], // входящие заявки (подписки на меня)
  suggestions: [], // пользователи без связи (рекомендации)
  mutualByUserId: {}, // { [userId]: User[] } — общие друзья

  loading: false,
  error: null,

  /**
   * Загрузить всех пользователей (кроме меня).
   */
  fetchAllUsers: async () => {
    set({ loading: true, error: null });
    try {
      const allUsers = (await getAllUser()) || [];
      set({ allUsers, loading: false });
    } catch (error) {
      console.error("fetchAllUsers error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Загрузить входящие заявки (кто подписан на меня, а я — нет).
   */
  fetchIncomingRequests: async () => {
    set({ loading: true, error: null });
    try {
      const incomingRequests = (await getAllFriendsRequest()) || [];
      set({ incomingRequests, loading: false });
    } catch (error) {
      console.error("fetchIncomingRequests error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Загрузить пользователей без связи (рекомендации).
   */
  fetchSuggestions: async () => {
    set({ loading: true, error: null });
    try {
      const suggestions = (await getAllUserForRequest()) || [];
      set({ suggestions, loading: false });
    } catch (error) {
      console.error("fetchSuggestions error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Загрузить общих друзей с конкретным пользователем.
   */
  fetchMutualFriends: async (userIdToFollow) => {
    if (!userIdToFollow) return;
    set({ loading: true, error: null });
    try {
      const mutual = (await getAllMutualFriends(userIdToFollow)) || [];
      set((state) => ({
        mutualByUserId: {
          ...state.mutualByUserId,
          [userIdToFollow]: mutual,
        },
        loading: false,
      }));
    } catch (error) {
      console.error("fetchMutualFriends error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Подписаться на пользователя.
   */
  follow: async (userIdToFollow) => {
    try {
      await followUser(userIdToFollow);
      toast.success("Подписка оформлена");

      // можно дополнительно обновить список рекомендаций/заявок
      await Promise.all([
        get().fetchSuggestions(),
        get().fetchIncomingRequests(),
      ]);
    } catch (error) {
      console.error("follow error:", error);
      set({ error });
      toast.error("Не удалось подписаться");
    }
  },

  /**
   * Отписаться от пользователя.
   */
  unfollow: async (userIdToUnfollow) => {
    try {
      await unfollowUser(userIdToUnfollow);
      toast.success("Подписка отменена");

      await Promise.all([
        get().fetchSuggestions(),
        get().fetchIncomingRequests(),
      ]);
    } catch (error) {
      console.error("unfollow error:", error);
      set({ error });
      toast.error("Не удалось отписаться");
    }
  },

  /**
   * Удалить входящую заявку (отменить чужую одностороннюю подписку).
   */
  removeIncomingRequest: async (requestSenderId) => {
    try {
      await deleteUserFromRequest(requestSenderId);
      toast.success("Заявка удалена");

      const { incomingRequests } = get();
      set({
        incomingRequests: (incomingRequests || []).filter(
          (u) => u._id !== requestSenderId
        ),
      });
    } catch (error) {
      console.error("removeIncomingRequest error:", error);
      set({ error });
      toast.error("Не удалось удалить заявку");
    }
  },
}));

export default useFriendsStore;

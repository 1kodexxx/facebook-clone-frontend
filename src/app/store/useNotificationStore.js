// === src/app/store/notificationStore.js ===
"use client";

import {
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from "@/service/notification.service";
import { create } from "zustand";

/**
 * Стор уведомлений.
 *
 * Данные:
 *  - notifications: массив уведомлений
 *  - unreadCount: количество непрочитанных
 */
const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  /**
   * Загрузить список уведомлений текущего пользователя.
   */
  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const data = await getNotifications();
      const notifications = data || [];

      const unreadCount = notifications.filter((n) => !n.isRead).length;

      set({ notifications, unreadCount, loading: false });
    } catch (error) {
      console.error("fetchNotifications error:", error);
      set({ error, loading: false });
    }
  },

  /**
   * Отметить одно уведомление прочитанным.
   */
  readNotification: async (notificationId) => {
    try {
      await markNotificationRead(notificationId);

      const { notifications } = get();
      const updated = (notifications || []).map((n) =>
        n._id === notificationId ? { ...n, isRead: true } : n
      );
      const unreadCount = updated.filter((n) => !n.isRead).length;

      set({ notifications: updated, unreadCount });
    } catch (error) {
      console.error("readNotification error:", error);
      set({ error });
    }
  },

  /**
   * Отметить все уведомления прочитанными.
   */
  readAllNotifications: async () => {
    try {
      await markAllNotificationsRead();

      const { notifications } = get();
      const updated = (notifications || []).map((n) => ({
        ...n,
        isRead: true,
      }));

      set({ notifications: updated, unreadCount: 0 });
    } catch (error) {
      console.error("readAllNotifications error:", error);
      set({ error });
    }
  },

  /**
   * Добавить новое уведомление, полученное по Socket.IO.
   * Вызывается из обработчика сокета.
   */
  pushNotificationFromSocket: (notification) => {
    if (!notification) return;
    const { notifications, unreadCount } = get();
    set({
      notifications: [notification, ...(notifications || [])],
      unreadCount: unreadCount + (notification.isRead ? 0 : 1),
    });
  },
}));

export default useNotificationStore;

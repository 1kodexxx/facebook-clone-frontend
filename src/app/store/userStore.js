"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage), // корректно для Next.js
      // partialize: (state) => ({ user: state.user }), // если нужно хранить не всё
    }
  )
);

export default useUserStore;

// src/store/sidebarStore.js
"use client";

import { create } from "zustand";

const useSidebarStore = create((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
}));

export default useSidebarStore;

import { create } from "zustand";

export const useOpenSidebar = create((set) => ({
  isOpen: true,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))
import { create } from "zustand";

export const useOpenModal = create((set) => ({
  id: null,
  onOpen: (id) => set({ id }),
  onClose: () => set({ id: null })
}))
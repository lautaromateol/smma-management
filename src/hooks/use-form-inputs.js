import { create } from "zustand";

export const useFormInputs = create((set) => ({
  inputs: {
    attached_media: [],
    images: [],
    message: "", 
    link: ""
  },
  setInputs: (field, value) => set((state) => ({
    inputs: { ...state.inputs, [field]: value }
  })),
  images: []
}))
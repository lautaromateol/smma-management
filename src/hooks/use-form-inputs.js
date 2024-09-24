import { create } from "zustand";

const defaultInputs = {
  platform: "FACEBOOK",
  attached_media: [],
  images: [],
  message: null,
  link: null,
  published: true,
}

export const useFormInputs = create((set) => ({
  inputs: defaultInputs,
  setInputs: (field, value) => set((state) => ({
    inputs: { ...state.inputs, [field]: value }
  })),
  resetInputs: () => set(() => ({
    inputs: defaultInputs
  }))
}))
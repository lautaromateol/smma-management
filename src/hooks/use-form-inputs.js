import { create } from "zustand";

const defaultInputs = {
  platform: "FACEBOOK",
  attached_media: [],
  images: [],
  message: "",
  link: null,
  scheduled_publish_time: null,
  published: true
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
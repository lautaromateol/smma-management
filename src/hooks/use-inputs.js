import { create } from "zustand";

const createPostInputs = {
  platform: "FACEBOOK",
  attached_media: [],
  previews: [],
  urls: [],
  selectedCountries: [],
  targeting: null,
  message: null,
  link: null,
  published: true,
  scheduled_publish_time: null
}

const createStoryInputs = {
  platform: "FACEBOOK",
  attached_media: [],
  previews: [],
  urls: [],
}

export const useFormInputs = create((set) => ({
  inputs: createPostInputs,
  setInputs: (field, value) => set((state) => ({
    inputs: { ...state.inputs, [field]: value }
  })),
  resetInputs: () => set(() => ({
    inputs: createPostInputs
  }))
}))

export const useMetaStoryInputs = create((set) => ({
  inputs: createStoryInputs,
  setInputs: (field, value) => set((state) => ({
    inputs: { ...state.inputs, [field]: value }
  })),
  resetInputs: () => set(() => ({
    inputs: createStoryInputs
  }))
}))
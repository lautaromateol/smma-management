import { z } from "zod";

const mediaFbidSchema = z.object({
  media_fbid: z.string()
})

export const InstagramStory = z.object({
  id: z.string({
    message: "Instagram page ID is required"
  }),
  access_token: z.string({
    message: "Page Access Token is required"
  }),
  attached_media: z.array(mediaFbidSchema, {
    message: "You have to upload a photo or a video to continue"
  })
})
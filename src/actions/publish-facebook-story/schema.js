import { z } from "zod";

const urlSchema = z.object({
  source: z.string(),
  type: z.string(),
  id: z.string()
})

export const FacebookStory = z.object({
  id: z.string({
    message: "Instagram page ID is required"
  }),
  access_token: z.string({
    message: "Page Access Token is required"
  }),
  urls: z.array(urlSchema, {
    message: "You have to upload a photo or a video to continue"
  })
})
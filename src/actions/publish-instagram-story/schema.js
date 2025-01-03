import { z } from "zod";

const urlSchema = z.object({
  source: z.string(),
  type: z.string()
})

export const InstagramStory = z.object({
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
.refine((data) => {
  return data.urls.length > 0
}, {
  message: "You have to upload a photo or a video to continue",
  path: ["urls"]
})
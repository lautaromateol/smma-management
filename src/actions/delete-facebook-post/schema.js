import { z } from "zod";

export const FacebookPostToDelete = z.object({
  post_id: z.string({
    message: "Facebook post ID is required"
  }),
  access_token: z.string({
    message: "Please provide a page access token"
  })
})
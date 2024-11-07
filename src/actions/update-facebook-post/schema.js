import { z } from "zod";

export const FacebookPostToUpdate = z.object({
  id: z.string({
    message: "Facebook page ID is required"
  }),
  campaign_id: z.string({
    message: "Campaign ID is required"
  }),
  post_id: z.string({
    message: "Facebook post ID is required"
  }),
  message: z.string({
    message: "Caption text cannot be empty"
  }).min(1, {
    message: "Caption text cannot be empty"
  }).optional(),
  location: z.string().optional().nullable(),
  scheduled_publish_time: z.date().optional().nullable(),
  unpublished_content_type: z.string().optional(),
  access_token: z.string({
    message: "Please provide a page access token"
  })
})
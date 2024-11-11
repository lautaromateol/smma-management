import { z } from "zod";

export const AdSetToDelete = z.object({
  id: z.string({
    message: "Ad Set ID is required"
  }),
  campaign_id: z.string({
    message: "Campaign ID is required"
  }),
  access_token: z.string({
    message: "Please provide a page access token"
  })
})
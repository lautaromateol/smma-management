import { z } from "zod";

export const DeleteCampaign = z.object({
  id: z.string({
    message: "Campaign ID is required"
  }),
  client_id: z.string({
    message: "Client ID is required"
  })
})
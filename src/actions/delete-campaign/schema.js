import { z } from "zod";

export const DeleteCampaign = z.object({
  id: z.string({
    message: "Campaign ID is required"
  })
})
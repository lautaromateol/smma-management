import { z } from "zod";

export const EditCampaign = z.object({
  id: z.string({
    message: "Campaign ID is required"
  }),
  name: z.string({
    message: "Campaign name is required"
  }),
  budget: z.string({
    message: "Budget is required"
  }),
  objective: z.string({
    message: "Campaign objective is required"
  }).min(10, {
    message: "Campaign objective must be at least of 10 characters"
  }),
})
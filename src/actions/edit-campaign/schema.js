import { z } from "zod";

export const EditCampaign = z.object({
  id: z.string({
    message: "Campaign ID is required"
  }),
  budget: z.string({
    message: "Budget is required"
  }),
  platforms: z.array(z.string()).min(1),
  objective: z.string({
    message: "Campaign objective is required"
  }).min(10, {
    message: "Campaign objective must be at least of 10 characters"
  }),
  startDate: z.date({
    message: "Start date is required"
  }),
  endDate: z.date({
    message: "Start date is required"
  })
})
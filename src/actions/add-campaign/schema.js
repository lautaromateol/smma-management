import { z } from "zod";

export const AddCampaign = z.object({
  client: z.string({
    message: "Client name is required"
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
  start: z.date({
    message: "Start date is required"
  }),
  end: z.date({
    message: "Start date is required"
  })
})
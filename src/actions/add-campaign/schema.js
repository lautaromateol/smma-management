import { z } from "zod";

export const AddCampaign = z.object({
  name: z.string({
    message: "Campaign name is required"
  }),
  client: z.string({
    message: "Client name is required"
  }),
  budget: z.string({
    message: "Budget is required"
  }),
  platform: z.string({
    message: "Campaign platform is required"
  }).refine((value) => ["META", "TWITTER", "LINKEDIN"].includes(value), {
    message: "Selected platform is incorrect",
  }),
  objective: z.string({
    message: "Campaign objective is required"
  }).min(10, {
    message: "Campaign objective must be at least of 10 characters"
  })
})
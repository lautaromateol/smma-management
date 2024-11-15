import { z } from "zod";

export const EditCampaign = z.object({
  id: z.string({
    message: "Campaign ID is required"
  }),
  client_id: z.string({
    message: "Client ID is required"
  }),
  name: z.string().optional(),
  daily_budget: z.string().optional().nullable(),
  lifetime_budget: z.string().optional().nullable(),
  bid_strategy: z.string().optional(),
  objective: z.string().optional(),
})
import { z } from "zod";

const geoLocationsSchema = z.object({
  countries: z.array(z.string()),
})

const targetingSchema = z.object({
  geo_locations: geoLocationsSchema,
  age_min: z.string().optional(),
  locales: z.array(z.number()).optional()
})

export const AdSetToUpdate = z.object({
  id: z.string({
    message: "Ad Set ID is required"
  }),
  name: z.string({
    message: "Ad Set Name is required"
  }).optional(),
  optimization_goal: z.string({
    message: "Ad Set Optimization Goal is required"
  }).optional(),
  client: z.string({
    message: "Client ID is required"
  }),
  access_token: z.string({
    message: "Page Access Token is required"
  }),
  billing_event: z.string({
    message: "Ad Set Billing Event is required"
  }).optional(),
  bid_amount: z.string({
    message: "Ad Set Bid Amount is required"
  }).optional(),
  campaign_id: z.string({
    message: "Campaign ID is required"
  }),
  targeting: targetingSchema.optional(),
  status: z.string({
    message: "Ad Set Status is required"
  }).optional(),
  end_time: z.date({
    message: "End date is required"
  }).optional(),
})
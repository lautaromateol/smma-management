import { z } from "zod";

const geoLocationsSchema = z.object({
  countries: z.array(z.string()),
})

const targetingSchema = z.object({
  geo_locations: geoLocationsSchema,
  locales: z.array(z.number()).optional()
})

export const AdSet = z.object({
  name: z.string({
    message: "Ad Set Name is required"
  }),
  optimization_goal: z.string({
    message: "Ad Set Optimization Goal is required"
  }),
  client: z.string({
    message: "Client ID is required"
  }),
  access_token: z.string({
    message: "Page Access Token is required"
  }),
  billing_event: z.string({
    message: "Ad Set Billing Event is required"
  }),
  bid_amount: z.string({
    message: "Ad Set Bid Amount is required"
  }),
  campaign_id: z.string({
    message: "Campaign ID is required"
  }),
  targeting: targetingSchema,
  status: z.string({
    message: "Ad Set Status is required"
  }),
  start_time: z.date({
    message: "Start date is required"
  }),
  end_time: z.date({
    message: "End date is required"
  }),
  age_min: z.string().optional()
})
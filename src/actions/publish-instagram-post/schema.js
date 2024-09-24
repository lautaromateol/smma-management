import { z } from "zod";

const citySchema = z.object({
  key: z.string(),
  name: z.string()
})

const geoLocationsSchema = z.object({
  countries: z.array(z.string()),
  cities: z.array(citySchema)
})

const targetingSchema = z.object({
  geo_locations: geoLocationsSchema
})

const mediaFbidSchema = z.object({
  media_fbid: z.string()
})

export const InstagramPost = z.object({
  id: z.string({
    message: "Instagram page ID is required"
  }),
  platform: z.string({
    message: "Please select a platform"
  }),
  message: z.string({
    message: "Message text is required"
  }),
  published: z.boolean(),
  scheduled_publish_time: z.optional(
    z.date()
    .nullable()
  ),
  targeting: targetingSchema.optional(),
  attached_media: z.array(mediaFbidSchema).optional(),
  access_token: z.string({
    message: "Please provide a profile access token"
  })
})
.refine((data) => {
  return data.published === true || data.scheduled_publish_time !== null
},  {
  message: "Post scheduled publish time is required",
  path: ["scheduled_publish_time"]
})
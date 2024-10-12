import { z } from "zod";

const citySchema = z.object({
  key: z.string(),
  name: z.string()
})

const geoLocationsSchema = z.object({
  countries: z.array(z.string()),
  // cities: z.array(citySchema)
})

const targetingSchema = z.object({
  geo_locations: geoLocationsSchema
})

const mediaFbidSchema = z.object({
  media_fbid: z.string()
})

export const FacebookPost = z.object({
  id: z.string({
    message: "Facebook page ID is required"
  }),
  platform: z.string({
    message: "Please select a platform"
  }),
  message: z.string({
    message: "Caption text cannot be empty"
  }).min(1, {
    message: "Caption text cannot be empty"
  }),
  link: z.string().regex(/^https:\/\/[^\s$.?#].[^\s]*$/, {
    message: "Post link URL must be a valid URL"
  }).optional().nullable(),
  location: z.string().optional().nullable(),
  published: z.boolean(),
  scheduled_publish_time: z.date().optional().nullable(),
  targeting: targetingSchema.optional().nullable(),
  attached_media: z.array(mediaFbidSchema).optional(),
  unpublished_content_type: z.string().optional(),
  access_token: z.string({
    message: "Please provide a page access token"
  })
}).refine((data) => {
  return data.published === true || data.scheduled_publish_time !== null
}, {
  message: "Post scheduled publish time is required",
  path: ["scheduled_publish_time"]
}).refine((data) => {
  if (data.attached_media.length > 0 && !data.link) return true
  if (data.attached_media.length === 0) return true
}, {
  message: "Post cannot have both attached media and a link",
  path: ["link"]
})
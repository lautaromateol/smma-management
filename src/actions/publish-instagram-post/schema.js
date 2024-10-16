import { z } from "zod";

// const citySchema = z.object({
//   key: z.string(),
//   name: z.string()
// })

const geoLocationsSchema = z.object({
  countries: z.array(z.string()),
  // cities: z.array(citySchema)
})

const targetingSchema = z.object({
  geo_locations: geoLocationsSchema
})

const urlSchema = z.object({
  source: z.string(),
  type: z.string()
})

export const InstagramPost = z.object({
  id: z.string({
    message: "Instagram page ID is required"
  }),
  platform: z.string({
    message: "Please select a platform"
  }),
  message: z.string({
    message: "Caption text cannot be empty"
  }).min(1, {
    message: "Caption text cannot be empty"
  }),
  // published: z.boolean(),
  // scheduled_publish_time: z.optional(
  //   z.date()
  //   .nullable()
  // ),
  targeting: targetingSchema.optional().nullable(),
  urls: z.array(urlSchema, {
    message: "You have to upload a photo or a video to continue"
  }),
  access_token: z.string({
    message: "Page Access Token is required"
  })
})
.refine((data) => {
  return data.published === true || data.scheduled_publish_time !== null
},  {
  message: "Post scheduled publish time is required",
  path: ["scheduled_publish_time"]
})
.refine((data) => {
  return data.urls.length > 0
}, {
  message: "You have to upload a photo or a video to continue",
  path: ["urls"]
})
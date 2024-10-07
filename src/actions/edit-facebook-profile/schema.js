import { z } from "zod";

export const FacebookProfile = z.object({
  id: z.string(),
  access_token: z.string({
    message: "Page Access Token is required"
  }),
  about: z.string().min(1, {
    message: "You can't leave this field empty."
  }).optional().nullable(),
  category: z.string().min(1, {
    message: "You can't leave this field empty."
  }).optional().nullable(),
  email: z.string().email().min(1, {
    message: "You can't leave this field empty"
  }).optional().nullable(),
  website: z.string().min(1, {
    message: "You can't leave this field empty."
  }).optional().nullable(),
  phone: z.string().min(1, {
    message: "You can't leave this field empty."
  }).optional().nullable(),
  location: z.object({
    city: z.string({
      message: "Location city is required"
    }),
    country: z.string({
      message: "Location country is required"
    }),
    state: z.string().optional().nullable(),
    street: z.string({
      message: "Location city is required"
    }),
    zip: z.string({
      message: "Location ZIP is required"
    })
  }).optional().nullable()
})
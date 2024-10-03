import { z } from "zod";

export const FacebookProfile = z.object({
  id: z.string(),
  accessToken: z.string(),
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
    street: z.string({
      message: "Location city is required"
    }),
    zip: z.string({
      message: "Location ZIP is required"
    })
  }).optional().nullable()
})
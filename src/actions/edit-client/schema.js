import { z } from "zod";

export const EditClient = z.object({
  id: z.string({
    message: "Client ID is required"
  }),
  name: z.string({
    message: "Client name is required"
  }).min(3, {
    message: "Client name must be at least of 3 characters"
  }),
  email: z.string({
    message: "Email address is required"
  }).min(3, {
    message: "Client email must be at least of 3 characters"
  }).email({
    message: "This is not a valid email"
  }),
  phone: z.string({
    message: "Client phone number is required"
  }).min(3, {
    message: "Client phone number must be at least of 3 characters"
  }),
  company: z.string({
    message: "Client company name is required"
  }).min(3, {
    message: "Client company name must be at least of 3 characters"
  }),
  industry: z.string({
    message: "Client industry is required"
  }).min(3, {
    message: "Client industry must be at least of 3 characters"
  }),
  website: z.optional(
    z.string().min(10, { message: "Client website URL must be at least of 10 characters" })
  )
})
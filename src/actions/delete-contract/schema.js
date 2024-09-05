import { z } from "zod"

export const DeleteContract = z.object({
  id: z.string({
    message: "The contract ID is required"
  }),
  fullPath: z.string({
    message: "The contract file path is required"
  }),
})
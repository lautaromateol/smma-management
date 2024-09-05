import { z } from "zod"

export const UploadContract = z.object({
  name: z.string({
    message: "Contract name is required",
  }),
  contractUrl: z.string({
    message: "The contract URL is required"
  }),
  fullPath: z.string({
    message: "The contract file path is required"
  }),
  clientId: z.string({
    message: "The client ID is required"
  })
})
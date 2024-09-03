import { z } from "zod";

export const DeleteClient = z.object({
  id: z.string({
    message: "Client ID is required"
  })
})
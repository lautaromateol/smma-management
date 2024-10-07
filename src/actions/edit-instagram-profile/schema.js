import { z } from "zod";

export const InstagramProfile = z.object({
  id: z.string(),
  accessToken: z.string(),
  biography: z.string().min(1, {
    message: "You can't leave this field empty."
  }).optional().nullable(),
  username: z.string().min(1, {
    message: "You can't leave this field empty."
  }),
  profile_picture_url: z.optional(
    z.string().regex(/^https:\/\/[^\s$.?#].[^\s]*$/, {
      message: "Profile picture URL must be a valid URL"
    })
    .nullable()
  ),
})
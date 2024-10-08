"use server"
import { auth } from "@clerk/nextjs/server";
import { InstagramProfile } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { access_token, id, username, biography, profile_picture_url } = data

  try {

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}?access_token=${access_token}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        biography,
        profile_picture_url
      })
    })

    const data = await response.json()

    if (data.success) {
      return { ok: true, data }
    } else {
      console.log(data)
      return { error: "Error updating the instagram profile!" }
    }

  } catch (error) {
    console.log(error)
    return { error: "Error updating the instagram profile!" }
  }
}

export const updateInstagramProfile = createSafeAction(InstagramProfile, handler)
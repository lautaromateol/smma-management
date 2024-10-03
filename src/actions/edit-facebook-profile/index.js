"use server"
import { auth } from "@clerk/nextjs/server";
import { FacebookProfile } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { accessToken, id, about, category, email, website, phone, location } = data

  try {

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}?access_token=${accessToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        about,
        website,
        phone,
        // location
      })
    })

    const data = await response.json()

    if (data.success) {
      return { ok: true, data }
    } else {
      console.log(data)
      return { error: "Error updating the facebook profile!" }
    }

  } catch (error) {
    console.log(error)
    return { error: "Error updating the facebook profile!" }
  }
}

export const updateFacebookProfile = createSafeAction(FacebookProfile, handler)
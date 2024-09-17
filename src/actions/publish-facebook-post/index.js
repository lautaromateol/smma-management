"use server"
import { auth } from "@clerk/nextjs/server";
import { FacebookPost } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, message, link, published, scheduled_publish_time, targeting } = data

  try {
    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/feed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message,
        link,
        published,
        scheduled_publish_time,
        targeting
      })
    })

    if(response.ok) {
      const data = await response.json()

      return { ok: true, id: data.id }
    }
  } catch (error) {
    console.log(error)
    return { error: "Error uploading the post to Facebook!" }
  }
}

export const publishFacebookPost = createSafeAction(FacebookPost, handler)
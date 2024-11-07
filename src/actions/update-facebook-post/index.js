"use server"
import { auth } from "@clerk/nextjs/server";
import { FacebookPostToUpdate } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { revalidatePath } from "next/cache";
import { parseISO } from "date-fns";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, post_id, access_token, scheduled_publish_time, campaign_id, ...rest } = data

  try {

    const date = new Date(scheduled_publish_time)

    const timestamp = Math.floor(date.getTime() / 1000)

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${post_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rest,
        scheduled_publish_time: timestamp,
        access_token
      })
    })

    const data = await response.json()

    if (response.ok) {
      revalidatePath(`/agency/${orgId}/campaigns/${campaign_id}`)
      return { ok: true, id: data.id }
    } else {
      console.log(data)
      throw new Error(data.error.message)
    }
  } catch (error) {
    console.log(error)
    return { error: "Error updating the Facebook post!" }
  }
}

export const updateFacebookPost = createSafeAction(FacebookPostToUpdate, handler)
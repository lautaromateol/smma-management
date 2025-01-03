"use server"
import { auth } from "@clerk/nextjs/server";
import { AdSetToDelete } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { revalidatePath } from "next/cache";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, campaign_id, access_token } = data

  try {

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `OAuth ${access_token}`,
      },
    })

    const data = await response.json()

    if (data.success) {
      revalidatePath(`/agency/${orgId}/campaigns/${campaign_id}`)
      return { ok: true }
    } else {
      console.log(data)
      throw new Error(data.error.message)
    }
  } catch (error) {
    console.log(error)
    return { error: "Error deleting the Meta Ad Set!" }
  }
}

export const deleteAdSet = createSafeAction(AdSetToDelete, handler)
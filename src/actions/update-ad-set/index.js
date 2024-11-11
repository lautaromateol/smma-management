"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AdSetToUpdate } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { revalidatePath } from "next/cache";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, client, campaign_id, bid_amount, ...rest } = data

  const dbClient = await prisma.client.findUnique({
    where: { id: client }
  })

  if (!dbClient) {
    return { error: "This client is not registered" }
  }

  try {

    const body = bid_amount ? JSON.stringify({ ...rest, bid_amount: parseInt(bid_amount) * 100 }) : JSON.stringify({ ...rest })

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body
    })

    const data = await response.json()

    if (data.success) {

      revalidatePath(`/agency/${orgId}/campaigns/${campaign_id}`)

      return { ok: true }

    } else throw new Error(data.error.message)

  } catch (error) {
    console.log(error)
    return { error: "Error updating the Ad Set!" }
  }
}

export const updateAdSet = createSafeAction(AdSetToUpdate, handler)
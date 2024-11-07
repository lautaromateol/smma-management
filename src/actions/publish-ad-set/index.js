"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AdSet } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { revalidatePath } from "next/cache";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { client, campaign_id, bid_amount, ...rest } = data

  const dbClient = await prisma.client.findUnique({
    where: { id: client }
  })

  if (!dbClient) {
    return { error: "This client is not registered" }
  }

  try {

    const metaAdAccountId = await prisma.metaAdAccountId.findFirst({
      where: {
        clientId: dbClient.id
      }
    })

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${metaAdAccountId.id}/adsets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...rest,
        campaign_id,
        bid_amount: parseInt(bid_amount) * 100,
      })
    })

    const data = await response.json()

    if (data.id) {

      revalidatePath(`/agency/${orgId}/campaigns/${userId}`)

      return { ok: true }
    } else throw new Error(data.error.message)

  } catch (error) {
    console.log(error)
    return { error: "Error creating the Ad Set!" }
  }
}

export const publishAdSet = createSafeAction(AdSet, handler)
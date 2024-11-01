"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AddCampaign } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { Action, EntityType } from "@prisma/client";
import { createAudtiLog } from "@/lib/create-audit-log";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { name, client, budget, start, end, objective, platform } = data

  const dbClient = await prisma.client.findUnique({
    where: { id: client }
  })

  if (!dbClient) {
    return { error: "This client is not registered" }
  }

  try {

    const [metaAccessToken, metaAdAccountId] = await Promise.all([
      prisma.metaAccessToken.findFirst({
        where: {
          clientId: dbClient.id
        }
      }),
      prisma.metaAdAccountId.findFirst({
        where: {
          clientId: dbClient.id
        }
      })
    ])

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${metaAdAccountId.id}/campaigns`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${metaAccessToken.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        objective,
        status: "ACTIVE",
        lifetime_budget: parseInt(budget) * 100,
        special_ad_categories: [],
        start_time: new Date(start),
        stop_time: new Date(end)
      })
    });

    const campaignData = await response.json();

    if (campaignData.id) {
      const campaign = await prisma.campaign.create({
        data: {
          id: campaignData.id,
          name,
          clientId: dbClient.id,
          budget: Number(budget),
          start: new Date(start),
          end: new Date(end),
          platform,
          objective,
          orgId,  
        }
      })

      await createAudtiLog({
        action: Action.CREATE,
        entityType: EntityType.CAMPAIGN,
        entityTitle: campaign.name,
        entityId: campaign.id
      })

      revalidatePath(`/agency/${orgId}/campaigns`)

      return { ok: true, data: campaign }
    } else {
      throw new Error(campaignData.error.message)
    }

  } catch (error) {
    console.log(error)
    return { error: "Error creating the campaign!" }
  }
}

export const addCampaign = createSafeAction(AddCampaign, handler)
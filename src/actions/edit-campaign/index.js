"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { EditCampaign } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { createAudtiLog } from "@/lib/create-audit-log";
import { Action, EntityType } from "@prisma/client";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { getMetaAccessToken } from "@/lib/get-meta-access-token";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, budget, client_id, ...rest } = data

  try {

    const accessToken = await getMetaAccessToken(client_id)

    const { lifetime_budget, daily_budget } = rest

    const body = lifetime_budget ? { ...rest, lifetime_budget: parseInt(lifetime_budget) * 100 } : daily_budget ? { ...rest, daily_budget: parseInt(daily_budget) * 100 } : rest

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}?access_token=${accessToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })

    const update = await response.json()

    if (update.success) {

      const body = lifetime_budget ? { ...rest, lifetime_budget: parseInt(lifetime_budget) } : daily_budget ? { ...rest, daily_budget: parseInt(daily_budget) } : rest

      const campaign = await prisma.campaign.update({
        where: { id, orgId },
        data: body
      })

      await createAudtiLog({
        action: Action.UPDATE,
        entityType: EntityType.CAMPAIGN,
        entityTitle: campaign.name,
        entityId: campaign.id
      })

      revalidatePath(`/agency/${orgId}/campaigns`)

      return { ok: true, data: campaign }
    } else {
      if (update.error.error_user_msg) {
        return { error: update.error.error_user_msg }
      }
      throw new Error(update.error.message)
    }
  } catch (error) {
    console.log(error)
    return { error: "Error updating the campaign!" }
  }
}

export const editCampaign = createSafeAction(EditCampaign, handler)
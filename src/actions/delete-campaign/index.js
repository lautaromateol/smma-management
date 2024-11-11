"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DeleteCampaign } from "./schema";
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

  const { id, client_id } = data

  try {

    const access_token = await getMetaAccessToken(client_id)

    const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `OAuth ${access_token}`
      }
    })

    const data = await response.json()

    if (data.success) {
      const campaign = await prisma.campaign.delete({
        where: {
          id,
          orgId
        }
      })

      await createAudtiLog({
        action: Action.DELETE,
        entityType: EntityType.CAMPAIGN,
        entityTitle: campaign.name,
        entityId: campaign.id
      })

      revalidatePath(`/agency/${orgId}/campaigns`)

      return { ok: true, data: campaign }
    } else {
      throw new Error(data.error.message)
    }

  } catch (error) {
    console.log(error)
    return { error: "Error deleting the campaign!" }
  }
}

export const deleteCampaign = createSafeAction(DeleteCampaign, handler)
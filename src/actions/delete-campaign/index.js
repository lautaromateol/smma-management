"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DeleteCampaign } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { createAudtiLog } from "@/lib/create-audit-log";
import { Action, EntityType } from "@prisma/client";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id } = data

  try {
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
  } catch (error) {
    return { error: "Error deleting the campaign!" }
  }
}

export const deleteCampaign = createSafeAction(DeleteCampaign, handler)
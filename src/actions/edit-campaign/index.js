"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { EditCampaign } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, budget } = data

  try {
    const campaign = await prisma.campaign.update({
      where: { id, orgId },
      data: {
        ...data,
        budget: Number(budget)
      }
    })

    revalidatePath(`/agency/${orgId}/campaigns`)

    return { ok: true, data: campaign }
  } catch (error) {
    console.log(error)
    return { error: "Error updating the campaign!" }
  }
}

export const editCampaign = createSafeAction(EditCampaign, handler)
"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AddCampaign } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { client, budget, start, end, objective, platforms } = data

  try {
    const campaign = await prisma.campaign.create({
      data: {
        clientId: client,
        budget: Number(budget),
        start: new Date(start),
        end: new Date(end),
        platforms,
        objective,
        orgId
      }
    })

    revalidatePath(`/agency/${orgId}/campaigns`)

    return { ok: true, data: campaign }
  } catch (error) {
    console.log(error)
    return { error: "Error creating the campaign!" }
  }
}

export const addCampaign = createSafeAction(AddCampaign, handler)
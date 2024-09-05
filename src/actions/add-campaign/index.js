"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AddCampaign } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { Action, EntityType } from "@prisma/client";
import { createAudtiLog } from "@/lib/create-audit-log";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { client, budget, start, end, objective, platforms } = data

  const dbClient = await prisma.client.findUnique({
    where: { id: client }
  })

  if(!dbClient) {
    return { error: "This client is not registered" }
  }

  try {

    const campaign = await prisma.campaign.create({
      data: {
        name: `${dbClient.name} - campaign`,
        clientId: client,
        budget: Number(budget),
        start: new Date(start),
        end: new Date(end),
        platforms,
        objective,
        orgId
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
  } catch (error) {
    console.log(error)
    return { error: "Error creating the campaign!" }
  }
}

export const addCampaign = createSafeAction(AddCampaign, handler)
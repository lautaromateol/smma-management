"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { EditClient } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { createAudtiLog } from "@/lib/create-audit-log";
import { Action, EntityType } from "@prisma/client";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  try {
    const client = await prisma.client.update({
      where: {
        id: data.id,
        orgId
      },
      data: {
        ...data
      }
    })

    await createAudtiLog({
      action: Action.UPDATE,
      entityType: EntityType.CLIENT,
      entityTitle: client.name,
      entityId: client.id
    })

    revalidatePath(`/agency/${orgId}/clients`)

    return { ok: true, data: client }
  } catch (error) {
    return { error: "Error editing the client!" }
  }
}

export const editClient = createSafeAction(EditClient, handler)
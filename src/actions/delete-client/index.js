"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DeleteClient } from "./schema";
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
    const client = await prisma.client.delete({
      where: {
        id,
        orgId
      }
    })

    await createAudtiLog({
      action: Action.DELETE,
      entityType: EntityType.CLIENT,
      entityTitle: client.name,
      entityId: client.id
    })

    revalidatePath(`/agency/${orgId}/clients`)

    return { ok: true, data: client }
  } catch (error) {
    return { error: "Error deleting the client!" }
  }
}

export const deleteClient = createSafeAction(DeleteClient, handler)
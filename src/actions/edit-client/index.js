"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { EditClient } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";

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

    revalidatePath(`/agency/${orgId}/clients`)

    return { ok: true, data: client }
  } catch (error) {
    return { error: "Error editing the client!" }
  }
}

export const editClient = createSafeAction(EditClient, handler)
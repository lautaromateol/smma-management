"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { AddClient } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { name, email, phoneNumber, companyName, industry, website } = data

  try {
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phoneNumber,
        companyName,
        industry,
        website,
        orgId
      }
    })

    return { ok: true, data: client }
  } catch (error) {
    return { error: "Error creating the client!" }
  }
}

export let addClient = createSafeAction(AddClient, handler)
"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { UploadContract } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { name, contractUrl, fullPath, clientId } = data

  try {
    const contract = await prisma.contract.create({
      data: {
        name,
        contractUrl,
        fullPath,
        clientId
      }
    })

    revalidatePath(`/agency/${orgId}/clients`)

    return { ok: true, data: contract }
  } catch (error) {
    const fileRef = ref(storage, fullPath)
    await deleteObject(fileRef)
    return { error: "Error uploading the contract on the database!" }
  }
}

export const uploadContract = createSafeAction(UploadContract, handler)
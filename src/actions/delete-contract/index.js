"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DeleteContract } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { revalidatePath } from "next/cache";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { fullPath, id } = data

  try {
    const fileRef = ref(storage, fullPath)
    await deleteObject(fileRef)

    const contract = await prisma.contract.delete({
      where: { id }
    })

    revalidatePath(`/agency/${orgId}/clients`)

    return { ok: true, data: contract }
  } catch (error) {
    return { error: "Error uploading the contract on the database!" }
  }
}

export const deleteContract = createSafeAction(DeleteContract, handler)
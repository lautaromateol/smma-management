import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "./prisma";

export async function createAudtiLog({ entityTitle, entityId, entityType, action  }) {
  const { orgId } = auth()

  const { firstName, lastName, id, imageUrl } = await currentUser()

  if(!orgId || !firstName) {
    throw new Error("Unauthorized")
  }

  await prisma.activityLog.create({
    data: {
      entityTitle,
      entityId,
      entityType,
      action,
      orgId,
      userImage: imageUrl,
      userName: lastName ? `${firstName} ${lastName}` : firstName
    }
  })
}
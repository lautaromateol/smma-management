import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { searchParams } = new URL(req.url)

  const clientId = searchParams.get("client_id")

  const dbClient = await prisma.client.findUnique({
    where: { id: clientId },
    select: {
      metaAccessToken: {
        select: {
          token: true
        }
      }
    }
  })

  if (!dbClient) {
    return NextResponse.json({ error: "This client is not registered" }, { status: 401 })
  }

  return NextResponse.json({ token: dbClient.metaAccessToken.token }, { status: 200 })
}
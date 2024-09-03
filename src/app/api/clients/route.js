import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req) {

  const { orgId, userId } = auth()

  if (!orgId || !userId) {
    return new NextResponse("Unauthorized", { status: 403 })
  }

  try {
    const clients = await prisma.client.findMany({
      where: {
        orgId
      },
      select: {
        id: true,
        name: true
      }
    })

    return NextResponse.json(clients)
  } catch (error) {
    console.log(error)
    return new NextResponse("An error has ocurred obtaining clients from the database.", { status: 500 })
  }
}
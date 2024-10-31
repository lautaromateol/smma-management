import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { fetcher } from "@/lib/fetcher"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req) {

  const { orgId, userId } = auth()

  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")
  const clientId = searchParams.get("client_id")

  if (!token || !clientId) {
    return NextResponse.json("Missing params", { status: 400 })
  }

  if (!orgId || !userId) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  try {

    const facebookProfile = await prisma.facebookProfile.findUnique({
      where: {
        clientId
      }
    })

    if (!facebookProfile) {
      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/me?access_token=${token}&fields=first_name,last_name,picture`)

      const data = await response.json()

      if (data.first_name) {

        const image = data.picture.data.is_silhouette ? "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png" : data.picture.data.url

        const facebookProfile = await prisma.facebookProfile.create({
          data: {
            name: `${data.first_name} ${data.last_name}`,
            image,
            clientId
          }
        })

        const metaAdAccounts = await fetcher(`${FACEBOOK_API_GRAPH_URL}/me/adaccounts?access_token=${token}`)

        await prisma.metaAdAccountId.create({
          data: {
            id: metaAdAccounts.data[0].id,
            clientId
          }
        })

        return NextResponse.json(facebookProfile, { status: 200 })

      } else {
        return NextResponse.json("Invalid Token", { status: 403 })
      }
    }

    return NextResponse.json(facebookProfile, { status: 200 })

  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
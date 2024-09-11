import { generateNewTwitterToken } from "@/lib/generate-new-twitter-token"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { isAfter } from "date-fns"
import { NextResponse } from "next/server"

export async function GET(req) {

  const { orgId, userId } = auth()

  const { searchParams } = new URL(req.url)
  const clientId = searchParams.get("client_id")

  if (!clientId) {
    return new NextResponse.json("No User ID provided", { status: 400 })
  }

  if (!orgId || !userId) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  let dbToken = await prisma.twitterAccessToken.findUnique({
    where: {
      clientId
    }
  })

  const isTokenExpired = isAfter(new Date(), new Date(dbToken.expiresIn))

  if (isTokenExpired) {
    dbToken = await generateNewTwitterToken(dbToken.refreshToken, clientId)
  }

  try {

    const twitterProfile = await prisma.twitterProfile.findUnique({
      where: {
        clientId
      }
    })

    if (!twitterProfile) {

      const response = await fetch(`https://api.twitter.com/2/users/me?user.fields=profile_image_url,username,name`, {
        headers: {
          "Authorization": `Bearer ${dbToken.token}`
        }
      })

      const user = await response.json()

      if (user.data.username) {

        const { name, username, profile_image_url } = user.data

        const data = {
          name,
          username,
          image: profile_image_url
        }

        const twitterProfile = await prisma.twitterProfile.create({
          data: {
            ...data,
            clientId
          }
        })

        return NextResponse.json(twitterProfile, { status: 200 })
      } else {
        return NextResponse.json("Invalid Token", { status: 403 })
      }
    }

    return NextResponse.json(twitterProfile, { status: 200 })

  } catch (error) {
    return NextResponse.json(error, { status: 500 })
  }
}
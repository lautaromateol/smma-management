import { prisma } from "@/lib/prisma";
import { addMonths, addSeconds } from "date-fns";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams } = new URL(req.url)

  const code = searchParams.get("code")
  const clientId = searchParams.get("client_id")
  const agencyId = searchParams.get("agency_id")

  if (!code || !clientId || !agencyId) {
    return NextResponse.json("Missing Params", { status: 400 })
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`)

    const data = await response.json()

    if (data.access_token) {

      const existingToken = await prisma.metaAccessToken.findUnique({
        where: {
          clientId
        }
      })

      if(existingToken) {
        await prisma.metaAccessToken.delete({
          where: {
            id: existingToken.id
          }
        })
      }

      const token = await prisma.metaAccessToken.create({
        data: {
          token: data.access_token,
          type: data.token_type,
          expiresIn: data.expires_in ? new Date(addSeconds(new Date(), data.expires_in)) : new Date(addMonths(new Date(), 2)),
          clientId
        },
      })

      revalidatePath(`/agency/${agencyId}/clients/${token.clientId}`)

      return NextResponse.json({ token }, { status: 200 })
    } else {
      return NextResponse.json(data.error_description, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json("Meta Graph API Error", { status: 500, statusText: error })
  }
}
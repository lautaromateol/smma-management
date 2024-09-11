import { prisma } from "@/lib/prisma";
import { addSeconds } from "date-fns";
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

  const url = 'https://www.linkedin.com/oauth/v2/accessToken';

  const params = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
  });

  try {
    const response = await fetch(`${url}?${params}`)

    const data = await response.json()

    if(data.access_token) {

      const dbToken = await prisma.linkedInAccessToken.findUnique({
        where: {
          clientId
        }
      })

      if(dbToken) {
        await prisma.linkedInAccessToken.delete({
          where: { id: dbToken.id }
        })
      }

      console.log(data)

      const token = await prisma.linkedInAccessToken.create({
        data: {
          token: data.access_token,
          expiresIn: new Date(addSeconds(new Date(), data.expires_in)),
          clientId
        }
      })

      revalidatePath(`/agency/${agencyId}/clients/${token.clientId}`)

      return NextResponse.json({ token }, { status: 200 })
    } else {
      return NextResponse.json(data.error_description, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 })
  }
}
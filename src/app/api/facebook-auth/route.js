import { prisma } from "@/lib/prisma";
import { addSeconds } from "date-fns";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams } = new URL(req.url)

  const code = searchParams.get("code")
  const id = searchParams.get("id")
  const agencyId = searchParams.get("agencyId")

  if (!code || !id) {
    return new NextResponse("Missing Params", { status: 400 })
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`)

    const data = await response.json()

    console.log(data)

    if (data.access_token) {
      const token = await prisma.metaAccessToken.create({
        data: {
          token: data.access_token,
          type: data.token_type,
          expiresIn: new Date(addSeconds(new Date(), data.expires_in)),
          clientId: id
        },
      })

      revalidatePath(`/agency/${agencyId}/clients/${token.clientId}`)

      return NextResponse.redirect(new URL(`/agency/${agencyId}/clients/${token.clientId}`, req.url))
    }

  } catch (error) {
    console.log(error)
    return new NextResponse("Meta Graph API Error", { status: 500, statusText: error })
  }

  return { ok: true }
}
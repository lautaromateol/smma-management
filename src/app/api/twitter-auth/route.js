import { prisma } from "@/lib/prisma";
import { addSeconds } from "date-fns";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams } = new URL(req.url)

  const code = searchParams.get("code")
  const id = searchParams.get("id")
  const agencyId = searchParams.get("agency_id")
  const codeVerifier = searchParams.get("code_verifier")

  if (!code || !id || !agencyId || !codeVerifier) {
    return NextResponse.json("Missing Params", { status: 400 })
  }

  const url = 'https://api.x.com/2/oauth2/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const params = new URLSearchParams({
    code,
    grant_type: 'authorization_code',
    client_id: process.env.TWITTER_CLIENT_ID,
    redirect_uri: process.env.TWITTER_REDIRECT_URI,
    code_verifier: codeVerifier,
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: 'POST',
      headers,
    })

    const data = await response.json()

    if (data.access_token) {
      const token = await prisma.twitterAccessToken.create({
        data: {
          token: data.access_token,
          type: data.token_type,
          expiresIn: new Date(addSeconds(new Date(), data.expires_in)),
          refreshToken: data.refresh_token,
          clientId: id
        },
      })

      revalidatePath(`/agency/${agencyId}/clients/${token.clientId}`)

      return NextResponse.json({ token }, { status: 200 })
    } else {
      return NextResponse.json(data.error_description, { status: 400 })
    }

  } catch (error) {
    return NextResponse.json("Twitter API Error", { status: 500, statusText: error })
  }
}
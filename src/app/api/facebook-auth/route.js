import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {

  const { searchParams } = new URL(req.url)

  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const cleanState = state.replace(/[{}"]/g, '');
  const stateParams = new URLSearchParams(cleanState.replace(/,/g, '&'));
  const id = stateParams.get('id');

  if (!code) {
    return new NextResponse("No authorization code found", { status: 500 })
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v20.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`);
    const data = await response.json()

    
    if (data.access_token) {
      await prisma.client.update({
        where: {
          id
        },
        data: {
          metaAccessToken: data.access_token
        }
      })
    }

  } catch (error) {
    return new NextResponse("Error obtaining access token", { status: 500 })
  }
}
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function GET(req) {

  const { orgId, userId } = auth()

  const { searchParams } = new URL(req.url)
  const token = searchParams.get("token")

  if (!token) {
    return new NextResponse("No Token Provided", { status: 400 })
  }

  if (!orgId || !userId) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {

    const response = await fetch(`https://graph.facebook.com/v20.0/me?access_token=${token}&fields=first_name,last_name,picture`)

    const data = await response.json()

    if (data.first_name) {
      return NextResponse.json(data, { status: 200 })
    } else {
      return new NextResponse("Invalid Token", { status: 403 })
    }

  } catch (error) {
    return new NextResponse(error, { status: 500 })
  }
}
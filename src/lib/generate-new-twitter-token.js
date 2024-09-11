import { addSeconds } from "date-fns";
import { prisma } from "./prisma";

export async function generateNewTwitterToken(token, clientId) {

  const response = await fetch(`https://api.twitter.com/2/oauth2/token?grant_type=refresh_token&client_id=${process.env.TWITTER_CLIENT_ID}&refresh_token=${token}`, {
    method: "POST"
  })

  const data = await response.json()

  if(data.access_token) {

    await prisma.twitterAccessToken.delete({
      where: {
        clientId
      }
    })

    const newToken = await prisma.twitterAccessToken.create({
      data: {
        token: data.access_token,
        refreshToken: data.refresh_token,
        expiresIn: new Date(addSeconds(new Date(), data.expires_in)),
        type: data.token_type,
        clientId
      }
    })

    return newToken
  }

  return null
}
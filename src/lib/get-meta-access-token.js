import { fetcher } from "./fetcher"
import { prisma } from "./prisma"

export async function getMetaAccessToken(clientId) {
  const token = await prisma.metaAccessToken.findUnique({
    where: {
      clientId
    }
  })
  
  return token.token
}
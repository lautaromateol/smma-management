import { fetcher } from "./fetcher"

export async function getMetaAccessToken(clientId) {
  const data = await fetcher(`/api/clients/meta-data/access_token?client_id=${clientId}`)

  if(data.token) {
    return data.token
  } 

  return null
}
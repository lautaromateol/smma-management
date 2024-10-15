import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { isContainerReady } from "./is-container-ready"

export async function publishContainerId(data, creation_id) {

  const { id, access_token } = data

  const ready = await isContainerReady(creation_id, access_token)

  if (!ready) return { error: "Error uploading the story to Instagram!" }

  const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media_publish?creation_id=${creation_id}`, {
    method: "POST",
    headers: {
      "Authorization": `OAuth ${access_token}`
    },
  })

  const upload = await response.json()

  return upload
}
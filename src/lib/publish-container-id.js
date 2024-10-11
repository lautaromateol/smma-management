import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { isContainerReady } from "./is-container-ready"

export async function publishContainerId(data, creation_id) {

  const { id, access_token, published, scheduled_publish_time, targeting } = data

  const ready = await isContainerReady(creation_id, access_token)

  if (!ready) return { error: "Error uploading the story to Instagram!" }

  const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media_publish`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      creation_id,
      published,
      scheduled_publish_time,
      targeting,
      access_token
    })
  })

  const container = await response.json()

  if (container.id) {
    return { id: container.id }
  } else {
    console.log(container.error)
    return { error: "Error uploading the story to Instagram!" }
  }
}
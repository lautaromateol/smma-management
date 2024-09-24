"use server"
import { auth } from "@clerk/nextjs/server";
import { InstagramPost } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { fetcher } from "@/lib/fetcher";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, message, published, scheduled_publish_time, targeting, attached_media, access_token } = data

  try {

    let creation_id

    if (attached_media.length === 1) {

      const imagesData = await fetcher(`${FACEBOOK_API_GRAPH_URL}/${attached_media[0].media_fbid}?fields=images&access_token=${access_token}`)

      const imageUrl = imagesData.images.find((img) => img.height >= 800 && img.height <= 1200).source

      const formData = new FormData()

      formData.append("image_url", imageUrl)
      formData.append("caption", message)
      formData.append("access_token", access_token)

      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      if (response.ok) {
        creation_id = data.id
      } else {
        console.log(data.error)
        return { error: "Error uploading media elements!" }
      }
    }

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

    const data = await response.json()

    if (response.ok) {
      return { ok: true, id: data.id }
    } else {
      console.log(data.error)
      return { error: "Error uploading the post to Instagram!" }
    }
  } catch (error) {
    console.log(error)
    return { error: "Error uploading the post to Instagram!" }
  }
}

export const publishInstagramPost = createSafeAction(InstagramPost, handler)
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
        return { error: "Error uploading image!" }
      }
    } else {

      const imagesPromise = attached_media.map((img) => {
        return fetch(`${FACEBOOK_API_GRAPH_URL}/${img.media_fbid}?fields=images&access_token=${access_token}`)
      })

      const imagesResponses = await Promise.all(imagesPromise)

      const imagesData = imagesResponses.map((response) => response.json())

      const images = await Promise.all(imagesData)

      const imagesUrl = images.map((img) => img.images).map((img) => img.find((obj) => obj.height >= 800 && obj.height <= 1200).source)

      const mediaPromises = imagesUrl.map((url) => {

        const formData = new FormData()
        formData.append("image_url", url)
        formData.append("caption", message)
        formData.append("is_carousel_item", true)
        formData.append("access_token", access_token)

        return fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
          method: "POST",
          body: formData
        })
      })

      const mediaResponses = await Promise.all(mediaPromises)

      const mediaData = mediaResponses.map((response) => response.json())

      const media = await Promise.all(mediaData)

      const children = media.map((container) => container.id)

      const formData = new FormData()

      formData.append("media_type", "CAROUSEL")
      formData.append("children", children)
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
        return { error: "Error uploading images!" }
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
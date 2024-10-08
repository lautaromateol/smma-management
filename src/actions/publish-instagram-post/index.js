"use server"
import { auth } from "@clerk/nextjs/server";
import { InstagramPost } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { fetcher } from "@/lib/fetcher";
import { isVideoReady } from "@/lib/is-video-ready";
import { isContainerReady } from "@/lib/is-container-ready";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, message, published, scheduled_publish_time, targeting, urls, access_token } = data

  try {

    let creation_id

    if (urls.length === 1) {

      if (urls[0].type === "image") {

        const imageUrl = urls[0].source

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
        const videoUrl = urls[0].source

        const formData = new FormData()

        formData.append("video_url", videoUrl)
        formData.append("media_type", "REELS")
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
          return { error: "Error uploading video!" }
        }
      }


    } else {

      const mediaPromises = urls.map((item) => {

        const formData = new FormData()

        item.type === "image" ? formData.append("image_url", item.source) : formData.append("video_url", item.source)
        item.type === "video" && formData.append("media_type", "VIDEO")
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
        return { error: "Error uploading post to Instagram!" }
      }
    }

    const ready = await isContainerReady(creation_id, access_token)

    if(!ready) return { error: "Error uploading post to Instagram!" }

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
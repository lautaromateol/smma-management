"use server"
import { auth } from "@clerk/nextjs/server";
import { InstagramStory } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { publishContainerId } from "@/lib/publish-container-id";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, urls, access_token } = data

  try {

    if (urls.length === 1) {

      const url = urls[0].source

      const formData = new FormData()

      urls[0].type === "image" ? formData.append("image_url", url) : formData.append("video_url", url)
      formData.append("media_type", "STORIES")
      formData.append("access_token", access_token)

      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
        method: "POST",
        body: formData
      })

      const containerData = await response.json()

      if (containerData.id) {
        const creation_id = containerData.id

        const container = await publishContainerId(data, creation_id)

        if (container.id) {
          return { ok: true, id: container.id }
        } else {
          return { error: container.error }
        }

      } else {
        return { error: "Error uploading the story to Instagram!" }
      }

    } else {

      const mediaPromises = urls.map((item) => {

        const formData = new FormData()

        item.type === "image" ? formData.append("image_url", item.source) : formData.append("video_url", item.source)
        formData.append("media_type", "STORIES")
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

      const childrenPromises = children.map((children) => {
        publishContainerId(data, children)
      })

      await Promise.all(childrenPromises)
    }

  } catch (error) {
    console.log(error)
    return { error: "Error uploading the story to Instagram!" }
  }
}

export const publishInstagramStory = createSafeAction(InstagramStory, handler)
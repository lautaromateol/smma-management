"use server"
import { auth } from "@clerk/nextjs/server";
import { InstagramStory } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { publishContainerId } from "@/lib/publish-container-id";
import { isContainerReady } from "@/lib/is-container-ready";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, urls, access_token } = data

  try {

    if (urls.length === 1) {

      const url = urls[0]

      if (url.type === "image") {
        const formData = new FormData()

        formData.append("image_url", url.source)
        formData.append("media_type", "STORIES")
        formData.append("access_token", access_token)

        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
          method: "POST",
          body: formData
        })

        const containerData = await response.json()

        if (containerData.id) {

          const upload = await publishContainerId(data, containerData.id)

          if (upload.id) {
            return { ok: true, id: upload.id }
          } else {
            console.log(upload)
            throw new Error(upload.error.message)
          }

        } else {
          return { error: "Error uploading the story to Instagram!" }
        }
      } else {
        const formData = new FormData()

        formData.append("media_type", "STORIES")
        formData.append("upload_type", "resumable")

        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `OAuth ${access_token}`
          }
        })

        const container = await response.json()

        if (container.id) {

          const response = await fetch(container.uri, {
            method: "POST",
            headers: {
              "Authorization": `OAuth ${access_token}`,
              "file_url": url.source,
            }
          })

          const upload = await response.json()

          const isReady = await isContainerReady(container.id, access_token)

          if(!isReady) throw new Error("Error uploading container")

          if (upload.success) {

            const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media_publish?creation_id=${container.id}`, {
              method: "POST",
              headers: {
                "Authorization": `OAuth ${access_token}`
              },
            })

            const story = await response.json()

            if(story.id) {
              return { ok: true }
            } else {
              console.log(story)
              throw new Error(story.error.message)
            }

          } else {
            console.log(upload)
            if (upload.type === "ProcessingFailedError") return { error: "The video must be shorter than 60 seconds. Upload another video" }
            throw new Error(upload.debug_info.message)
          }
        } else throw new Error(container.error.message)

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
"use server"
import { auth } from "@clerk/nextjs/server";
import { FacebookStory } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { publishContainerId } from "@/lib/publish-container-id";
import { fetcher } from "@/lib/fetcher";
import { getVideo } from "@/lib/is-video-ready";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, urls, access_token } = data

  try {

    if (urls.length === 1) {

      const element = urls[0]

      if (element.type === "image") {

        const formData = new FormData()
        formData.append("photo_id", element.id)
        formData.append("access_token", access_token)

        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/photo_stories`, {
          method: "POST",
          body: formData
        })

        const data = await response.json()

        if (data.success) {
          return { ok: true }
        } else throw new Error(data)

      } else {
        const formData = new FormData()
        formData.append("upload_phase", "start")

        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/video_stories`, {
          method: "POST",
          headers: {
            "Authorization": `OAuth ${access_token}`,
          },
          body: formData
        })

        const data = await response.json()

        if (data.video_id) {
          const response = await fetch(data.upload_url, {
            method: "POST",
            headers: {
              "Authorization": `OAuth ${access_token}`,
              "file_url": element.source,
            }
          })

          const video = await response.json()

          if (video.success) {

            const videoInfo = await getVideo(data.video_id, access_token, true)

            if (videoInfo) {
              const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/video_stories`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `OAuth ${access_token}`,
                },
                body: JSON.stringify({
                  video_id: data.video_id,
                  upload_phase: "finish"
                })
              })

              const upload = await response.json()

              console.log(upload)

              if (upload.success) {
                return { ok: true }
              } else {
                throw new Error(upload.error.message)
              } 

            } else {
              throw new Error(videoInfo.error.message)
            }

          } else {
            throw new Error(video.debug_info.message)
          }

        } else {
          throw new Error(data.error.message)
        }
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
    return { error: "Error uploading the story to Facebook!" }
  }
}

export const publishFacebookStory = createSafeAction(FacebookStory, handler)
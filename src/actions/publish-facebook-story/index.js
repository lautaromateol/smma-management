"use server"
import { auth } from "@clerk/nextjs/server";
import { FacebookStory } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { getVideo } from "@/lib/is-video-ready";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, urls, access_token } = data

  try {

    const video = urls.filter((url) => url.type === "video")[0]

    let videoInfo
    let startPhase

    if (video) {
      const formData = new FormData()
      formData.append("upload_phase", "start")

      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/video_stories`, {
        method: "POST",
        headers: {
          "Authorization": `OAuth ${access_token}`,
        },
        body: formData
      })

      startPhase = await response.json()

      if (startPhase.video_id) {
        const response = await fetch(startPhase.upload_url, {
          method: "POST",
          headers: {
            "Authorization": `OAuth ${access_token}`,
            "file_url": video.source,
          }
        })

        const uploadingPhase = await response.json()

        if (uploadingPhase.success) {

          videoInfo = await getVideo(startPhase.video_id, access_token, true)

        } else {
          throw new Error(uploadingPhase.debug_info.message)
        }

      } else {
        throw new Error(startPhase.error.message)
      }
    }

    const mediaPromises = urls.map((item) => {

      const formData = new FormData()

      if (item.type === "image") {
        formData.append("photo_id", item.id)

        return fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/photo_stories`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `OAuth ${access_token}`
          }
        })
      } else {
        if (videoInfo) {
          return fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/video_stories`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `OAuth ${access_token}`,
            },
            body: JSON.stringify({
              video_id: startPhase.video_id,
              upload_phase: "finish"
            })
          })

        } else {
          throw new Error(videoInfo.error.message)
        }
      }
    })

    const mediaResponses = await Promise.all(mediaPromises)

    const mediaData = mediaResponses.map((response) => response.json())

    const media = await Promise.all(mediaData)

    return { ok: true, data: media }

  } catch (error) {
    console.log(error)
    return { error: "Error uploading the story to Facebook!" }
  }
}

export const publishFacebookStory = createSafeAction(FacebookStory, handler)
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

      const video = urls.filter((url) => url.type === "video")[0]

      const mediaPromises = urls.map((item) => {

        const formData = new FormData()
        formData.append("media_type", "STORIES")

        if (item.type === "image") {
          formData.append("image_url", item.source)
        } else {
          formData.append("upload_type", "resumable")
        }

        return fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `OAuth ${access_token}`
          }
        })
      })

      const mediaResponses = await Promise.all(mediaPromises)

      const mediaData = mediaResponses.map((response) => response.json())

      const media = await Promise.all(mediaData)

      if (video) {

        const uploadURI = media.find((container) => container.uri !== undefined).uri

        const uploadVideo = await fetch(uploadURI, {
          method: "POST",
          headers: {
            "Authorization": `OAuth ${access_token}`,
            "file_url": video.source
          }
        })

        const upload = await uploadVideo.json()

        if (!upload.success) {

          if (JSON.parse(upload.debug_info.message)?.error.message === "Video process failed with error: Unsupported format: The video format is not supported. Please check spec for supported frame_rate format") {
            return { error: "The video dimensions are wrong. Edit your video or upload another." }
          }

          if (JSON.parse(upload.debug_info.message)?.error.message === "Video process failed with error: Unsupported format: The video format is not supported. Please check spec for supported duration format") {
            return { error: "The video must be shorter than 60 seconds. Upload another video" }
          }

          throw new Error(upload.debug_info.message)
        }
      }

      const children = media.map((container) => container.id)

      const childrenPromises = children.map((id) => publishContainerId(data, id))

      const containersIds = await Promise.all(childrenPromises)

      return { ok: true, data: containersIds }

  } catch (error) {
    console.log(error)
    return { error: "Error uploading the story to Instagram!" }
  }
}

export const publishInstagramStory = createSafeAction(InstagramStory, handler)
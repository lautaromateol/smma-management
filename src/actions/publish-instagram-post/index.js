"use server"
import { auth } from "@clerk/nextjs/server";
import { InstagramPost } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { publishContainerId } from "@/lib/publish-container-id";

export async function handler(data) {
  const { userId, orgId } = auth()

  if (!userId || !orgId) return {
    error: "Unauthorized"
  }

  const { id, message, urls, access_token } = data

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

        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
          method: "POST",
          headers: {
            "Authorization": `OAuth ${access_token}`
          },
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

      const video = urls.filter((url) => url.type === "video")[0]

      const mediaPromises = urls.map((item) => {
        const formData = new FormData()
        formData.append("is_carousel_item", true)          
        
        if(item.type === "image") {
          formData.append("image_url", item.source)
        } else {
          formData.append("media_type", "VIDEO")
          formData.append("upload_type", "resumable")
        }
        
        return fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
          method: "POST",
          headers: {
            "Authorization": `OAuth ${access_token}`
          },
          body: formData
        })
      })

      const mediaResponses = await Promise.all(mediaPromises)

      const mediaData = mediaResponses.map((response) => response.json())

      const media = await Promise.all(mediaData)

      if(video) {
        
      const uploadURI = media.find((container) => container.uri !== undefined).uri

      const uploadVideo = await fetch(uploadURI, {
        method: "POST",
        headers: {
          "Authorization": `OAuth ${access_token}`,
          "file_url": video.source
        }
      })
      
      const upload = await uploadVideo.json()

      if(!upload.success) {

        if(JSON.parse(upload.debug_info.message)?.error.message === "Video process failed with error: Unsupported format: The video format is not supported. Please check spec for supported frame_rate format") {
          return { error: "The video dimensions are wrong. Edit your video or upload another." }
        }

        if(JSON.parse(upload.debug_info.message)?.error.message === "Video process failed with error: Unsupported format: The video format is not supported. Please check spec for supported duration format") {
          return { error: "The video must be shorter than 60 seconds. Upload another video" }
        }
        
        throw new Error(upload.debug_info.message)
      }
    }

      const children = media.map((container) => container.id)

      const formData = new FormData()

      formData.append("media_type", "CAROUSEL")
      formData.append("children", children)
      formData.append("caption", message)
      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${id}/media`, {
        method: "POST",
        headers: {
          "Authorization": `OAuth ${access_token}`,
        },
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

    const upload = await publishContainerId(data, creation_id)

    if (upload.id) {
      return { ok: true, id: upload.id }
    } else {
      console.log(upload.error)
      return { error: "Error uploading the post to Instagram!" }
    }
  } catch (error) {
    console.log(error)
    return { error: "Error uploading the post to Instagram!" }
  }
}

export const publishInstagramPost = createSafeAction(InstagramPost, handler)
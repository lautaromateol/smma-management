import { MediaPreview } from ".";
import { toast } from "sonner";
import { FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { fetcher } from "@/lib/fetcher";
import { getVideo } from "@/lib/is-video-ready";
import { cn } from "@/lib/utils";

export function UploadMedia({ form, fbPageId, accessToken, type, message, setInputs, inputs }) {

  const { previews, urls } = inputs

  async function uploadMedia(e) {
    const file = e.target.files[0]

    if (!file) return

    const formData = new FormData()

    formData.append("source", file)
    formData.append("access_token", accessToken)
    formData.append("published", false)
    if (!form.getValues()?.published) {
      formData.append("temporary", true)
    }

    const mimeType = file.type;

    if (mimeType.startsWith('image/')) {
      try {
        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/photos`,
          {
            method: "POST",
            body: formData
          })

        const data = await response.json()

        if (response.ok) {
          form.setValue("attached_media", [...inputs?.attached_media, { media_fbid: data.id, type: "image" }])

          const imagesData = await fetcher(`${FACEBOOK_API_GRAPH_URL}/${data.id}?fields=images&access_token=${accessToken}`)

          if (!imagesData.images) {
            console.log(imagesData)
            toast.error("There was an error uploading the image")
            return
          }

          const image = imagesData.images[0]
          const preview = imagesData.images.at(-1)
          const id = imagesData.id

          if (image) {
            image.id = id
            preview.id = id
          }

          const imagesEl = urls.find((img) => img.id === id)

          if (!imagesEl && image) {
            setInputs("previews", [...previews, preview])
            form.setValue("urls", [...urls, { source: image.source, type: "image", id: image.id }])
          }

          form.setValue("link", null)

        } else {
          console.log(data)
          toast.error("There was an error uploading the image")
        }
      } catch (error) {
        console.log(error)
        toast.error("There was an error uploading the image")
      }
    } else if (mimeType.startsWith('video/')) {

      try {
        const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/videos`,
          {
            method: "POST",
            body: formData
          })

        const data = await response.json()

        if (response.ok) {
          form.setValue("attached_media", [...inputs?.attached_media, { media_fbid: data.id, type: "video" }])
          form.setValue("link", null)

          const videoData = await getVideo(data.id, accessToken)

          if (!videoData) {
            toast.error("There was an error uploading the video")
            return
          }

          console.log(videoData)

          const image = videoData.thumbnails.data[0]
          const preview = videoData.thumbnails.data.at(-1)
          const source = videoData.source
          const id = videoData.id

          if (image) {
            image.id = id
            image.source = image.uri
            preview.id = id
            preview.source = preview.uri
          }

          const imagesEl = urls.find((img) => img.id === id)

          if (!imagesEl && image) {
            setInputs("previews", [...previews, preview])
            form.setValue("urls", [...urls, { source, type: "video", id }])
          }

        } else {
          console.log(data)
          toast.error("There was an error uploading the video")
        }
      } catch (error) {
        console.log(error)
        toast.error("There was an error uploading the video")
      }
    } else {
      toast.error("File type unsupported")
    }
  }

  return (
    <div className="bg-white space-y-2 p-4">
      <FormLabel className={cn(message && "text-destructive")}>Media</FormLabel>
      <p className="text-sm">{
        type === "story" ?
          "You can upload up to 10 images and videos."
          :
          "Share photos or a video. Instagram posts can't exceed 10 photos."
      }
      </p>
      <div className="space-y-4">
        <Input
          className={cn(urls.length === 1 && urls[0].type === "video" && "hidden")}
          type="file"
          onChange={uploadMedia}
        />
        <MediaPreview form={form} inputs={inputs} setInputs={setInputs} />
        <FormMessage>{message ? message : ""}</FormMessage>
      </div>
    </div>
  )
}

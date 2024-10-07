import { MediaPreview } from ".";
import { toast } from "sonner";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { useFormInputs } from "@/hooks/use-form-inputs";

export function UploadMedia({ form, fbPageId, accessToken }) {

  const { inputs } = useFormInputs((state) => state)

  const { attached_media } = inputs

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
          form.setValue("link", null)

        } else {
          toast.error("There was an error uploading the image")
        }
      } catch (error) {
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

        } else {
          toast.error("There was an error uploading the video")
        }
      } catch (error) {
        toast.error("There was an error uploading the video")
      }
    } else {
      toast.error("File type unsupported")
    }
  }

  return (
    <div className="bg-white space-y-2 p-4">
      <FormLabel>Media</FormLabel>
      <p className="text-sm">Share photos or a video. Instagram posts can&apos;t exceed 10 photos.</p>
      <div className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Upload photos. Videos not available yet.</p>
          <Input
            accept="image/*"
            type="file"
            onChange={uploadMedia}
          />
        </div>
        <MediaPreview form={form} attachedMedia={attached_media} accessToken={accessToken} />
      </div>
    </div>
  )
}

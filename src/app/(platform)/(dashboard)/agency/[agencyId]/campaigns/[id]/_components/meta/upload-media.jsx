import { MediaPreview } from ".";
import { toast } from "sonner";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";
import { useFormInputs } from "@/hooks/use-form-inputs";

export function UploadMedia({ form, fbPageId, accessToken }) {

  const { inputs } = useFormInputs((state) => state)

  const { attached_media } = inputs

  async function handleSelectImage(e) {
    const image = e.target.files[0]

    if(!image) return

    const formData = new FormData()

    formData.append("source", image)
    formData.append("access_token", accessToken)
    formData.append("published", false)
    if (!form.getValues()?.published) {
      formData.append("temporary", true)
    }

    try {
      const response = await fetch(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/photos`,
        {
          method: "POST",
          body: formData
        })

      const data = await response.json()

      if (response.ok) {
        form.setValue("attached_media", [...inputs?.attached_media, { media_fbid: data.id }])
        form.setValue("link", null)

      } else {
        toast.error("There was an error uploading the image")
        console.log(data.error.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("There was an error uploading the image")
    }
  }

  function handleSelectVideo(e) {
    setSelectedVideo(e.target.files[0])
  }

  return (
    <div className="bg-white space-y-2 p-4">
      <FormLabel>Media</FormLabel>
      <p className="text-sm">Share photos or a video. Instagram posts can&apos;t exceed 10 photos.</p>
      <div className="space-y-4">
        <div className="flex items-center gap-x-2 mt-2">
          <div className="space-y-1">
            <p className="text-sm font-medium">Add photo</p>
            <Input type="file" onChange={handleSelectImage} />
          </div>
          {/* <div className="space-y-1">
            <p className="text-sm font-medium">Add video</p>
            <Input type="file" onChange={handleSelectVideo} />
          </div> */}
        </div>
        <MediaPreview form={form} attachedMedia={attached_media} accessToken={accessToken} />
      </div>
    </div>
  )
}

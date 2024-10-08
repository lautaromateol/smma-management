"use client"
import Image from "next/image"
import { useFormInputs } from "@/hooks/use-form-inputs"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export function MediaElement({ id, source, form }) {

  const { inputs, setInputs } = useFormInputs((state) => state)

  const { attached_media, images, previews, urls } = inputs

  //  `${FACEBOOK_API_GRAPH_URL}/${id}?fields=thumbnails&access_token=${accessToken}`

  function deleteMedia() {
    const newAttachedMedia = attached_media.filter(({ media_fbid }) => media_fbid !== id)
    const newImages = images.filter((image) => image.id !== id)
    const newPreviews = previews.filter((image) => image.id !== id)
    const newUrls = urls.filter((image) => image.id !== id)

    form.setValue("attached_media", newAttachedMedia)
    form.setValue("urls", newUrls)
    setInputs("images", newImages)
    setInputs("previews", newPreviews)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="relative size-[80px]">
        <Image
          fill
          alt="Media preview"
          src={source}
          className="object-cover"
        />
      </div>
      <Button
        type="button"
        onClick={deleteMedia}
        variant="ghost"
      >
        <Trash className="size-4 font-normal" />
      </Button>
    </div>
  )
}

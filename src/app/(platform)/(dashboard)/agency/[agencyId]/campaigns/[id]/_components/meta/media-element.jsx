"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export function MediaElement({ id, source, form, setInputs, inputs }) {

  const { attached_media, previews, urls } = inputs

  function deleteMedia() {
    const newAttachedMedia = attached_media?.filter(({ media_fbid }) => media_fbid !== id)
    const newPreviews = previews.filter((image) => image.id !== id)
    const newUrls = urls.filter((image) => image.id !== id)

    form.setValue("attached_media", newAttachedMedia)
    form.setValue("urls", newUrls)
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

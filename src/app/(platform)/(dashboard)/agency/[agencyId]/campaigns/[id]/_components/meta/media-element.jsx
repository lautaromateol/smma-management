"use client"
import Image from "next/image"
import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useFormInputs } from "@/hooks/use-form-inputs"
import { fetcher } from "@/lib/fetcher"
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"

export function MediaElement({ id, type, accessToken, form }) {

  const { inputs, setInputs } = useFormInputs((state) => state)

  const { attached_media, images, previews } = inputs

  const url = type === "image"
    ? `${FACEBOOK_API_GRAPH_URL}/${id}?fields=images&access_token=${accessToken}`
    : `${FACEBOOK_API_GRAPH_URL}/${id}?fields=thumbnails&access_token=${accessToken}`

  const { data, isPending } = useQuery({
    queryKey: [`${type}-data`, id],
    queryFn: () => fetcher(url),
    refetchInterval: (data) => {
      if (data?.thumbnails || data?.images) return false;
      return 3000;
    },
  });


  function deleteMedia() {
    const newAttachedMedia = attached_media.filter(({ media_fbid }) => media_fbid !== id)
    const newImages = images.filter((image) => image.id !== id)

    form.setValue("attached_media", newAttachedMedia)
    setInputs("images", newImages)
  }

  useEffect(() => {
    if (!data) return;

    if (type === "image" && data.images) {
      const image = data.images[0]
      const preview = data.images.find((img) => img.height >= 100)

      if (image) {
        image.id = id
        preview.id = id
      }

      const imagesEl = images.find((img) => img.id === id)

      if (!imagesEl && image) {
        setInputs("images", [...images, image])
        setInputs("previews", [...previews, preview])
      }
    } else if (type === "video" && data.thumbnails) {
      const image = data.thumbnails.data[0]
      const preview = data.thumbnails.data.find((img) => img.height >= 800)

      if (image) {
        image.id = id
        image.source = image.uri
        preview.id = id
        preview.source = preview.uri
      }

      const imagesEl = images.find((img) => img.id === id)

      if (!imagesEl && image) {
        setInputs("images", [...images, image])
        setInputs("previews", [...previews, preview])
      }
    }
  }, [data, type, id, images, previews, setInputs])

  if (isPending) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton className="size-[80px]" />
        <Skeleton className="size-8" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div className="relative size-[80px]">
        <Image
          fill
          alt="Media preview"
          src={previews?.find((preview) => preview.id === id)?.source}
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

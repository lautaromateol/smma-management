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

export function MediaElement({ id, accessToken, form }) {

  const { inputs, setInputs } = useFormInputs((state) => state)

  const { attached_media, images } = inputs

  const { data, isPending } = useQuery({
    queryKey: ["media-data", id],
    queryFn: () => fetcher(`${FACEBOOK_API_GRAPH_URL}/${id}?fields=images&access_token=${accessToken}`),
  })

  function deleteImage() {
    const newAttachedMedia = attached_media.filter(({media_fbid}) => media_fbid !== id)
    const newImages = images.filter((image) => image.id !== id)

    form.setValue("attached_media", newAttachedMedia)
    setInputs("images", newImages)
  }


  useEffect(() => {
    if (data && data.images) {
      const image = data.images.find((img) => img.height >= 800 && img.height <= 1200);

      image.id = id

      const imagesEl = images.find((img) => img.id === id)

      if (image && imagesEl) return

      setInputs("images", [...images, image]);
    }
  }, [data, images, setInputs, id]);


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
          src={data.images.find((img) => img.height >= 100 && img.height <= 200).source}
          className="object-cover"
        />
      </div>
      <Button
        type="button"
        onClick={deleteImage}
        variant="ghost"
      >
        <Trash className="size-4 font-normal" />
      </Button>
    </div>
  )
}
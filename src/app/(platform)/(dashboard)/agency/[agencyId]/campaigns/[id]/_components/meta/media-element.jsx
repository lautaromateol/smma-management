import { Skeleton } from "@/components/ui/skeleton"
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { fetcher } from "@/lib/fetcher"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"

export function MediaElement({ id, accessToken }) {

  const { data, isPending } = useQuery({
    queryKey: ["media-data", id],
    queryFn: () => fetcher(`${FACEBOOK_API_GRAPH_URL}/${id}?fields=images&access_token=${accessToken}`)
  })

  if (isPending) {
    return (
      <div className="flex items-center justify-between">
        <Skeleton className="size-[80px]" />
        <div className="flex items-center gap-x-2">
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
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
      <div className="flex items-center gap-x-2">
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
        <Skeleton className="size-8" />
      </div>
    </div>
  )
}
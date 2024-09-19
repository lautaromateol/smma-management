import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { FaEarthAmericas } from "react-icons/fa6";
import { ImageIcon, MessageSquare, Share2, ThumbsUp } from "lucide-react";
import { useFormInputs } from "@/hooks/use-form-inputs";
import { cn } from "@/lib/utils";

export function PostPreview({ data }) {

  const { fbPictureUrl, fbPageName } = data

  const { inputs } = useFormInputs((state) => state)

  const { message, images, link } = inputs

  console.log(images)

  return (
    <div className="w-full h-auto">
      <div className="h-28 bg-white p-4 space-y-2.5">
        <div className="flex items-center gap-x-4">
          <div className="rounded-full size-10 relative">
            <Image
              src={fbPictureUrl}
              className="rounded-full object-cover border border-gray-400"
              alt="Facebook page profile picture"
              fill
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">
              {fbPageName}
            </p>
            <div className="flex items-center gap-x-1">
              <p className="text-xs text-muted-foreground">Just now</p>
              <FaEarthAmericas className="size-2 text-muted-foreground" />
            </div>
          </div>
        </div>
        {message ?
          <p className="text-base">{message}</p>
          :
          <div className="flex flex-col gap-y-1">
            <Skeleton className="w-4/5 rounded-full h-2.5" />
            <Skeleton className="w-1/4 rounded-full h-2.5" />
          </div>
        }
      </div>
      {!images.length > 0 && !message && (
        <div className="h-72 bg-neutral-100 flex items-center justify-center">
          <ImageIcon className="size-44 text-neutral-200 font-light" />
        </div>
      )}
      {images?.length > 0 && (
        <div className={cn(
          "h-72 grid",
          images.length <= 3 ? `grid-cols-${images.length.toString()}` : "grid-cols-2"
        )}>
          {images.slice(0, 4).map((img, i) => (
            <div key={img.source} className="relative w-full h-auto">
              <Image
                src={img.source}
                className="object-cover"
                alt={`Media element ${i}`}
                fill
              />
              {i === 3 && images.length > 4 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    +{images.length - 4}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {link && (
        <div className="p-4 bg-neutral-100">
          <p className="text-muted-foreground text-sm uppercase">{link}</p>
        </div>
      )}
      <div className="h-14 bg-white p-4 flex items-center justify-center gap-x-2 text-gray-400">
        <div className="flex items-center gap-x-2">
          <ThumbsUp className="size-4" />
          <p className="text-sm">Like</p>
        </div>
        <div className="flex items-center gap-x-2">
          <MessageSquare className="size-4" />
          <p className="text-sm">Comment</p>
        </div>
        <div className="flex items-center gap-x-2">
          <Share2 className="size-4" />
          <p className="text-sm">Share</p>
        </div>
      </div>
    </div>
  )
}

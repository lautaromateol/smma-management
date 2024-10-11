import { cn } from "@/lib/utils";
import Image from "next/image";

export function Images({ images }) {
  return (
    <div className={cn(
      "h-96 relative overflow-hidden grid",
      images.length <= 3 ? `grid-cols-${images.length.toString()}` : "grid-cols-2"
    )}>
      {images.slice(0, 4).map((media, i) => (
        <div key={media.source} className={cn(
          "w-full h-96 flex-shrink-0 relative",
          media.type === "video" && "flex items-center justify-center"
        )}>
          {media.type === "image" ? <Image
            src={media.source}
            alt={`Media element ${i}`}
            layout="fill"
            objectFit="cover"
          />
            :
            <video className="w-auto h-auto max-w-full max-h-full" controls>
              <source src={media.source} type="video/mp4" />
              Your browser don&apos;t support video reproduction.
            </video>
          }
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
  )
}

import { cn } from "@/lib/utils";
import Image from "next/image";

export function Images({ images }) {
  return (
    <div className={cn(
      "h-96 relative overflow-hidden grid",
      images.length <= 3 ? `grid-cols-${images.length.toString()}` : "grid-cols-2"
    )}>
      {images.slice(0, 4).map((img, i) => (
        <div key={img.source} className="w-full h-96 flex-shrink-0 relative">
          <Image
            src={img.source}
            alt={`Media element ${i}`}
            layout="fill"
            objectFit="cover"
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
  )
}

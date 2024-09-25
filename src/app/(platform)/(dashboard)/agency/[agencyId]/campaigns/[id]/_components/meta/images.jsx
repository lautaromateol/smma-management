import { cn } from "@/lib/utils";
import Image from "next/image";

export function Images({ images }) {
  return (
    <div className={cn(
      "h-96 grid",
      images.length <= 3 ? `grid-cols-${images.length.toString()}` : "grid-cols-2"
    )}>
      {images.slice(0, 4).map((img, i) => (
        <div key={img.source} className="relative w-full h-auto">
          <Image
            src={img.source}
            className="object-center"
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
  )
}

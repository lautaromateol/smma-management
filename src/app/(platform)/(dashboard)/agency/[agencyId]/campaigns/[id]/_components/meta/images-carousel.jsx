"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImagesCarousel({ images }) {

  const [index, setIndex] = useState(0)

  function handleNext() {
    setIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1)
  }

  function handlePrev() {
    setIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
  }

  return (
    <div className="h-96 relative overflow-hidden bg-neutral-100">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((media, i) => (
          <div key={i} className={cn(
            "w-full h-96 flex-shrink-0 relative",
            media.type === "video" && "flex items-center justify-center"
          )}>
            {media.type === "image" ?
              <Image
                src={media.source}
                layout="fill"
                objectFit="cover"
                alt={`Carousel image ${i + 1}`}
              />
              :
              <video className="w-auto h-auto max-w-full max-h-full" controls>
                <source src={media.source} type="video/mp4" />
                Your browser don&apos;t support video reproduction.
              </video>
            }
          </div>
        ))}
      </div>

      {images.length > 1 &&
        <>
          <div className="absolute flex items-center justify-center gap-x-0.5 bottom-2 inset-x-0">
            {images.map((_, i) => (
              <div className={cn(
                "size-1.5 rounded-full",
                i === index ? "bg-blue-600" : "bg-neutral-400"
              )} key={i} />
            ))}
          </div>
          <div
            onClick={handlePrev}
            role="button"
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
          >
            <ChevronLeft className="font-semibold text-white text-border size-12" />
          </div>
          <div
            onClick={handleNext}
            role="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          >
            <ChevronRight className="font-semibold text-white text-border size-12" />
          </div>
        </>
      }
    </div>
  )
}
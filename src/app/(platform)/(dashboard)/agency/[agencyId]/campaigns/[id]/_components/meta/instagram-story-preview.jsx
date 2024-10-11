"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function InstagramStoryPreview({ images, data }) {

  const { igPictureUrl, igPageName } = data

  const [index, setIndex] = useState(0)

  function handleNext() {
    setIndex((prevIndex) => prevIndex === images.length - 1 ? 0 : prevIndex + 1)
  }

  function handlePrev() {
    setIndex((prevIndex) => prevIndex === 0 ? images.length - 1 : prevIndex - 1)
  }

  return (
    <div className="min-h-[500px] flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-4 left-4 flex items-center z-50">
        <div className="flex items-center gap-x-2">
          <div className="rounded-full size-6 relative">
            <Image
              src={igPictureUrl}
              className="rounded-full object-cover border border-gray-400"
              alt="Instagram page profile picture"
              fill
            />
          </div>
          <p className="text-sm font-semibold text-white text-border">
            {igPageName}
          </p>
        </div>
      </div>
      <div className="flex h-[400px] transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {images.map((media, i) => (
          <div key={i} className="w-full flex-shrink-0 relative z-10">
            {media.type === "image" ?
              <Image
                src={media.source}
                fill
                className="object-cover"
                alt={`Carousel image ${i + 1}`}
              />
              :
              <video className="w-auto h-auto max-w-full max-h-full" controls>
                <source src={media.source} type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
              </video>
            }
          </div>
        ))}
      </div>

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
    </div>
  )
}

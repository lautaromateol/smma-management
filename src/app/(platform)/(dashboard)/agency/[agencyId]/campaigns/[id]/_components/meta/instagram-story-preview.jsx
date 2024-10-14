"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

export function InstagramStoryPreview({ images, data }) {
  const { igPictureUrl, igPageName } = data;
  const [index, setIndex] = useState(0);

  function handleNext() {
    setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  }

  function handlePrev() {
    setIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  }

  return (
    <>
      {
        images.length ?
          <div className="min-h-[500px] flex items-center justify-center relative overflow-hidden bg-black">
            <div className="absolute top-4 left-4 flex items-center z-50 gap-x-2">
              <div className="w-8 h-8 relative">
                <Image
                  src={igPictureUrl}
                  className="rounded-full object-cover border border-gray-400"
                  alt="Instagram page profile picture"
                  fill
                />
              </div>
              <p className="text-sm font-semibold text-white">{igPageName}</p>
            </div>

            <div className="relative w-full h-[400px] flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}>
              {images.map((media, i) => (
                <div key={i} className="w-full flex-shrink-0 relative">
                  {media.type === "image" ? (
                    <Image
                      src={media.source}
                      alt={`Carousel image ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <video className="w-full h-full object-cover" controls>
                      <source src={media.source} type="video/mp4" />
                      Tu navegador no soporta la reproducción de videos.
                    </video>
                  )}
                </div>
              ))}
            </div>

            <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-x-1">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`size-2 rounded-full ${i === index ? "bg-blue-600" : "bg-neutral-400"}`}
                />
              ))}
            </div>

            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          :
          <div className="h-96 flex flex-col items-center justify-center">
            <ImageIcon className="size-44 text-neutral-200 font-light" />
            <p className="text-sm font-medium">Upload an image or video to see the story preview.</p>
          </div>
      }
    </>
  );
}

import Image from "next/image";
import { useState } from "react";

export function ImagesCarousel({ images }) {

  const [index, setIndex] = useState(0)

  return (
    <div className="h-96 relative">
      <Image 
        src={images[index]}
        className="object-cover"
        alt="Carousel image"
        fill
      />
      <div className="absolute flex items-center justify-center bottom-5 inset-x-0">
        {images.map((_, i) => (
          <div key={i}>

          </div>
        ))}
      </div>
    </div>
  )
}
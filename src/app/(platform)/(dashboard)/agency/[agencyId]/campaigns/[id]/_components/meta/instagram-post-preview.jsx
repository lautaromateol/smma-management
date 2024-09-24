import Image from "next/image";
import { Bookmark, Heart, ImageIcon, MessageCircle, Send } from "lucide-react";
import { useFormInputs } from "@/hooks/use-form-inputs";
import { cn } from "@/lib/utils";

export function InstagramPostPreview({ data }) {

  const { igPictureUrl, igPageName } = data

  const { inputs: { images } } = useFormInputs((state) => state)

  return (
    <div className="w-full h-auto">
      <div className="flex items-center justify-start h-10 bg-white p-4">
        <div className="flex items-center gap-x-2">
          <div className="rounded-full size-6 relative">
            <Image
              src={igPictureUrl}
              className="rounded-full object-cover border border-gray-400"
              alt="Instagram page profile picture"
              fill
            />
          </div>
          <p className="text-sm font-semibold">
            {igPageName}
          </p>
        </div>
      </div>
      {!images.length > 0 && (
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
      )}
      <div className="h-10 bg-white p-4 flex items-center justify-start gap-x-2">
        <Heart className="size-4 font-semibold" />
        <MessageCircle className="size-4 font-semibold" />
        <Send className="size-4 font-semibold" />
        <Bookmark className="size-4 font-semibold ml-auto" />
      </div>
    </div>
  )
}
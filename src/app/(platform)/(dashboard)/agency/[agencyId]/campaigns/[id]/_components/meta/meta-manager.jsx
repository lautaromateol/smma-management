import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileVideo, Megaphone, PlusCircle } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { MetaAddPostButton } from ".";

export function MetaManager({ data: { name, fbPictureUrl, igPictureUrl, fbFollowers, igFollowers } }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <div className="relative w-32 h-32">
            <div className="absolute w-20 h-20 rounded-full -left-4 z-10">
              <Image
                src={fbPictureUrl}
                fill
                alt="Facebook picture"
                className="object-cover border-2 border-white"
              />
            </div>
            <div className="absolute w-20 h-20 rounded-full left-8">
              <Image
                src={igPictureUrl}
                fill
                alt="Instagram picture"
                className="object-cover border-2 border-white" />
            </div>
          </div>
          <p className="font-semibold text-base">{name}</p>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="space-y-1">
            <p className="font-medium flex items-center gap-x-2">
              <FaFacebook className="size-4" />
              Followers
            </p>
            <p><strong>{fbFollowers}</strong></p>
          </div>
          <div className="space-y-1">
            <p className="font-medium flex items-center gap-x-2">
              <FaInstagram className="size-4" />
              Followers
            </p>
            <p><strong>{igFollowers}</strong></p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-x-2">
        <MetaAddPostButton />
        <Button
          className="flex items-center font-medium gap-x-2"
          variant="outline"
        >
          Create Ad
          <Megaphone className="size-4" />
        </Button>
        <Button
          className="flex items-center font-medium gap-x-2"
          variant="outline"
        >
          Create Reel
          <FileVideo className="size-4" />
        </Button>
        <Button
          className="flex items-center font-medium gap-x-2"
          variant="outline"
        >
          Create Story
          <PlusCircle className="size-4" />
        </Button>
      </div>
    </div>
  )
}

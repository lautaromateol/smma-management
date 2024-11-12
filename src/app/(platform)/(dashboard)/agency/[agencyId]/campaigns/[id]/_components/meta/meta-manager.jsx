import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { EditFacebookProfile, EditInstagramProfile, MetaAddPostButton, MetaCreateAdButton, MetaCreateStoryButton } from ".";

export function MetaManager({ data }) {

  const { fbPageName, fbPictureUrl, igPictureUrl, fbFollowers, igFollowers } = data

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex flex-col md:flex-row items-center gap-x-2">
          <div className="relative w-32 h-32">
            <div className="absolute w-20 h-20 rounded-full bg-white -left-4 z-10">
              <Image
                src={fbPictureUrl}
                fill
                alt="Facebook picture"
                className="object-cover rounded-full border-2 border-gray-200"
              />
              <div className="bg-white rounded-full absolute bottom-0 right-0 grid place-content-center p-1">
                <FaFacebook className="text-blue-500" />
              </div>
            </div>
            <div className="absolute w-20 h-20 rounded-full left-8">
              <Image
                src={igPictureUrl}
                fill
                alt="Instagram picture"
                className="object-cover rounded-full border-2 border-gray-200"
              />
              <div className="bg-white rounded-full absolute bottom-0 right-0 grid place-content-center p-1">
                <FaInstagram className="text-pink-600" />
              </div>
            </div>
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-lg text-center md:text-left">{fbPageName}</p>
            <div className="flex items-center gap-x-1">
              <EditFacebookProfile data={data} />
              <span className="text-sm text-main">|</span>
              <EditInstagramProfile data={data} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="space-y-0.5">
            <p className="text-sm text-muted-foreground">
              Facebook followers
            </p>
            <div className="flex items-center gap-x-1">
              <FaFacebook className="text-blue-500" />
              <p className="font-medium">{fbFollowers}</p>
            </div>
          </div>
          <Separator orientation="vertical" />
          <div className="space-y-0.5">
            <p className="text-sm text-muted-foreground">
              Instagram followers
            </p>
            <div className="flex items-center gap-x-1">
              <FaInstagram className="text-pink-600" />
              <p className="font-medium">{igFollowers}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        <MetaAddPostButton data={data} />
        <MetaCreateStoryButton data={data} />
        <MetaCreateAdButton data={data} />
      </div>
    </div>
  )
}

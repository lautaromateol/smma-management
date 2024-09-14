import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { MetaManager } from ".";

export async function MetaPage({ page: { id, name }, accessToken }) {
  
  const facebookPageData = await fetcher(`https://graph.facebook.com/v20.0/${id}?access_token=${accessToken}&fields=instagram_business_account,picture,followers_count`)

  const instagramPageID = facebookPageData.instagram_business_account.id

  const instagramPageData = await fetcher(`https://graph.facebook.com/v20.0/${instagramPageID}?access_token=${accessToken}&fields=profile_picture_url,followers_count`)

  const { picture: fbPicture, followers_count: fbFollowers } = facebookPageData

  const fbPictureUrl = fbPicture.data.is_silhouette ? "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png" : fbPicture.data.url

  const { profile_picture_url: igPictureUrl, followers_count: igFollowers } = instagramPageData

  const data = {
    name,
    fbPictureUrl,
    fbFollowers,
    igPictureUrl,
    igFollowers
  }

  return (
   <MetaManager data={data} />
  )
}

MetaPage.Skeleton = function MetaPageSkeleton() {
  return (
    <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <div className="relative w-32 h-32">
          <Skeleton className="absolute w-20 h-20 rounded-full -left-4 z-10" />
          <Skeleton className="absolute w-20 h-20 rounded-full left-8" />
        </div>
        <Skeleton className="w-32 h-6" />
      </div>
      <div className="flex items-center gap-x-4">
        <div className="space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-12 h-6" />
        </div>
        <div className="space-y-1">
          <Skeleton className="w-24 h-4" />
          <Skeleton className="w-12 h-6" />
        </div>
      </div>
    </div>
    <div className="grid grid-cols-6 gap-x-2">
      <Skeleton className="h-10 col-span-3" />
      <Skeleton className="h-10 col-span-1" />
      <Skeleton className="h-10 col-span-1" />
      <Skeleton className="h-10 col-span-1" />
    </div>
  </div>
  )
}
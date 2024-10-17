import { fetcher } from "@/lib/fetcher";
import { Skeleton } from "@/components/ui/skeleton";
import { MetaManager, MetaPosts } from ".";
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook";

export async function MetaPage({ page: { id: fbPageId, name: fbPageName, access_token: pageAccessToken }, accessToken }) {

  const facebookPageData = await fetcher(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}?access_token=${accessToken}&fields=instagram_business_account,picture,followers_count,about,cover,category,phone,emails,location,website`)

  const igPageId = facebookPageData.instagram_business_account.id

  const instagramPageData = await fetcher(`${FACEBOOK_API_GRAPH_URL}/${igPageId}?access_token=${accessToken}&fields=profile_picture_url,followers_count,username,biography,website`)

  const { picture: fbPicture, followers_count: fbFollowers, about: fbAbout, category: fbCategory, emails: fbEmails, website: fbWebsite, phone: fbPhone, location: fbLocation } = facebookPageData

  const fbPictureUrl = fbPicture.data.is_silhouette ? "https://upload.wikimedia.org/wikipedia/commons/0/09/Man_Silhouette.png" : fbPicture.data.url

  const { username: igPageName, profile_picture_url: igPictureUrl, followers_count: igFollowers, biography: igBiography, website: igWebsite } = instagramPageData

  const data = {
    fbPageId,
    igPageId,
    fbPageName,
    igPageName,
    fbPhone,
    fbWebsite,
    igWebsite,
    fbLocation,
    fbEmails,
    fbCategory,
    fbAbout,
    igBiography,
    fbPictureUrl,
    fbFollowers,
    igPictureUrl,
    igFollowers,
    pageAccessToken,
    userAccessToken: accessToken
  }

  return (
    <div className="space-y-4">
      <MetaManager data={data} />
      <MetaPosts data={data} />
    </div>
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
        <Skeleton className="h-10 col-span-2" />
        <Skeleton className="h-10 col-span-2" />
        <Skeleton className="h-10 col-span-2" />
      </div>
    </div>
  )
}
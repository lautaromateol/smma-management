"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FACEBOOK_CLIENT_ID, FACEBOOK_REDIRECT_URI } from "@/constants/facebook";
import { fetcher } from "@/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { FaMeta, FaFacebook } from "react-icons/fa6";
import { isAfter } from "date-fns";

export function MetaButton({ client }) {

  function onClick() {
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&state="{id=${client.id},agencyId=${client.orgId}}"&scope=instagram_basic,instagram_content_publish,instagram_manage_insights,pages_manage_posts,pages_read_engagement,ads_management,ads_read,business_management,public_profile`
  }

  const { data, isPending } = useQuery({
    queryKey: ["client-meta-data", client.id],
    queryFn: () => fetcher(`/api/clients/meta-data?token=${client.metaAccessToken.token}&client_id=${client.id}`)
  })

  const isTokenExpired = client.metaAccessToken ? isAfter(new Date(), new Date(client.metaAccessToken.expiresIn)) : false

  if (isPending && client.metaAccessToken) {
    return (
      <Skeleton className="h-20" />
    )
  }

  if (!client.metaAccessToken || isTokenExpired) {
    return (
      <div className="flex flex-col gap-y-2">
        {isTokenExpired &&
          <div className="bg-red-200 text-destructive border border-destructive p-2 font-medium text-sm rounded-md">
            The Meta access token for this account is expired. Please authenticate again.
          </div>
        }
        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="flex items-center gap-x-2">
            <FaMeta className="size-4" />
            <p className="text-sm font-medium">Meta</p>
          </div>
          <Button
            onClick={onClick}
            variant="outline"
            size="sm"
          >
            Link
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between border p-4 rounded-md">
      <div className="flex items-center gap-x-2">
        <Image
          src={data.image}
          width={40}
          height={40}
          className="rounded-full"
          alt="User Meta profile picture"
        />
        <p className="font-medium text-base text-neutral-700">{data.name}</p>
      </div>
      <FaFacebook className="size-4" />
    </div>
  )
}
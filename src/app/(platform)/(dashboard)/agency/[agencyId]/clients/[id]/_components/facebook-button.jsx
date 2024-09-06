"use client"
import { Button } from "@/components/ui/button";
import { FACEBOOK_CLIENT_ID, FACEBOOK_REDIRECT_URI } from "@/constants/facebook";
import { auth } from "@clerk/nextjs/server";
import { Facebook } from "lucide-react";

export function FacebookButton({ id }) {

  const { orgId } = auth()

  function onClick() {
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&state="{id=${id},agencyId=${orgId}}"&scope=instagram_basic,instagram_content_publish,instagram_manage_insights,pages_manage_posts,pages_read_engagement,ads_management,ads_read,business_management,public_profile`
  }
  
  return (
    <div className="flex items-center justify-between border p-4 rounded-md">
      <div className="flex items-center gap-x-2">
        <Facebook className="size-4" />
        <p className="text-sm font-medium">Facebook</p>
      </div>
      <Button
        onClick={onClick}
        variant="outline"
        size="sm"
      >
        Link
      </Button>
    </div>
  )
}

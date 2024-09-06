"use client"
import { Button } from "@/components/ui/button";
import { FACEBOOK_CLIENT_ID, FACEBOOK_REDIRECT_URI } from "@/constants/facebook";
import { Facebook } from "lucide-react";

export function FacebookButton({ id }) {

  function onClick() {
    window.location.href = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${FACEBOOK_REDIRECT_URI}&state="{id=${id}}"&scope=pages_manage_posts,ads_management,instagram_basic,ads_read`
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

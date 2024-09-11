"use client"
import { Button } from "@/components/ui/button";
import { FaLinkedin } from "react-icons/fa6";
import { LINKEDIN_CLIENT_ID, LINKEDIN_REDIRECT_URI } from "@/constants/linkedin"

export function LinkedInButton({ client }) {

  function onClick() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${LINKEDIN_REDIRECT_URI}&scope=w_member_social&state="{id=${client.id},agencyId=${client.orgId}}"`
  }

  return (
    <div className="flex items-center justify-between border p-4 rounded-md">
      <div className="flex items-center gap-x-2">
        <FaLinkedin className="size-4" />
        <p className="text-sm font-medium">LinkedIn</p>
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

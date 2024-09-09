import { Linkedin, Twitter } from "lucide-react";
import { CardWrapper } from "../../../_components";
import { Button } from "@/components/ui/button";
import { MetaButton } from ".";

export async function SocialAccountsLink({ client }) {

  return (
    <CardWrapper
      title="Social media accounts"
      description="Link your client's social media accounts to start working on your campaigns"
      className="border-none"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-1/2">
       <MetaButton client={client} />
        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="flex items-center gap-x-2">
            <Twitter className="size-4" />
            <p className="text-sm font-medium">X</p>
          </div>
          <Button
            variant="outline"
            size="sm"
          >
            Link
          </Button>
        </div>
        <div className="flex items-center justify-between border p-4 rounded-md">
          <div className="flex items-center gap-x-2">
            <Linkedin className="size-4" />
            <p className="text-sm font-medium">LinkedIn</p>
          </div>
          <Button
            variant="outline"
            size="sm"
          >
            Link
          </Button>
        </div>
      </div>
    </CardWrapper>
  )
}

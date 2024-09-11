import { CardWrapper } from "../../../_components";
import { LinkedInButton, MetaButton, TwitterButton } from ".";

export async function SocialAccountsLink({ client }) {

  return (
    <CardWrapper
      title="Social media accounts"
      description="Link your client's social media accounts to start working on your campaigns"
      className="border-none"
    >
      <div className="space-y-4">
        <MetaButton client={client} />
        <TwitterButton client={client} />
        <LinkedInButton client={client} />
      </div>
    </CardWrapper>
  )
}

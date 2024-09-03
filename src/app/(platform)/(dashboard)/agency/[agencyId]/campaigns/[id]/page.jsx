import { Heading } from "@/app/(platform)/(dashboard)/_components/heading"
import { prisma } from "@/lib/prisma"
import { BudgetDistribution, CampaignDescription, CampaignPageButtons, CampaignStats, SocialMediaPosts } from "./_components"

export default async function CampaignPage({ params: { id } }) {

  const campaign = await prisma.campaign.findUnique({
    where: {
      id
    },
    include: {
      client: {
        select: {
          name: true
        }
      }
    }
  })

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <div className="flex items-center justify-between">
          <Heading
            title={`${campaign.client.name}'s campaign`}
          />
          <CampaignPageButtons />
        </div>
        <CampaignDescription campaign={campaign} />
      </header>
      {/* <SocialMediaPosts />
      <div className="grid grid-cols-4">
        <BudgetDistribution />
        <CampaignStats />
      </div> */}
    </div>
  )
}

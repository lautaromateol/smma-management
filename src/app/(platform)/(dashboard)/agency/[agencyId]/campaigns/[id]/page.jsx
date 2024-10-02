import { CampaignDescription, MetaSection } from "./_components"
import { Heading } from "../../_components"
import { prisma } from "@/lib/prisma"
import { fetcher } from "@/lib/fetcher"
import { notFound } from "next/navigation"

export default async function CampaignPage({ params: { id } }) {

  const campaign = await prisma.campaign.findUnique({
    where: {
      id
    },
    include: {
      client: {
        select: {
          name: true,
          metaAccessToken: true
        }
      }
    }
  })

  if(!campaign.client) notFound()

  let metaPages
  if (campaign.client.metaAccessToken && campaign.platforms.includes("META")) {
    metaPages = campaign.platforms.includes("META") ? await fetcher(`https://graph.facebook.com/v20.0/me/accounts?access_token=${campaign.client.metaAccessToken.token}`) : null
  }


  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <Heading
          title={`${campaign.client.name}'s campaign`}
        />
        <CampaignDescription campaign={campaign} />
      </header>
      {metaPages?.data?.length > 0 && <MetaSection accessToken={campaign.client.metaAccessToken.token} pages={metaPages.data} />}
    </section>
  )
}

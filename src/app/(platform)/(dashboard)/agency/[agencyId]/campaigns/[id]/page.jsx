import { CampaignDescription, MetaSection } from "./_components"
import { Heading } from "../../_components"
import { prisma } from "@/lib/prisma"
import { fetcher } from "@/lib/fetcher"
import { notFound } from "next/navigation"
import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"

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
  if (campaign.client.metaAccessToken && campaign.platform === "META") {
    metaPages = campaign.platform === "META" ? await fetcher(`${FACEBOOK_API_GRAPH_URL}/me/accounts?access_token=${campaign.client.metaAccessToken.token}`) : null
  }


  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <Heading
          title={`${campaign.client.name} - ${campaign.name}`}
        />
        <CampaignDescription campaign={campaign} />
      </header>
      {metaPages?.data?.length > 0 && <MetaSection campaign={campaign} accessToken={campaign.client.metaAccessToken.token} pages={metaPages.data} />}
    </section>
  )
}

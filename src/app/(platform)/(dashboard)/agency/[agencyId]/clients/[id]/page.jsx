import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { ClientInfo, SocialAccountsLink } from "./_components"
import { DataTable, Heading } from "../../_components"
import { clientCampaignColumns } from "./columns"

export default async function ClientPage({ params: { id } }) {

  const { orgId } = auth()

  const client = await prisma.client.findUnique({
    where: { id, orgId }
  })

  const campaigns = await prisma.campaign.findMany({
    where: {
      clientId: client.id,
      orgId
    }
  })

  return (
    <section className="space-y-8">
      <header className="space-y-4">
        <Heading
          title={client.name}
          subtitle="Review your client's information, link social media accounts and more."
        />
        <ClientInfo client={client} />
      </header>
      <DataTable
        columns={clientCampaignColumns}
        data={campaigns}
        title={`${client.name} campaigns`}
      />
      <SocialAccountsLink />
    </section>
  )
}

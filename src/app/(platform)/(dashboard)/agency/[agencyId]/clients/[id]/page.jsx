import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { ClientContracts, ClientInfo, SocialAccountsLink, Timeline } from "./_components"
import { DataTable, Heading } from "../../_components"
import { clientCampaignColumns } from "./columns"

export default async function ClientPage({ params: { id } }) {

  const { orgId } = auth()

  const client = await prisma.client.findUnique({
    where: { id, orgId },
    include: {
      contracts: true,
      metaAccessToken: true,
      twitterAccessToken: true
    }
  })

  const campaigns = await prisma.campaign.findMany({
    where: {
      clientId: client.id,
      orgId
    }
  })

  const activityLogs = await prisma.activityLog.findMany({
    where: {
      entityId: client.id,
      orgId
    },
    orderBy: {
      createdAt: "desc"
    },
    take: 4
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <SocialAccountsLink client={client} />
        <ClientContracts id={client.id} contracts={client.contracts} />
      </div>
      <Timeline activities={activityLogs} />
    </section>
  )
}

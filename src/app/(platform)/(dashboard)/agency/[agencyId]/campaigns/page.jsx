import { prisma } from "@/lib/prisma";
import { Heading } from "../../../_components/heading";
import { CampaignButtons } from "./_components";
import { auth } from "@clerk/nextjs/server";
import { DataTable } from "../_components/data-table";
import { columns } from "./columns";

export default async function CampaignsPage() {

  const { orgId } = auth()

  const campaigns = await prisma.campaign.findMany({
    where: { orgId },
    include: {
      client: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <Heading
          title="Campaigns"
          subtitle="Start new campaigns here"
        />
        <CampaignButtons />
      </div>
      <div className="space-y-6">
        <DataTable
          data={campaigns}
          columns={columns}
          title="Campaigns"
        />
      </div>
    </section>
  )
}

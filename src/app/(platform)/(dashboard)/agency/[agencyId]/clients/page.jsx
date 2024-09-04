import { DataTable, Heading } from "../_components";
import { ClientsButtons } from "./_components/clients-buttons";
import { columns } from "./columns";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export default async function ClientsPage() {

  const { orgId } = auth()

  const clients = await prisma.client.findMany({
    where: {
      orgId
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <Heading
          title="Clients"
          subtitle="View all your clients data here"
        />
        <ClientsButtons />
      </div>
      <div className="space-y-6">
        <DataTable
          data={clients}
          columns={columns}
          filterBy="name"
          title="Clients"
          className="rounded-md border" />
      </div>
    </section>
  )
}

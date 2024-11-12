import { DataTable } from "@/components/data-table";
import { Heading } from "../_components";
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
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-y-2">
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
          pdf
        />
      </div>
    </section>
  )
}

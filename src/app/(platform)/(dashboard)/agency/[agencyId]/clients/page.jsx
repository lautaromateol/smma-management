import { ClientsTable } from "./_components/clients-table";
import { Heading } from "../_components/heading";
import { useOpenModal } from "@/hooks/use-open-modal";
import ClientsButtons from "./_components/clients-buttons";

const clients = [
  {
    name: "Lautaro",
    email: "lautaromateol@gmail.com",
    phoneNumber: "3794280293",
    companyName: "The Industry Inc",
    industry: "Marketing",
    website: "http://localhost:3000"
  },
  {
    name: "Lautaro",
    email: "lautaromateol@gmail.com",
    phoneNumber: "3794280293",
    companyName: "The Industry Inc",
    industry: "Marketing",
    website: "http://localhost:3000"
  },
  {
    name: "Lautaro",
    email: "lautaromateol@gmail.com",
    phoneNumber: "3794280293",
    companyName: "The Industry Inc",
    industry: "Marketing",
    website: "http://localhost:3000"
  },
  {
    name: "Lautaro",
    email: "lautaromateol@gmail.com",
    phoneNumber: "3794280293",
    companyName: "The Industry Inc",
    industry: "Marketing",
    website: "http://localhost:3000"
  }
]

export default function ClientsPage() {

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <Heading
          title="Clients page"
          subtitle="View all your clients data here"
        />
        <ClientsButtons />
      </div>
      <ClientsTable clients={clients} />
    </section>
  )
}

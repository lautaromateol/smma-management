"use client"
import { ClientDropdown } from "./_components/client-dropdown"

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number"
  },
  {
    accessorKey: "companyName",
    header: "Company name"
  },
  {
    accessorKey: "industry",
    header: "Industry"
  },
  {
    accessorKey: "website",
    header: "Website"
  },
  {
    id: "actions",
    cell: ({row}) => {

      const client = row.original

      return(
        <ClientDropdown client={client} />
      )
    }
  }
]
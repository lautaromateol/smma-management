"use client"
import { Button } from "@/components/ui/button"
import { ClientDropdown } from "./_components/client-dropdown"
import { ArrowUpDown } from "lucide-react"
import { formatDate } from "@/lib/utils"

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
    accessorKey: "phone",
    header: "Phone"
  },
  {
    accessorKey: "company",
    header: "Company"
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created at
        <ArrowUpDown className="size-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt")

      return (
        <p className="text-center">{formatDate(new Date(createdAt))}</p>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {

      const client = row.original

      return (
        <ClientDropdown client={client} />
      )
    }
  }
]
"use client"
import { cn, formatDate } from "@/lib/utils"
import { CampaignDropdown, CampaignPlatform } from "./_components"
import { Badge } from "@/components/ui/badge"

export const columns = [
  {
    accessorKey: "client",
    header: "Client name",
    cell: ({ row }) => {
      const client = row.getValue("client")
      return <p>{client.name}</p>
    }
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "budget",
    header: "Budget",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("budget"))
      const formated = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <strong>{formated}</strong>
    }
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => {
      const platform = row.getValue("platform")
      return <CampaignPlatform platform={platform} />
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")

      return (
        <Badge className={cn(
          "text-white font-medium",
          status === "ACTIVE" ? "bg-green-500" : "bg-yellow-500"
        )}
        >
          {status}
        </Badge>
      )
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {

      const campaign = row.original

      return (
        <CampaignDropdown campaign={campaign} />
      )
    }
  }
]
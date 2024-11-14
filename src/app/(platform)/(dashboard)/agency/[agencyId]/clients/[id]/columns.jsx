"use client"
import { cn, formatDate } from "@/lib/utils"
import { CampaignDropdown, CampaignPlatform } from "../../campaigns/_components"
import { Badge } from "@/components/ui/badge"

export const clientCampaignColumns = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    id: "budget",
    header: "Budget",
    cell: ({ row }) => {
     const campaign = row.original

     const { lifetime_budget, daily_budget } = campaign
     
     const formated = formatNumber(lifetime_budget ? lifetime_budget : daily_budget)

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
    cell: ({ row }) => {

      const campaign = row.original

      return (
        <CampaignDropdown campaign={campaign} />
      )
    }
  }
]
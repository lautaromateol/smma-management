"use client"
import { formatDate } from "@/lib/utils"
import { CampaignDropdown, CampaignPlatform } from "./_components"

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
    accessorKey: "platforms",
    header: "Platforms",
    cell: ({ row }) => {
      const platforms = row.getValue("platforms")
      return <CampaignPlatform platforms={platforms} />
    }
  },
  {
    accessorKey: "status",
    header: "Status"
  },
  {
    accessorKey: "start",
    header: "Start",
    cell: ({ row }) => {
      const date = row.getValue("start")
      return <p>{formatDate(new Date(date))}</p>
    }
  },
  {
    accessorKey: "end",
    header: "End",
    cell: ({ row }) => {
      const date = row.getValue("end")
      return <p>{formatDate(new Date(date))}</p>
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
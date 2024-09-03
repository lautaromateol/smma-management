"use client"
import { CampaignPlatform } from "../../../_components"

export const socialMediaPostsColumns = [
  {
    accessorKey: "title",
    header: "Title"
  },
  {
    accessorKey: "impressions",
    header: "Impressions"
  },
  {
    accessorKey: "interactions",
    header: "Interactions"
  },
  {
    accessorKey: "clicks",
    header: "Clicks"
  },
  {
    accessorKey: "conversionRate",
    header: "Conversion rate",
    cell: ({ row }) => {
      const conversion = row.getValue("conversionRate")

      return <p><strong>{conversion}%</strong></p>
    }
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => {
      const platform = row.getValue("platform")

      return <CampaignPlatform platforms={platform} />
    }
  }
]
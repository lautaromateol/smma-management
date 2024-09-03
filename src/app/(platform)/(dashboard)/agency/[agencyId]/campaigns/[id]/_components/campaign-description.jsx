import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

export function CampaignDescription({ campaign }) {
  return (
    <Card className="w-1/3">
      <CardContent className="flex flex-col gap-y-2 pt-4">
        <div className="flex flex-col">
          <p className="text-sm font-light underline mb-1">Objective:</p>
          <p className="text-sm">{campaign.objective}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-light">Budget:</p>
          <p className="text-sm"><strong>{campaign.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong></p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-light">Start Date:</p>
          <p className="text-sm">{formatDate(new Date(campaign.startDate))}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-light">End Date:</p>
          <p className="text-sm">{formatDate(new Date(campaign.endDate))}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-light">Status:</p>
          <p className="text-sm">{campaign.status}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-sm font-light">Platforms:</p>
          <p className="text-sm">{campaign.platforms.join("-")}</p>
        </div>
      </CardContent>
    </Card>
  )
}

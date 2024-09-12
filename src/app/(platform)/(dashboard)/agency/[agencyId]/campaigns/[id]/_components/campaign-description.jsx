import { formatDate } from "@/lib/utils";

export function CampaignDescription({ campaign }) {
  return (
    <div className="flex items-center gap-x-6">
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Start date:</p>
        <p className="text-sm">{formatDate(new Date(campaign.start))}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">End date:</p>
        <p className="text-sm">{formatDate(new Date(campaign.end))}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Budget:</p>
        <p className="text-sm">{campaign.budget.toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Objective:</p>
        <p className="text-sm">{campaign.objective}</p>
      </div>
    </div>
  )
}

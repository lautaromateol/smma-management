export function CampaignDescription({ campaign }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-x-6">
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">{campaign.daily_budget ? "Daily budget" : "Lifetime budget"}:</p>
        <p className="text-sm">{campaign[campaign.daily_budget ? "daily_budget" : "lifetime_budget"].toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
      </div>
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-light">Objective:</p>
        <p className="text-sm">{campaign.objective}</p>
      </div>
    </div>
  )
}

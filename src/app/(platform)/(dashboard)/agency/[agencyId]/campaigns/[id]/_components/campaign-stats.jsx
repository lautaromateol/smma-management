import { EngagementPerCampaign, GeneralPerformance, InvestmentROI, PerformanceByChannel } from "./charts";

export function CampaignStats() {
  return (
    <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
      <InvestmentROI />
      <EngagementPerCampaign />
      <PerformanceByChannel />
    </div>
  )
}

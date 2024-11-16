import { BidStrategy } from "@prisma/client";

export const bidStrategies = [
  {
    key: BidStrategy.LOWEST_COST_WITH_BID_CAP,
    title: "Bid cap",
    description: "Set the highest that you want to bid in any auction.",
    compatible_objectives: ["OUTCOME_AWARENESS", "OUTCOME_TRAFFIC", "OUTCOME_ENGAGEMENT", "OUTCOME_LEADS", "OUTCOME_APP_PROMOTION", "OUTCOME_SALES"]
  },
  {
    key: BidStrategy.LOWEST_COST_WITHOUT_CAP,
    title: "Highest volume",
    description: "Get the most results for your budget.",
    compatible_objectives: ["OUTCOME_AWARENESS", "OUTCOME_TRAFFIC", "OUTCOME_ENGAGEMENT", "OUTCOME_LEADS", "OUTCOME_APP_PROMOTION", "OUTCOME_SALES"]
  },
  {
    key: BidStrategy.COST_CAP,
    title: "Cost per result goal",
    description: "Aim for a certain cost per result while maximising the volume of results.",
    compatible_objectives: ["OUTCOME_AWARENESS", "OUTCOME_TRAFFIC", "OUTCOME_ENGAGEMENT", "OUTCOME_LEADS", "OUTCOME_APP_PROMOTION", "OUTCOME_SALES"]
  },
  {
    key: BidStrategy.LOWEST_COST_WITH_MIN_ROAS,
    title: "ROAS goal",
    description: "Aim for a certain return on ad spend while maximising the value of results.",
    compatible_objectives: ["OUTCOME_APP_PROMOTION", "OUTCOME_SALES"]
  }
]
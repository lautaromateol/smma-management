import { Briefcase, Megaphone, MessageSquare, MousePointer, ThumbsUp, Users } from "lucide-react"

export const objectives = [
  {
    title: "Awareness",
    objective: "OUTCOME_AWARENESS",
    description: "Show your ads to people who are most likely to remember them.",
    icon: <Megaphone />
  },
  {
    title: "Traffic",
    objective: "OUTCOME_TRAFFIC",
    description: "Send people to a destination, such as your website, app, Instagram profile or Facebook event.",
    icon: <MousePointer />
  },
  {
    title: "Engagement",
    objective: "OUTCOME_ENGAGEMENT",
    description: "Get more messages, purchases through messaging, video views, post engagement, Page likes or event responses.",
    icon: <ThumbsUp />
  },
  {
    title: "Leads",
    objective: "OUTCOME_LEADS",
    description: "Collect leads for your business or brand.",
    icon: <MessageSquare />
  },
  {
    title: "App Promotion",
    objective: "OUTCOME_APP_PROMOTION",
    description: "Find new people to install your app and continue using it.",
    icon: <Users />
  },
  {
    title: "Sales",
    objective: "OUTCOME_SALES",
    description: "Find people who are likely to purchase your product or service.",
    icon: <Briefcase />
  }
]
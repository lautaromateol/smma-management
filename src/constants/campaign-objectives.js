import { BidStrategy } from "@prisma/client"
import { Briefcase, Megaphone, MessageSquare, MousePointer, ThumbsUp, Users } from "lucide-react"

export const objectives = [
  {
    title: "Awareness",
    objective: "OUTCOME_AWARENESS",
    description: "Show your ads to people who are most likely to remember them.",
    icon: <Megaphone />,
    has_conversion_location: false,
    optimization_goals: [
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITH_BID_CAP,
        goals: ["REACH", "IMPRESSIONS"]
      },
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITHOUT_CAP,
        goals: ["REACH", "IMPRESSIONS", "AD_RECALL_LIFT"]
      },
      {
        bid_strategy: BidStrategy.COST_CAP,
        goals: ["REACH"]
      }
    ]
  },
  {
    title: "Traffic",
    objective: "OUTCOME_TRAFFIC",
    description: "Send people to a destination, such as your website, app, Instagram profile or Facebook event.",
    icon: <MousePointer />,
    has_conversion_location: true,
    conversion_locations: [
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITH_BID_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Send traffic to your website.",
            optimization_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS"],
            related_goals: ["CONVERSATIONS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Send traffic to your app.",
            optimization_goals: ["LINK_CLICKS"],
            related_goals: ["REACH"]
          },
          {
            key: "MESSAGING_APPS",
            title: "Messaging apps",
            description: "Send traffic to Messenger, Instagram and WhatsApp.",
            optimization_goals: ["LINK_CLICKS"],
            related_goals: ["CONVERSATIONS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "INSTAGRAM_PROFILE",
            title: "Instagram profile",
            description: "Send traffic to your Instagram profile.",
            optimization_goals: ["VISIT_INSTAGRAM_PROFILE"]
          }
        ]
      },
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITHOUT_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Send traffic to your website.",
            optimization_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS"],
            related_goals: ["CONVERSATIONS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Send traffic to your app.",
            optimization_goals: ["LINK_CLICKS"],
            related_goals: ["REACH"]
          },
          {
            key: "MESSAGING_APPS",
            title: "Messaging apps",
            description: "Send traffic to Messenger, Instagram and WhatsApp.",
            optimization_goals: ["LINK_CLICKS"],
            related_goals: ["CONVERSATIONS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "INSTAGRAM_PROFILE",
            title: "Instagram profile",
            description: "Send traffic to your Instagram profile.",
            optimization_goals: ["VISIT_INSTAGRAM_PROFILE"]
          },
          {
            key: "CALLS",
            title: "Calls",
            description: "Get people to call your business.",
            optimization_goals: ["QUALITY_CALL"]
          }
        ]
      },
      {
        bid_strategy: BidStrategy.COST_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Send traffic to your website.",
            optimization_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS"],
            related_goals: ["REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Send traffic to your app.",
            optimization_goals: ["LINK_CLICKS"],
            related_goals: ["REACH"]
          },
        ]
      }
    ]
  },
  {
    title: "Engagement",
    objective: "OUTCOME_ENGAGEMENT",
    description: "Get more messages, purchases through messaging, video views, post engagement, Page likes or event responses.",
    icon: <ThumbsUp />,
    has_conversion_location: true,
    conversion_locations: [
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITH_BID_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Get people to engage with your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Get people to engage with your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "REACH"]
          },
          {
            key: "MESSAGING_APPS",
            title: "Messaging apps",
            description: "Get people to engage with your brand on Messenger, WhatsApp or Instagram.",
            optimization_goals: ["CONVERSATIONS"],
            related_goals: ["LINK_CLICKS"]
          },
          {
            key: "CALLS",
            title: "Calls",
            description: "Get people to call your business.",
            optimization_goals: ["QUALITY_CALL"],
          },
          {
            key: "FACEBOOK_PAGE",
            title: "Facebook page",
            description: "Get people to engage with your Facebook page",
            optimization_goals: ["PAGE_LIKES"]
          }
        ]
      },
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITHOUT_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Get people to engage with your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "IMPRESSIONS"]
          },
          {
            key: "APP",
            title: "App",
            description: "Get people to engage with your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS"]
          },
          {
            key: "MESSAGING_APPS",
            title: "Messaging apps",
            description: "Get people to engage with your brand on Messenger, WhatsApp or Instagram.",
            optimization_goals: ["CONVERSATIONS"],
            related_goals: ["LINK_CLICKS"]
          },
          {
            key: "CALLS",
            title: "Calls",
            description: "Get people to call your business.",
            optimization_goals: ["QUALITY_CALL"],
          },
          {
            key: "FACEBOOK_PAGE",
            title: "Facebook page",
            description: "Get people to engage with your Facebook page",
            optimization_goals: ["PAGE_LIKES"]
          }
        ]
      },
      {
        bid_strategy: BidStrategy.COST_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Send traffic to your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Send traffic to your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "REACH"]
          },
          {
            key: "FACEBOOK_PAGE",
            title: "Facebook page",
            description: "Get people to engage with your Facebook page",
            optimization_goals: ["PAGE_LIKES"]
          }
        ]
      }
    ]
  },
  {
    title: "Leads",
    objective: "OUTCOME_LEADS",
    description: "Collect leads for your business or brand.",
    icon: <MessageSquare />,
    has_conversion_location: true,
    conversion_locations: [
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITH_BID_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Generate leads through your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Generate leads through your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "REACH"]
          },
          {
            key: "WEBSITE_AND_CALLS",
            title: "Website and calls",
            description: "Generate leads through both your website and calls.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
          },
          {
            key: "INSTANT_FORMS",
            title: "Instant forms",
            description: "Generate leads by asking people to fill in a form.",
            optimization_goals: ["LEAD_GENERATION", "QUALITY_LEAD"]
          },
          {
            key: "MESSENGER",
            title: "Messenger",
            description: "Generate leads by starting chats in Messenger.",
            optimization_goals: ["LEAD_GENERATION"]
          },
          {
            key: "INSTANT_FORMS_AND_MESSENGER",
            title: "Instant forms and Messenger",
            description: "Generate leads by asking people to fill in a form or by starting chats in Messenger.",
            optimization_goals: ["LEAD_GENERATION"]
          },
          {
            key: "INSTAGRAM",
            title: "Instagram",
            description: "Generate leads by starting chats on Instagram.",
            optimization_goals: ["LEAD_GENERATION"]
          },
        ]
      },
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITHOUT_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Generate leads through your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Generate leads through your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "REACH"]
          },
          {
            key: "WEBSITE_AND_CALLS",
            title: "Website and calls",
            description: "Generate leads through both your website and calls.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
          },
          {
            key: "INSTANT_FORMS",
            title: "Instant forms",
            description: "Generate leads by asking people to fill in a form.",
            optimization_goals: ["LEAD_GENERATION", "QUALITY_LEAD"]
          },
          {
            key: "MESSENGER",
            title: "Messenger",
            description: "Generate leads by starting chats in Messenger.",
            optimization_goals: ["LEAD_GENERATION"]
          },
          {
            key: "INSTANT_FORMS_AND_MESSENGER",
            title: "Instant forms and Messenger",
            description: "Generate leads by asking people to fill in a form or by starting chats in Messenger.",
            optimization_goals: ["LEAD_GENERATION"]
          },
          {
            key: "INSTAGRAM",
            title: "Instagram",
            description: "Generate leads by starting chats on Instagram.",
            optimization_goals: ["LEAD_GENERATION"]
          },
          {
            key: "CALLS",
            title: "Calls",
            description: "Get people to call your business.",
            optimization_goals: ["QUALITY_CALL"],
          },
        ]
      },
      {
        bid_strategy: BidStrategy.COST_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Send traffic to your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Send traffic to your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "REACH"]
          },
          {
            key: "WEBSITE_AND_CALLS",
            title: "Website and calls",
            description: "Generate leads through both your website and calls.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
          },
          {
            key: "INSTANT_FORMS",
            title: "Instant forms",
            description: "Generate leads by asking people to fill in a form.",
            optimization_goals: ["LEAD_GENERATION"]
          },
          {
            key: "INSTANT_FORMS_AND_MESSENGER",
            title: "Instant forms and Messenger",
            description: "Generate leads by asking people to fill in a form or by starting chats in Messenger.",
            optimization_goals: ["LEAD_GENERATION"]
          },
          {
            key: "INSTAGRAM",
            title: "Instagram",
            description: "Generate leads by starting chats on Instagram.",
            optimization_goals: ["LEAD_GENERATION"]
          },
        ]
      }
    ]
  },
  {
    title: "App Promotion",
    objective: "OUTCOME_APP_PROMOTION",
    description: "Find new people to install your app and continue using it.",
    icon: <Users />,
    has_conversion_location: false,
    optimization_goals: [
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITH_BID_CAP,
        goals: ["APP_INSTALLS", "APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
        related_goals: ["LINK_CLICKS"]
      },
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITHOUT_CAP,
        goals: ["APP_INSTALLS", "APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
        related_goals: ["LINK_CLICKS"]
      },
      {
        bid_strategy: BidStrategy.COST_CAP,
        goals: ["APP_INSTALLS", "APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
        related_goals: ["LINK_CLICKS"]
      }
    ]
  },
  {
    title: "Sales",
    objective: "OUTCOME_SALES",
    description: "Find people who are likely to purchase your product or service.",
    icon: <Briefcase />,
    has_conversion_location: true,
    conversion_locations: [
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITH_BID_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Drive sales and conversions on your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Drive sales and conversions in your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS","REACH"]
          },
          {
            key: "WEBSITE_AND_APP",
            title: "Website and app",
            description: "Drive sales and conversions on your website or app.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
          },
          {
            key: "MESSAGING_APPS",
            title: "Messaging apps",
            description: "Drive sales and conversions through Messenger and Instagram",
            optimization_goals: ["CONVERSATIONS", "OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "CALLS",
            title: "Calls",
            description: "Drive sales and conversions through phone calls.",
            optimization_goals: ["QUALITY_CALL"]
          }
        ]
      },
      {
        bid_strategy: BidStrategy.LOWEST_COST_WITHOUT_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Drive sales and conversions on your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "IMPRESSIONS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Drive sales and conversions in your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS","REACH"]
          },
          {
            key: "WEBSITE_AND_APP",
            title: "Website and app",
            description: "Drive sales and conversions on your website or app.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
          },
          {
            key: "MESSAGING_APPS",
            title: "Messaging apps",
            description: "Drive sales and conversions through Messenger and Instagram",
            optimization_goals: ["CONVERSATIONS", "OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "IMPRESSIONS", "REACH"]
          },
        ]
      },
      {
        bid_strategy: BidStrategy.COST_CAP,
        locations: [
          {
            key: "WEBSITE",
            title: "Website",
            description: "Send traffic to your website.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
            related_goals: ["LANDING_PAGE_VIEWS", "LINK_CLICKS", "REACH"]
          },
          {
            key: "APP",
            title: "App",
            description: "Send traffic to your app.",
            optimization_goals: ["APP_INSTALLS_AND_OFFSITE_CONVERSIONS"],
            related_goals: ["LINK_CLICKS", "REACH"]
          },
          {
            key: "WEBSITE_AND_APP",
            title: "Website and app",
            description: "Drive sales and conversions on your website or app.",
            optimization_goals: ["OFFSITE_CONVERSIONS"],
          },
        ]
      }
    ]
  }
]
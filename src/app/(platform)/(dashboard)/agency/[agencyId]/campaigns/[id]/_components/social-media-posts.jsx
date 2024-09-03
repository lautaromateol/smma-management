import { CardWrapper } from "../../../_components/card-wrapper";
import { DataTable } from "../../../_components/data-table";
import { socialMediaPostsColumns } from "./columns/social-media-posts-columns";

const posts = [
  {
    id: "abc-001",
    title: "Post 1",
    impressions: 3200,
    interactions: 4324,
    clicks: 200,
    conversionRate: 3.25,
    platform: ["FACEBOOK"]
  },
  {
    id: "abc-002",
    title: "Post 2",
    impressions: 3340,
    interactions: 5564,
    clicks: 353,
    conversionRate: 4.55,
    platform: ["INSTAGRAM"]
  },
  {
    id: "abc-003",
    title: "Post 3",
    impressions: 6200,
    interactions: 6324,
    clicks: 600,
    conversionRate: 9.59,
    platform: ["TWITTER"]
  }
]

export function SocialMediaPosts() {
  return (
    <CardWrapper
        title="Social media ads"
        description="Your campaign ads with filtering, sorting and searching."
        className="border-none"
      >
        <DataTable data={posts} columns={socialMediaPostsColumns} />
      </CardWrapper>
  )
}

import { MetaPostsTable } from "."
import { getMetaContent } from "@/lib/get-meta-content"

export async function MetaContent({ data }) {

  const { posts, scheduledPosts, adSets } = await getMetaContent(data)

  return (
    <MetaPostsTable posts={posts} scheduledPosts={scheduledPosts} adSets={adSets} />
  )
}


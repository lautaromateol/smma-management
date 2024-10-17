import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { fetcher } from "@/lib/fetcher"
import { FaFacebook, FaInstagram } from "react-icons/fa6"
import { MetaPostsTable } from "."
import { addMilliseconds } from "date-fns"

export async function MetaPosts({ data }) {

  const { fbPageName, fbPageId, fbPictureUrl, igPageName, igPageId, igPictureUrl, pageAccessToken } = data

  const fbData = await fetcher(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/feed?fields=id,created_time,message,attachments{media_type,media,url}`, {
    "Authorization": `OAuth ${pageAccessToken}`
  })

  const fbScheduledData = await fetcher(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/scheduled_posts?fields=id,scheduled_publish_time,message,attachments{media_type,media,url}`,{
    "Authorization": `OAuth ${pageAccessToken}`
  })

  const igData = await fetcher(`${FACEBOOK_API_GRAPH_URL}/${igPageId}/media?fields=id,caption,media_url,thumbnail_url,children{media_type,media_url},timestamp`, {
    "Authorization": `OAuth ${pageAccessToken}`
  })

  const { data: fbUnformatted } = fbData

  const { data: fbScheduledUnformatted } = fbScheduledData

  const { data: igUnformatted } = igData

  const fbPosts = fbUnformatted.map((fbPost) => {

    const post = {
      message: fbPost.message ?? "",
      page: fbPageName,
      picture: fbPictureUrl,
      media_url: fbPost.attachments?.data[0]?.media?.image?.src ?? "",
      icon: <FaFacebook className="text-blue-500" />,
    }

    return { post, created_time: fbPost.created_time, url: fbPost.attachments?.data[0]?.url ?? "", caption: fbPost.message }
  })

  const fbScheduled = fbScheduledUnformatted.map((fbPost) => {

    const post = {
      message: fbPost.message ?? "",
      page: fbPageName,
      picture: fbPictureUrl,
      media_url: fbPost.attachments?.data[0]?.media?.image?.src ?? "",
      icon: <FaFacebook className="text-blue-500" />,
    }

    return { post, created_time: new Date(fbPost.scheduled_publish_time), url: fbPost.attachments?.data[0]?.url ?? "", caption: fbPost.message }
  })

  const igPosts = igUnformatted.map((igPost) => {
    
    const post = {
      message: igPost.caption,
      page: igPageName,
      picture: igPictureUrl,
      media_url: igPost.children ? igPost.media_url : igPost.thumbnail_url,
      icon: <FaInstagram className="text-pink-600" />
    }

    return { post, created_time: igPost.timestamp, caption: igPost.caption }
  })

  const posts = [...fbPosts, ...igPosts].sort(
    (a, b) => new Date(b.created_time) - new Date(a.created_time)
  )

  return (
    <MetaPostsTable posts={posts} scheduledPosts={fbScheduled} />
  )
}


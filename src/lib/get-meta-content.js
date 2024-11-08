import { FACEBOOK_API_GRAPH_URL } from "@/constants/facebook"
import { fetcher } from "./fetcher"
import { prisma } from "./prisma"
import { FaFacebook, FaInstagram } from "react-icons/fa6"

export async function getMetaContent(data) {

  const { fbPageId, igPageId, fbPageName, igPageName, fbPictureUrl, igPictureUrl, pageAccessToken, campaign } = data

  const [dbPosts, fbData, fbScheduledData, igData, adSetsData] = await Promise.all([
    prisma.post.findMany({
      where: {
        campaignId: campaign.id
      }
    }).then((data) => data.map((post) => post.id)),
    fetcher(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/feed?fields=id,created_time,message,attachments{media_type,media,url},comments.limit(0).summary(true),likes.limit(0).summary(true)`, {
      "Authorization": `OAuth ${pageAccessToken}`
    }),
    fetcher(`${FACEBOOK_API_GRAPH_URL}/${fbPageId}/scheduled_posts?fields=id,scheduled_publish_time,message,attachments{media_type,media,url}`, {
      "Authorization": `OAuth ${pageAccessToken}`
    }),
    fetcher(`${FACEBOOK_API_GRAPH_URL}/${igPageId}/media?fields=id,caption,media_url,thumbnail_url,children{media_type,media_url},timestamp`, {
      "Authorization": `OAuth ${pageAccessToken}`
    }),
    fetcher(`${FACEBOOK_API_GRAPH_URL}/${campaign.id}/adsets?fields=id,name,status,bid_amount,targeting,optimization_goal,billing_event,start_time,end_time`, {
      "Authorization": `OAuth ${pageAccessToken}`
    })
  ])

  const { data: fbUnformatted } = fbData

  const { data: fbScheduledUnformatted } = fbScheduledData

  const { data: igUnformatted } = igData

  const { data: adSets } = adSetsData

  const fbPosts = fbUnformatted.map((fbPost) => {

    const post = {
      id: fbPost.id,
      message: fbPost.message ?? "",
      page: fbPageName,
      picture: fbPictureUrl,
      media_url: fbPost.attachments?.data[0]?.media?.image?.src ?? "",
      media: fbPost.attachments ? fbPost.attachments.data.map(({ media_type, media, url }) => {
        return {
          media_type: media_type === "album" || media_type === "photo" ? "IMAGE" : "LINK",
          media_url: media_type === "album" || media_type === "photo" ? media.image.src : url
        }
      }) : [],
      icon: <FaFacebook className="text-blue-500" />,
      platform: "FACEBOOK",
      published: true,
      likes: fbPost.likes.summary.total_count,
      comments: fbPost.comments.summary.total_count
    }

    return { post, created_time: fbPost.created_time, url: fbPost.attachments?.data[0]?.url ?? "", caption: fbPost.message, data }
  })

  const fbScheduled = fbScheduledUnformatted.map((fbPost) => {

    const post = {
      id: fbPost.id,
      message: fbPost.message ?? "",
      page: fbPageName,
      picture: fbPictureUrl,
      media_url: fbPost.attachments?.data[0]?.media?.image?.src ?? "",
      media: fbPost.attachments ? fbPost.attachments.data.map(({ media_type, media, url }) => {
        return {
          media_type: media_type === "album" || media_type === "photo" ? "IMAGE" : "LINK",
          media_url: media_type === "album" || media_type === "photo" ? media.image.src : url
        }
      }) : [],
      icon: <FaFacebook className="text-blue-500" />,
      platform: "FACEBOOK",
      published: false,
    }

    return { post, created_time: new Date(fbPost.scheduled_publish_time * 1000).toISOString(), url: fbPost.attachments?.data[0]?.url ?? "", caption: fbPost.message, data }
  })

  const igPosts = igUnformatted.map((igPost) => {

    const post = {
      id: igPost.id,
      message: igPost.caption,
      page: igPageName,
      picture: igPictureUrl,
      media_url: igPost.children ? igPost.media_url : igPost.thumbnail_url,
      media: igPost.children ? igPost.children.data : [{ media_type: igPost.thumbnail_url ? "VIDEO" : "IMAGE", media_url: igPost.media_url }],
      icon: <FaInstagram className="text-pink-600" />,
      platform: "INSTAGRAM",
      published: true
    }

    return { post, created_time: igPost.timestamp, caption: igPost.caption, data }
  })

  const posts = [...fbPosts, ...igPosts].filter(({ post }) => dbPosts.includes(post.id)).sort(
    (a, b) => new Date(b.created_time) - new Date(a.created_time)
  )

  return { posts, scheduledPosts: fbScheduled, adSets: adSets.map((el) => ({ ...el, data })) }

}
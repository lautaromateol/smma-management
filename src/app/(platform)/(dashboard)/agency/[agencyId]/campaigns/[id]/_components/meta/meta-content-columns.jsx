"use client"
import { formatDate } from "@/lib/utils"
import { ImageIcon } from "lucide-react"
import { PostDropdown } from "."
import Image from "next/image"
import { AdSetDropdown } from "./ads"

export const metaPostsColumns = [
  {
    accessorKey: "post",
    header: "Title",
    cell: ({ row }) => {
      const post = row.getValue("post")

      return (
        <div className="flex items-center gap-x-2">
          <div className="size-12 relative">
            {post.media_url ?
              <Image
                src={post.media_url}
                alt={post?.message ?? "Post thumbnail"}
                className="object-cover"
                fill
              />
              :
              <ImageIcon className="size-12" />
            }
            <div className="bg-white rounded-full absolute bottom-0 right-0 grid place-content-center p-1">
              {post?.icon}
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {post.message?.length > 50 ? `${post.message.slice(0, 50)}...` : post.message}
            </p>
            <div className="flex items-center gap-x-1">
              <Image src={post.picture} alt="Page profile picture" width={20} height={20} />
              <p className="text-xs">{post.page}</p>
            </div>
          </div>
        </div>
      )
    }
  },
  {
    accessorKey: "created_time",
    header: "Publish Date",
    cell: ({ row }) => {
      const createdAt = row.getValue("created_time")

      return (
        <p className="font-medium">{formatDate(new Date(createdAt))}</p>
      )
    }
  },
  {
    accessorKey: "caption",
    header: "Caption"
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {

      const { post: { id, message, platform, media, url, published, comments, likes }, created_time, data } = row.original

      const post = {
        post_id: id,
        message,
        platform,
        urls: media.filter(({ media_type }) => media_type !== "LINK").map(({ media_type, media_url }) => {
          return {
            type: media_type.toLowerCase(),
            source: media_url
          }
        }),
        url,
        published,
        scheduled_publish_time: !published ? new Date(created_time) : null,
        comments,
        likes
      }

      return (
        <PostDropdown data={data} post={post} />
      )
    }
  }
]

export const adSetsColumns = [
  {
    accessorKey: "name",
    header: "Ad Set name",
  },
  {
    accessorKey: "bid_amount",
    header: "Bid cap",
    cell: ({ row }) => {

      const bid_amount = parseInt(row.getValue("bid_amount")) / 100
      const formated = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(bid_amount)

      return (
        <strong>{formated}</strong>
      )
    }
  },
  {
    accessorKey: "optimization_goal",
    header: "Optimization Goal"
  },
  {
    accessorKey: "billing_event",
    header: "Billing event"
  },
  {
    accessorKey: "targeting",
    header: "Age range",
    cell: ({ row }) => {

      const targeting = row.getValue("targeting")

      const age_min = targeting?.age_min
      const age_max = targeting?.age_max

      return (
        <p>{age_min} - {age_max}</p>
      )
    },
  },
  {
    accessorKey: "start_time",
    header: "Date range",
    cell: ({ row }) => {

      const start_time = row.getValue("start_time")
      const end_time = row.original.end_time

      return (
        <p>{formatDate(new Date(start_time))} - {formatDate(new Date(end_time))}</p>
      )
    }
  },
  {
    id: "Actions",
    header: "Actions",
    cell: ({ row }) => {

      const adSet = row.original

      const { data } = adSet

      return (
        <AdSetDropdown adSet={adSet} data={data} />
      )

    }
  }
]
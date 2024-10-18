"use client"
import { formatDate } from "@/lib/utils"
import { ImageIcon } from "lucide-react"
import { PostDropdown } from "."
import Image from "next/image"

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

      const { post: { id, message, platform, media, url, published }, created_time, data } = row.original

      const post = {
        id,
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
        scheduled_publish_time: !published ? created_time : null
      }

      return (
        <PostDropdown data={data} post={post} />
      )
    }
  }
]
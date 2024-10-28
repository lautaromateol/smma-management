"use client"
import { useState } from "react"
import { CardWrapper } from "@/components/card-wrapper"
import { DataTable } from "@/components/data-table"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { metaPostsColumns } from "./meta-posts-columns"
import { cn } from "@/lib/utils"

export function MetaPostsTable({ posts, scheduledPosts }) {

  const [showScheduled, setShowScheduled] = useState(false)

  return (
    <CardWrapper
      title="Content"
      description="Review your published and scheduled posts in this campaign"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <div
            onClick={() => setShowScheduled(false)}
            role="button"
            className={cn(
              "p-2 rounded-md text-sm",
              !showScheduled && "bg-main-shade text-main-tint"
            )}
          >
            Published
          </div>
          <div
            onClick={() => setShowScheduled(true)}
            role="button"
            className={cn(
              "p-2 rounded-md text-sm",
              showScheduled && "bg-main-shade text-main-tint"
            )}
          >
            Scheduled
          </div>
        </div>
        <Separator className="w-full" />
        <DataTable
          data={showScheduled ? scheduledPosts : posts}
          columns={metaPostsColumns}
          filterBy="caption"
        />
      </div>
    </CardWrapper>
  )
}

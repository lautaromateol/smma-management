"use client"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { CardWrapper } from "@/components/card-wrapper"
import { DataTable } from "@/components/data-table"
import { Select, SelectGroup, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { adSetsColumns, metaPostsColumns } from "./meta-content-columns"

export function MetaPostsTable({ posts, scheduledPosts, adSets }) {

  const [showScheduled, setShowScheduled] = useState(false)

  const [showAds, setShowAds] = useState(false)

  const [displayPosts, setDisplayPosts] = useState(true)

  return (
    <CardWrapper
      title="Content"
      description="Review your published and scheduled posts in this campaign"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {displayPosts ?
            <div className="flex items-center gap-x-2">
              <div
                onClick={() => setShowScheduled(false)}
                role="button"
                className={cn(
                  "p-2 text-sm",
                  !showScheduled && "bg-main-shade text-main-tint"
                )}
              >
                Published
              </div>
              <div
                onClick={() => setShowScheduled(true)}
                role="button"
                className={cn(
                  "p-2 text-sm",
                  showScheduled && "bg-main-shade text-main-tint"
                )}
              >
                Scheduled
              </div>
            </div>
            :
            <div className="flex items-center gap-x-2">
              <div
                onClick={() => setShowAds(false)}
                role="button"
                className={cn(
                  "p-2 text-sm",
                  !showAds && "bg-main-shade text-main-tint"
                )}
              >
                Ad Sets
              </div>
              <div
                onClick={() => setShowAds(true)}
                role="button"
                className={cn(
                  "p-2 text-sm",
                  showAds && "bg-main-shade text-main-tint"
                )}
              >
                Ads
              </div>
            </div>}
          <div className="w-auto">
            <Select onValueChange={(value) => setDisplayPosts(value)}>
              <SelectTrigger>
                <SelectValue>
                  <p className="font-medium">
                    {displayPosts ? "Posts" : "Ads"}
                  </p>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={true}>Posts</SelectItem>
                  <SelectItem value={false}>Ads</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Separator className="w-full" />
        {displayPosts ?
          <DataTable
            data={showScheduled ? scheduledPosts : posts}
            columns={metaPostsColumns}
            filterBy="caption"
          />
          :
          <DataTable
            data={adSets}
            columns={adSetsColumns}
            filterBy="name"
          />
        }
      </div>
    </CardWrapper >
  )
}

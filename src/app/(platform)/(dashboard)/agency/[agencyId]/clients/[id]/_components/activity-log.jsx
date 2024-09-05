import { generateLogMessage } from "@/lib/generate-log-message";
import { format } from "date-fns";
import Image from "next/image";

export function ActivityLog({ activity }) {
  return (
    <div className="flex items-center gap-x-2 bg-main-light p-2">
      <Image
        src={activity.userImage}
        width={40}
        height={40}
        className="rounded-full"
        alt="User image"
      />
      <div className="space-y-0.5">
        <p className="text-neutral-700 font-medium text-sm">
          {`${activity.userName} ${generateLogMessage({ action: activity.action, entityTitle: activity.entityTitle, entityType: activity.entityType })}`}
          </p>
        <p className="text-gray-500 text-sm">{format(new Date(activity.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
      </div>
    </div>
  )
}

import { CardWrapper } from "@/components/card-wrapper"
import { ActivityLog } from "./activity-log";

export async function Timeline({ activities }) {

  return (
    <CardWrapper
      title="Timeline & activity logs"
      description="Review the activity of this client on the app"
      className="border-none"
    >
      <div className="space-y-2">
        {activities.map((activity) => (
          <ActivityLog activity={activity} key={activity.id} />
        ))}
      </div>
    </CardWrapper>
  )
}

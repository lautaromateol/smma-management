import { CardWrapper } from "../../../_components";
import { ActivityLog } from "./activity-log";

export async function Timeline({ activities }) {

  return (
    <CardWrapper
      title="Timeline & logs changes"
      description="Review the activity of this client on the app"
      className="border-none col-span-2"
    >
      <div className="space-y-2">
        {activities.map((activity) => (
          <ActivityLog activity={activity} key={activity.id} />
        ))}
      </div>
    </CardWrapper>
  )
}

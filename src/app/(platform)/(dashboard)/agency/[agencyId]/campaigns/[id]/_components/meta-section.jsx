import { Suspense } from "react";
import { MetaPage } from "./meta";

export function MetaSection({ pages, accessToken, campaignId }) {
  return (
    <div className="space-y-6">
      {pages.map((page) => (
        <Suspense key={page.id} fallback={<MetaPage.Skeleton />}>
          <MetaPage accessToken={accessToken} page={page} campaignId={campaignId} />
        </Suspense>
      ))}
    </div>
  )
}
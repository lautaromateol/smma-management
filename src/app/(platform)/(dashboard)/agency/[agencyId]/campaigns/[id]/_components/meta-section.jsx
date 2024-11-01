import { Suspense } from "react";
import { MetaPage } from "./meta";

export function MetaSection({ pages, accessToken, campaign }) {
  return (
    <div className="space-y-6">
      {pages.map((page) => (
        <Suspense key={page.id} fallback={<MetaPage.Skeleton />}>
          <MetaPage accessToken={accessToken} page={page} campaign={campaign} />
        </Suspense>
      ))}
    </div>
  )
}
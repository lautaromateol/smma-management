import { Suspense } from "react";
import { MediaElement } from "./media-element";

export function MediaPreview({ mediaFbIds, accessToken }) {
  return (
    <>
      {mediaFbIds.map(({media_fbid}) => (
        <MediaElement
          key={media_fbid}
          id={media_fbid}
          accessToken={accessToken}
        />
      ))}
    </>
  )
}

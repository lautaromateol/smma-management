import { MediaElement } from "./media-element";

export function MediaPreview({ attachedMedia, accessToken }) {

  return (
    <>
      {attachedMedia?.map(({media_fbid}) => (
        <MediaElement
          key={media_fbid}
          id={media_fbid}
          accessToken={accessToken}
        />
      ))}
    </>
  )
}

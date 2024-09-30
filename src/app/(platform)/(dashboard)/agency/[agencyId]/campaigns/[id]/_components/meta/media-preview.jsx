import { MediaElement } from "./media-element";

export function MediaPreview({ attachedMedia, accessToken, form }) {

  return (
    <>
      {attachedMedia?.map(({media_fbid, type}) => (
        <MediaElement
          key={media_fbid}
          id={media_fbid}
          type={type}
          accessToken={accessToken}
          form={form}
        />
      ))}
    </>
  )
}

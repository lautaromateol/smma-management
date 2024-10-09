"use client"
import { MediaElement } from "./media-element";

export function MediaPreview({ form, inputs, setInputs }) {

  const { previews } = inputs

  return (
    <>
      {previews?.map(({id, source}) => (
        <MediaElement
          key={id}
          id={id}
          source={source}
          form={form}
          inputs={inputs}
          setInputs={setInputs}
        />
      ))}
    </>
  )
}

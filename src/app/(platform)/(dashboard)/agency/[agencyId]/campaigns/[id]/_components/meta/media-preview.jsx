"use client"
import { useFormInputs } from "@/hooks/use-form-inputs";
import { MediaElement } from "./media-element";

export function MediaPreview({ form }) {

  const { inputs } = useFormInputs((state) => state)

  const { previews } = inputs

  return (
    <>
      {previews?.map(({id, source}) => (
        <MediaElement
          key={id}
          id={id}
          source={source}
          form={form}
        />
      ))}
    </>
  )
}

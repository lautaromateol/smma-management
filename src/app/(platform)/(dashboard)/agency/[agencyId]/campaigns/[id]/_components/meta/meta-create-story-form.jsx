"use client"
import { useEffect } from "react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { PlatformSelector, SchedulePost, UploadMedia } from "."
import { useMetaStoryInputs } from "@/hooks/use-form-inputs"
import { zodResolver } from "@hookform/resolvers/zod"
import { InstagramStory } from "@/actions/publish-instagram-story/schema"

export function MetaCreateStoryForm({ data }) {

  const { igPageId, fbPageId, fbPageName, igPageName, pageAccessToken } = data

  const { inputs, setInputs } = useMetaStoryInputs((state) => state)

  const { platform, attached_media } = inputs

  const form = useForm({
    resolver: zodResolver(InstagramStory),
    defaultValues: {
      platform,
      attached_media,
      access_token: pageAccessToken
    }
  })

  function onSubmit(data) {

  }

  useEffect(() => {
    platform === "INSTAGRAM" ? form.setValue("id", igPageId) : form.setValue("id", fbPageId)
    const subscription = form.watch((value, { name }) => {
      setInputs(name, value[name])
    })

    return () => subscription.unsubscribe()
  }, [form, setInputs, platform, fbPageId, igPageId])


  return (
    <div className="bg-main-light grid grid-cols-2 gap-x-10 p-8 max-w-5xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <PlatformSelector
            fbPageName={fbPageName}
            igPageName={igPageName}
            form={form}
          />
          <UploadMedia 
            form={form}
            accessToken={pageAccessToken}
            fbPageId={fbPageId}
            type="story"
          />
          <SchedulePost 
            form={form}
          />
        </form>
      </Form>
    </div>
  )
}

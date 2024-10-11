"use client"
import { useEffect } from "react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { InstagramStoryPreview, PlatformSelector, SchedulePost, UploadMedia } from "."
import { useMetaStoryInputs } from "@/hooks/use-inputs"
import { useOpenModal } from "@/hooks/use-open-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { InstagramStory } from "@/actions/publish-instagram-story/schema"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { publishInstagramStory } from "@/actions/publish-instagram-story"
import { toast } from "sonner"

export function MetaCreateStoryForm({ data }) {

  const { igPageId, fbPageId, fbPageName, igPageName, pageAccessToken } = data

  const { onClose } = useOpenModal((state) => state)

  const { inputs, setInputs, resetInputs } = useMetaStoryInputs((state) => state)

  const { platform, urls } = inputs

  const form = useForm({
    resolver: zodResolver(InstagramStory),
    defaultValues: {
      platform,
      urls,
      access_token: pageAccessToken
    }
  })

  const { execute, isPending } = useAction(publishInstagramStory, {
    onSuccess: () => {
      toast.success("Story published successfully")
      resetInputs()
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  function onSubmit(data) {
    execute(data)
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
            setInputs={setInputs}
            inputs={inputs}
          />
          <SchedulePost
            form={form}
          />
          <Button
            disabled={isPending}
            type="submit"
            variant="main"
            className="w-full"
          >
            Publish
          </Button>
        </form>
      </Form>
      <InstagramStoryPreview images={urls} data={data} />
    </div>
  )
}

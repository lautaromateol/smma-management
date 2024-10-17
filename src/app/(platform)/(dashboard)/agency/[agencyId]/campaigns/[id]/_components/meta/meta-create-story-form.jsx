"use client"
import { useEffect } from "react"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { InstagramStoryPreview, PlatformSelector, UploadMedia } from "."
import { useMetaStoryInputs } from "@/hooks/use-inputs"
import { useOpenModal } from "@/hooks/use-open-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { InstagramStory } from "@/actions/publish-instagram-story/schema"
import { FacebookStory } from "@/actions/publish-facebook-story/schema"
import { publishInstagramStory } from "@/actions/publish-instagram-story"
import { publishFacebookStory } from "@/actions/publish-facebook-story"
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"

export function MetaCreateStoryForm({ data }) {

  const { igPageId, fbPageId, fbPageName, igPageName, pageAccessToken } = data

  const { onClose } = useOpenModal((state) => state)

  const { inputs, setInputs, resetInputs } = useMetaStoryInputs((state) => state)

  const { platform, urls } = inputs

  const form = useForm({
    resolver: zodResolver(platform === "FACEBOOK" ? FacebookStory : InstagramStory),
    defaultValues: {
      platform,
      urls,
      access_token: pageAccessToken
    }
  })

  const { errors } = form.formState

  const { execute: publishToInstagram, isPending: isUploadingToInstagram } = useAction(publishInstagramStory, {
    onSuccess: (data) => {
      data.length === urls.length ? toast.success("All stories were published successfully to Instagram") : toast.success("Some stories were published successfully to Instagram")
      resetInputs()
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  const { execute: publishToFacebook, isPending: isUploadingToFacebook } = useAction(publishFacebookStory, {
    onSuccess: (data) => {
      data.map((post) => post.post_id).length === urls.length ? toast.success("All stories were published successfully to Facebook") : toast.success("Some stories were published successfully to Facebook")
      resetInputs()
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  function onSubmit(data) {
    platform === "FACEBOOK" ? publishToFacebook(data) : publishToInstagram(data)
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
            message={errors.urls?.message}
          />
          {/* <SchedulePost
            form={form}
          /> */}
          <Button
            disabled={isUploadingToFacebook || isUploadingToInstagram}
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

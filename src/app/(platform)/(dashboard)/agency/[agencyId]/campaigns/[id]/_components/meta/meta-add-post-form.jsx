"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useFormInputs } from "@/hooks/use-inputs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FacebookPostPreview, InsertLink, InstagramPostPreview, PlatformSelector, SchedulePost, UploadMedia, Targeting } from ".";
import { FacebookPost } from "@/actions/publish-facebook-post/schema";
import { InstagramPost } from "@/actions/publish-instagram-post/schema";
import { FacebookPostToUpdate } from "@/actions/update-facebook-post/schema";
import { publishFacebookPost } from "@/actions/publish-facebook-post";
import { publishInstagramPost } from "@/actions/publish-instagram-post";
import { updateFacebookPost } from "@/actions/update-facebook-post";

export function MetaAddPostForm({ data, editValues = {} }) {

  const { post_id } = editValues

  const isEditSession = Boolean(post_id)

  const { fbPageId, fbPageName, igPageId, igPageName, pageAccessToken, userAccessToken, campaignId } = data

  const { onClose } = useOpenModal((state) => state)

  const { inputs, setInputs, resetInputs } = useFormInputs((state) => state)

  const { platform, published, attached_media, urls, message, targeting, link, scheduled_publish_time } = inputs

  const [linkValue, setLinkValue] = useState("")
  const [showLinkForm, setShowLinkForm] = useState(false)

  const [showTargetingForm, setShowTargetingForm] = useState(false)

  const resolver = isEditSession && platform === "FACEBOOK" ? FacebookPostToUpdate : isEditSession && platform === "INSTAGRAM" ? InstagramPost : platform === "FACEBOOK" ? FacebookPost : InstagramPost

  const form = useForm({
    resolver: zodResolver(resolver),
    defaultValues: isEditSession ? { ...editValues, access_token: pageAccessToken } : {
      access_token: pageAccessToken,
      attached_media,
      urls,
      platform,
      message,
      targeting,
      link,
      published,
      scheduled_publish_time,
      campaign_id: campaignId
    }
  })

  const { errors, isDirty, dirtyFields } = form.formState

  const { execute: postOnFacebook, isPending: isPostingOnFacebook } = useAction(publishFacebookPost, {
    onSuccess: () => {
      toast.success(`Facebook post successfully ${published ? "published" : "scheduled"}`)
      resetInputs()
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  const { execute: postOnInstagram, isPending: isPostingOnInstagram } = useAction(publishInstagramPost, {
    onSuccess: () => {
      toast.success(`Instagram post successfully ${published ? "published" : "scheduled"}`)
      resetInputs()
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  const { execute: updateOnFacebook, isPending: isUpdatingOnFacebook } = useAction(updateFacebookPost, {
    onSuccess: () => {
      toast.success("Facebook post successfully updated")
      resetInputs()
      onClose()
    },
    onError: (error) => toast.error(error)
  })


  function onSubmit(data) {
    if (isEditSession) {
      const payload = {}

      for (let prop of Object.keys(data)) {
        if (dirtyFields[prop]) {
          payload[prop] = data[prop]
        }
      }

      const postToUpdate = { id: data.id, post_id, access_token: data.access_token, ...payload }

      platform === "FACEBOOK" ? updateOnFacebook(postToUpdate) : postOnInstagram()

    } else {
      platform === "FACEBOOK" ? postOnFacebook(data) : postOnInstagram(data)
    }

  }

  useEffect(() => {
    if (isEditSession) {
      for (let prop of Object.keys(editValues)) {
        setInputs(prop, editValues[prop])
      }
    }
    platform === "FACEBOOK" ? form.setValue("id", fbPageId) : form.setValue("id", igPageId)
    const subscription = form.watch((value, { name, type }) => {
      setInputs(name, value[name]);
    });

    return () => {
      subscription.unsubscribe()

      if (isEditSession) {
        resetInputs()
      }
    }
  }, [form, setInputs, fbPageId, igPageId, platform, editValues, isEditSession, resetInputs]);

  return (
    <div className="bg-main-light grid grid-cols-2 gap-x-10 p-8 max-w-5xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <PlatformSelector
              form={form}
              fbPageName={fbPageName}
              igPageName={igPageName}
              isEditSession={isEditSession}
            />
            {!isEditSession && <UploadMedia
              form={form}
              fbPageId={fbPageId}
              igPageId={igPageId}
              accessToken={pageAccessToken}
              message={errors?.urls?.message}
              inputs={inputs}
              setInputs={setInputs}
            />}
            <div className="bg-white space-y-2 p-4">
              <FormLabel>Post details</FormLabel>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-1">
                {platform === "FACEBOOK" && !isEditSession &&
                  <>
                    <InsertLink
                      setShowLinkForm={setShowLinkForm}
                    />
                    <Targeting
                      setShowTargetingForm={setShowTargetingForm}
                    />
                  </>
                }
              </div>
              <InsertLink.Form
                form={form}
                setShowLinkForm={setShowLinkForm}
                showLinkForm={showLinkForm}
                linkValue={linkValue}
                setLinkValue={setLinkValue}
                message={errors?.link?.message}
              />
              <Targeting.Form
                accessToken={userAccessToken}
                form={form}
                message={errors?.targeting?.message}
                setShowTargetingForm={setShowTargetingForm}
                showTargetingForm={showTargetingForm}
              />
            </div>
            {platform === "FACEBOOK" && !(isEditSession && published) && (
              <SchedulePost form={form} message={errors?.scheduled_publish_time?.message} isEditSession={isEditSession} />
            )}
            <Button
              disabled={isPostingOnFacebook || isPostingOnInstagram || isUpdatingOnFacebook || !isDirty}
              type="submit"
              variant="main"
              className="w-full"
            >
              Publish
            </Button>
        </form>
      </Form>
      {platform === "FACEBOOK" ?
        <FacebookPostPreview data={data} />
        :
        <InstagramPostPreview data={data} />
      }
    </div>
  )
}

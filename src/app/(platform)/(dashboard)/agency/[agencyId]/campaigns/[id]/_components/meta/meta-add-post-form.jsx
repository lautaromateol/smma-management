"use client"
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useFormInputs } from "@/hooks/use-inputs";
import { FacebookPost } from "@/actions/publish-facebook-post/schema";
import { InstagramPost } from "@/actions/publish-instagram-post/schema";
import { publishFacebookPost } from "@/actions/publish-facebook-post";
import { publishInstagramPost } from "@/actions/publish-instagram-post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FacebookPostPreview, InsertLink, InstagramPostPreview, PlatformSelector, SchedulePost, UploadMedia, Targeting } from ".";

export function MetaAddPostForm({ data }) {

  const { fbPageId, fbPageName, igPageId, igPageName, pageAccessToken, userAccessToken } = data

  const { onClose } = useOpenModal((state) => state)

  const { inputs, setInputs, resetInputs } = useFormInputs((state) => state)

  const { platform, published, attached_media, urls, message, targeting } = inputs

  const [linkValue, setLinkValue] = useState("")
  const [showLinkForm, setShowLinkForm] = useState(false)

  const [showTargetingForm, setShowTargetingForm] = useState(false)

  const form = useForm({
    resolver: zodResolver(platform === "FACEBOOK" ? FacebookPost : InstagramPost),
    defaultValues: {
      access_token: pageAccessToken,
      attached_media,
      urls,
      platform,
      message,
      targeting,
      link: null,
      published: true,
      scheduled_publish_time: null,
    }
  })

  const { errors } = form.formState

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


  function onSubmit(data) {
    console.log(data)
    platform === "FACEBOOK" ? postOnFacebook(data) : postOnInstagram(data)
  }

  useEffect(() => {
    platform === "FACEBOOK" ? form.setValue("id", fbPageId) : form.setValue("id", igPageId)
    const subscription = form.watch((value, { name, type }) => {
      setInputs(name, value[name]);
    });

    return () => subscription.unsubscribe();
  }, [form, setInputs, fbPageId, igPageId, platform]);

  return (
    <div className="bg-main-light grid grid-cols-2 gap-x-10 p-8 max-w-5xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-4">
            <PlatformSelector
              form={form}
              fbPageName={fbPageName}
              igPageName={igPageName}
            />
            <UploadMedia
              form={form}
              fbPageId={fbPageId}
              igPageId={igPageId}
              accessToken={pageAccessToken}
              message={errors?.urls?.message}
              inputs={inputs}
              setInputs={setInputs}
            />
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
                {platform === "FACEBOOK" &&
                  <InsertLink
                    setShowLinkForm={setShowLinkForm}
                  />}
                <Targeting
                  setShowTargetingForm={setShowTargetingForm}
                />
                {/* <Location 
                  setShowLocationForm={setShowLocationForm}
                /> */}
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
              {/* <Location.Form
               form={form}
               setShowLocationForm={setShowLocationForm}
               showLocationForm={showLocationForm}
               locationValue={locationValue}
               setLocationValue={setLocationValue}
               message={errors?.location?.message}
               accessToken={userAccessToken}
              /> */}
            </div>
            <SchedulePost form={form} message={errors?.scheduled_publish_time?.message} />
            <Button
              disabled={isPostingOnFacebook || isPostingOnInstagram}
              type="submit"
              variant="main"
              className="w-full"
            >
              Publish
            </Button>
          </div>
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

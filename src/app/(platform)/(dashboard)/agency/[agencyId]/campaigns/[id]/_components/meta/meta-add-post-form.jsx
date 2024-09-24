"use client"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { useFormInputs } from "@/hooks/use-form-inputs";
import { FacebookPost } from "@/actions/publish-facebook-post/schema";
import { InstagramPost } from "@/actions/publish-instagram-post/schema";
import { publishFacebookPost } from "@/actions/publish-facebook-post";
import { publishInstagramPost } from "@/actions/publish-instagram-post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FacebookPostPreview, InsertLink, InstagramPostPreview, PlatformSelector, SchedulePost, UploadMedia } from ".";

export function MetaAddPostForm({ data }) {

  const { fbPageId, fbPageName, igPageId, igPageName, pageAccessToken } = data

  const { onClose } = useOpenModal((state) => state)

  const { inputs, setInputs, resetInputs } = useFormInputs((state) => state)

  const { platform, published, attached_media } = inputs

  const form = useForm({
    resolver: zodResolver(platform === "FACEBOOK" ? FacebookPost : InstagramPost),
    defaultValues: platform === "FACEBOOK" ?
      {
        id: fbPageId,
        access_token: pageAccessToken,
        link: null,
        platform,
        published: true,
        scheduled_publish_time: null,
        attached_media,
      }
      :
      {
        id: igPageId,
        access_token: pageAccessToken,
        platform,
        published: true,
        scheduled_publish_time: null,
        attached_media,
      }
  })

  const { errors } = form.formState

  console.log(errors)

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
    platform === "FACEBOOK" ? postOnFacebook(data) : postOnInstagram(data)
  }

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      setInputs(name, value[name]);
    });

    return () => subscription.unsubscribe();
  }, [form, setInputs]);

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
              {platform === "FACEBOOK" && <InsertLink form={form} message={errors?.link?.message} />}
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

"use client"
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertLink, PlatformSelector, SchedulePost, UploadMedia } from ".";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { FacebookPost } from "@/actions/publish-facebook-post/schema";
import { publishFacebookPost } from "@/actions/publish-facebook-post";

export function MetaAddPostForm({ data: { fbPageId, fbPageName, igPageName, pageAccessToken } }) {

  const { onClose } = useOpenModal((state) => state)

  const [mediaFbIds, setMediaFbIds] = useState([])

  const form = useForm({
    resolver: zodResolver(FacebookPost),
    defaultValues: {
      id: fbPageId,
      attached_media: mediaFbIds,
      published: true
    }
  })

  const { errors } = form.formState

  // console.log(errors)

  const { execute, isPending } = useAction(publishFacebookPost, {
    onSuccess: () => {
      toast.success(`Post successfully ${form.getValues().published ? "created" : "scheduled"}`)
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  function onSubmit(data) {
    console.log(data)
  }

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
              accessToken={pageAccessToken}
              mediaFbIds={mediaFbIds}
              setMediaFbIds={setMediaFbIds}
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
              <InsertLink form={form} message={errors?.link?.message} />
            </div>
            <SchedulePost form={form} message={errors?.scheduled_publish_time?.message} />
            <Button
              disabled={isPending}
              type="submit"
              variant="main"
              className="w-full"
            >
              Publish
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

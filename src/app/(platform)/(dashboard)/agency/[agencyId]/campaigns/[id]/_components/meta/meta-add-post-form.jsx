"use client"
import { useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsertLink, PlatformSelector, PostPreview, SchedulePost, UploadMedia } from ".";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { FacebookPost } from "@/actions/publish-facebook-post/schema";
import { publishFacebookPost } from "@/actions/publish-facebook-post";
import { useFormInputs } from "@/hooks/use-form-inputs";

export function MetaAddPostForm({ data }) {

  const { fbPageId, fbPageName, igPageName, pageAccessToken } = data

  const { onClose } = useOpenModal((state) => state)

  const { setInputs } = useFormInputs((state) => state)

  const form = useForm({
    resolver: zodResolver(FacebookPost),
    defaultValues: {
      id: fbPageId,
      published: true,
      attached_media: [],
      access_token: pageAccessToken
    }
  })

  const { errors } = form.formState

  const { execute, isPending } = useAction(publishFacebookPost, {
    onSuccess: () => {
      toast.success(`Post successfully ${form.getValues().published ? "created" : "scheduled"}`)
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  function onSubmit(data) {
    execute(data)
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
      <PostPreview data={data} />
    </div>
  )
}

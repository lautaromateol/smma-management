"use client"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useOpenModal } from "@/hooks/use-open-modal"
// import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAction } from "@/hooks/use-action"
import { updateInstagramProfile } from "@/actions/edit-instagram-profile"
import { InstagramProfile } from "@/actions/edit-instagram-profile/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProfilePicture } from "."

export function EditInstagramProfileForm({ data }) {

  const { onClose } = useOpenModal((state) => state)

  const { fbPageId, igPageId, igPageName, igBiography, igWebsite, igPictureUrl, pageAccessToken } = data

  const form = useForm({
    resolver: zodResolver(InstagramProfile),
    defaultValues: {
      id: igPageId,
      username: igPageName,
      biography: igBiography ?? null,
      website: igWebsite ?? null,
      access_token: pageAccessToken
    }
  })

  const { execute, isPending } = useAction(updateInstagramProfile, {
    onSuccess: () => {
      toast.success("Instagram profile updated successfully")
      onClose()
    }
  })

  function onSubmit(data) {
    execute(data)
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <ProfilePicture
          form={form}
          accessToken={pageAccessToken}
          fbPageId={fbPageId}
          picture={igPictureUrl}
        />
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="biography"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>About</FormLabel>
              <FormControl>
                <Textarea disabled placeholder="No bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="website"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input disabled placeholder="No website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Button
          type="submit"
          variant="main"
          className="w-full"
          disabled={!form.formState.isDirty || isPending}
        >
          Update
        </Button> */}
      </form>
    </Form>
  )
}

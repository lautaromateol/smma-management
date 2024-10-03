"use client"
import { updateFacebookProfile } from "@/actions/edit-facebook-profile"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { useAction } from "@/hooks/use-action"
import { Home, LinkIcon, Mail, Phone } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { UpdateLocation } from "."
import { useOpenModal } from "@/hooks/use-open-modal"
import { zodResolver } from "@hookform/resolvers/zod"
import { FacebookProfile } from "@/actions/edit-facebook-profile/schema"

export function EditFacebookProfileForm({ page, data }) {

  const { onClose } = useOpenModal((state) => state)

  const { fbPageId, pageAccessToken, userAccessToken } = data

  const form = useForm({
    resolver: zodResolver(FacebookProfile),
    defaultValues: {
      id: fbPageId,
      accessToken: pageAccessToken,
      about: page?.about ?? null,
      category: page?.category ?? null,
      email: page?.emails?.length > 0 ? page.emails[0] : null,
      website: page?.website ?? null,
      phone: page?.phone ?? null,
      location: page?.location ?? null
    }
  })

  const { execute, isPending } = useAction(updateFacebookProfile, {
    onSuccess: () => {
      onClose()
      toast.success("Facebook profile updated successfully!")
    },
    onError: (error) => toast.error(error)
  })

  function onSubmit(data) {
    execute(data)
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="about"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="No bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input disabled placeholder="No category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center gap-x-2">
                  <Phone className="size-4" />
                  Phone
                </div>
              </FormLabel>
              <FormControl>
                <Input placeholder="No phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center gap-x-2">
                  <Mail className="size-4" />
                  Email address
                </div>
              </FormLabel>
              <FormControl>
                <Input disabled placeholder="No email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <UpdateLocation form={form} accessToken={userAccessToken} />
        <FormField
          name="website"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex items-center gap-x-2">
                  <LinkIcon className="size-4" />
                  Website
                </div>
              </FormLabel>
              <FormControl>
                <Input placeholder="No website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="main"
          className="w-full"
          disabled={!form.formState.isDirty || isPending}
        >
          Update
        </Button>
      </form>
    </Form>
  )
}

EditFacebookProfileForm.Skeleton = function EditFacebookProfileFormSkeleton() {
  return (
    <div className="space-y-4">
      <div>
        <FormLabel>Bio</FormLabel>
        <Skeleton className="h-20 w-full" />
      </div>

      <div>
        <FormLabel>Category</FormLabel>
        <Skeleton className="h-10 w-full" />
      </div>

      <div>
        <FormLabel>
          <div className="flex items-center gap-x-2">
            <Phone className="size-4" />
            Phone
          </div>
        </FormLabel>
        <Skeleton className="h-10 w-full" />
      </div>

      <div>
        <FormLabel>
          <div className="flex items-center gap-x-2">
            <Mail className="size-4" />
            Email address
          </div>
        </FormLabel>
        <Skeleton className="h-10 w-full" />
      </div>

      <div>
        <FormLabel>
          <div className="flex items-center gap-x-2">
            <Home className="size-4" />
            Address
          </div>
        </FormLabel>
        <Skeleton className="h-10 w-full" />
      </div>

      <div>
        <FormLabel>
          <div className="flex items-center gap-x-2">
            <LinkIcon className="size-4" />
            Website
          </div>
        </FormLabel>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

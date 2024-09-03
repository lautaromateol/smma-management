"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AddClient } from "@/actions/add-client/schema"
import { EditClient } from "@/actions/edit-client/schema"
import { addClient } from "@/actions/add-client"
import { editClient } from "@/actions/edit-client"
import { useAction } from "@/hooks/use-action"
import { useOpenModal } from "@/hooks/use-open-modal"
import { toast } from "sonner"

export function ClientsForm({ editValues = {} }) {

  const { id } = editValues

  const isEditSession = Boolean(id)

  const { onClose } = useOpenModal((state) => state)

  const form = useForm({
    resolver: zodResolver(isEditSession ? EditClient : AddClient),
    defaultValues:
      isEditSession
        ?
        { ...editValues }
        :
        {}
  })

  const { execute: executeCreate, isPending: isCreating } = useAction(addClient, {
    onSuccess: (data) => {
      toast.success(`Client "${data.name}" added to database`)
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  const { execute: executeEdit, isPending: isEditing } = useAction(editClient, {
    onSuccess: (data) => {
      toast.success(`Client "${data.name}" edited successfully`)
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  function onSubmit(data) {
    isEditSession ? executeEdit({ ...data }) : executeCreate({ ...data })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website (optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="main"
          className="w-full"
          disabled={isCreating || isEditing || !form.formState.isDirty}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

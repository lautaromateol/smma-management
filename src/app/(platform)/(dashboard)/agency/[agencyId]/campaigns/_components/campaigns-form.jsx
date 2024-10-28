"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Platforms } from "@prisma/client"
import { useState } from "react"
import { CalendarIcon, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { AddCampaign } from "@/actions/add-campaign/schema"
import { useAction } from "@/hooks/use-action"
import { addCampaign } from "@/actions/add-campaign"
import { toast } from "sonner"
import { useOpenModal } from "@/hooks/use-open-modal"
import { EditCampaign } from "@/actions/edit-campaign/schema"
import { editCampaign } from "@/actions/edit-campaign"
import { Textarea } from "@/components/ui/textarea"

export function CampaignsForm({ editValues = {}, clients }) {

  const { onClose } = useOpenModal((state) => state)

  const { id } = editValues

  const isEditSession = Boolean(id)

  const [selectedPlatforms, setSelectedPlatforms] = useState(isEditSession ? editValues.platforms : [])

  const form = useForm({
    resolver: zodResolver(isEditSession ? EditCampaign : AddCampaign),
    defaultValues: isEditSession ?
      {
        ...editValues,
        budget: String(editValues.budget)
      }
      :
      {
        platforms: []
      }
  })

  const { execute, isPending } = useAction(addCampaign, {
    onSuccess: () => {
      toast.success("Campaign created successfully!")
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  const { execute: executeEdit, isPending: isEditing } = useAction(editCampaign, {
    onSuccess: () => {
      toast.success("Campaign edited successfully!")
      onClose()
    },
    onError: (error) => toast.error(error)
  })

  function handleSelectPlatform(platform) {
    selectedPlatforms.includes(platform) ?
      setSelectedPlatforms((prev) => {
        form.setValue("platforms", prev.filter((p) => p !== platform))
        return prev.filter((p) => p !== platform)
      }) :
      setSelectedPlatforms((prev) => {
        form.setValue("platforms", [...prev, platform])
        return [...prev, platform]
      })
  }

  function onSubmit(data) {
    isEditSession ? executeEdit(data) : execute(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campaign name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!isEditSession && <FormField
          control={form.control}
          name="client"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign a client to this campaign" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem value={client.id} key={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />}
        {isEditSession &&
          <FormItem>
            <FormLabel>Client</FormLabel>
            <Input disabled defaultValue={editValues.client.name} />
          </FormItem>
        }
        <FormField
          control={form.control}
          name="platforms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platforms</FormLabel>
              <Select multiple disabled={isEditSession} onValueChange={handleSelectPlatform}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedPlatforms.length > 0 ? selectedPlatforms.join("-") : "Select the platforms to run this campaign"}>
                      {selectedPlatforms.length > 0 ? selectedPlatforms.join("-") : "Select the platforms to run this campaign"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from(Object.keys(Platforms)).map((platform, i) => (
                    <SelectItem hideCheck value={platform} key={i}>
                      {selectedPlatforms.includes(platform) ?
                        <div className="flex items-center gap-x-2">
                          {platform}
                          <Check className="size-4" />
                        </div>
                        : platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="objective"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objective</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => form.getValues().start ? date < new Date(form.getValues().start) : date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="main"
          className="w-full"
          disabled={isPending || isEditing || !form.formState.isDirty}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}

CampaignsForm.Skeleton = function CampaignsFormSkeleton() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="space-y-2">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-full h-14" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-full h-14" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-full h-14" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-full h-14" />
      </div>
      <div className="space-y-2">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-full h-14" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
"use client"
import { cloneElement, useState } from "react"
import { useForm } from "react-hook-form"
import { FaMeta } from "react-icons/fa6"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "@/hooks/use-action"
import { useOpenModal } from "@/hooks/use-open-modal"
import { cn } from "@/lib/utils"
import { AddCampaign } from "@/actions/add-campaign/schema"
import { addCampaign } from "@/actions/add-campaign"
import { EditCampaign } from "@/actions/edit-campaign/schema"
import { editCampaign } from "@/actions/edit-campaign"
import { objectives } from "@/constants/campaign-objectives"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

export function CampaignsForm({ editValues = {}, clients }) {

  const [step, setStep] = useState(1)
  const [objective, setObjective] = useState("")

  const { onClose } = useOpenModal((state) => state)

  const { id } = editValues

  const isEditSession = Boolean(id)

  const form = useForm({
    resolver: zodResolver(isEditSession ? EditCampaign : AddCampaign),
    defaultValues: isEditSession ?
      {
        ...editValues,
        budget: String(editValues.budget)
      }
      :
      {
        platform: "META"
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

  function handleSelectObjective(value) {
    setObjective(value)
    form.setValue("objective", value)
    setStep(2)
  }

  function onSubmit(data) {
    isEditSession ? executeEdit(data) : execute(data)
  }

  if (step === 1) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Choose a goal</h2>
        <div className="grid grid-cols-4 gap-2">
          {objectives.map(({ title, objective, description, icon }, i) => (
            <AddGoalCard
              key={i}
              title={title}
              description={description}
              icon={icon}
              onClick={() => handleSelectObjective(objective)}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormLabel>Objective</FormLabel>
          <Input disabled value={objectives.filter((obj) => obj.objective === objective)[0].title} />
        </div>
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
          name="platform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Platform</FormLabel>
              <FormDescription>Meta will be applied by default.</FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="META">
                    <div className="flex items-center gap-x-2">
                      <FaMeta className="size-4" />
                      Meta
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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
    <div className="grid grid-cols-4 gap-2">
      <Skeleton className="w-60 h-40" />
      <Skeleton className="w-60 h-40" />
      <Skeleton className="w-60 h-40" />
      <Skeleton className="w-60 h-40" />
      <Skeleton className="w-60 h-40" />
      <Skeleton className="w-60 h-40" />
    </div>
  )
}

function AddGoalCard({ title, description, icon, onClick }) {

  const [onHover, setOnHover] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      role="button"
      className={cn(
        "flex flex-col space-y-2 py-6 px-4 shadow rounded-md",
        onHover && "bg-neutral-100"
      )}
    >
      <div className="grid place-content-center size-12 p-4 rounded-full bg-muted">
        {cloneElement(icon, { className: "size-8" })}
      </div>
      <p className="text-base font-medium">
        {title}
      </p>
      {onHover && <p className="text-sm font-light">{description}</p>}
    </div>
  )
}
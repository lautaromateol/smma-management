"use client"
import { cloneElement, useState } from "react"
import { useForm } from "react-hook-form"
import { FaMeta } from "react-icons/fa6"
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
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { SetCampaignBudget } from "."

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
        client_id: editValues.clientId,
        budget: String(editValues.budget)
      }
      :
      {
        platform: "META"
      }
  })

  const { errors, dirtyFields, isDirty } = form.formState

  console.log(errors)

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

    if (isEditSession) {

      const payload = {}

      for (let prop of Object.keys(data)) {
        if (dirtyFields[prop]) {
          payload[prop] = data[prop]
        }
      }

      executeEdit({ ...payload, id, client_id: editValues.clientId })
      return
    }

    execute(data)
  }

  if (step === 1 && !isEditSession) {
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
        {!isEditSession ?
          <div className="space-y-2">
            <FormLabel>Objective</FormLabel>
            <Input disabled value={objectives.filter((obj) => obj.objective === objective)[0].title} />
          </div>
          :
          <div className="space-y-2">
            <FormLabel>Objective</FormLabel>
            <Input disabled value={objectives.filter((obj) => obj.objective === editValues.objective)[0].title} />
          </div>
        }

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
        <SetCampaignBudget form={form} message={errors?.budget?.message} isEditSession={isEditSession} />
        <Button
          type="submit"
          variant="main"
          className="w-full"
          disabled={isPending || isEditing || !isDirty}
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
        "flex flex-col space-y-2 py-6 px-4 shadow",
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
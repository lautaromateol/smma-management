"use client"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { AdSet } from "@/actions/publish-ad-set/schema";
import { AdSetToUpdate } from "@/actions/update-ad-set/schema";
import { publishAdSet } from "@/actions/publish-ad-set";
import { updateAdSet as updateAdSetAction } from "@/actions/update-ad-set";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AgeSegmentation } from "./ads/age-segmentation";
import { Locales, Locations, OptimizationGoal, ScheduleAdSet } from "./ads";

export function MetaAdSetForm({ data, editValues = {} }) {

    const { id, bid_amount, end_time, targeting } = editValues

    const isEditSession = Boolean(id)

    const { campaign, pageAccessToken } = data

    const { onClose } = useOpenModal((state) => state)

    const form = useForm({
        resolver: zodResolver(isEditSession ? AdSetToUpdate : AdSet),
        defaultValues: isEditSession ?
            {
                ...editValues,
                id,
                client: campaign.clientId,
                campaign_id: campaign.id,
                access_token: pageAccessToken,
                bid_amount: (bid_amount / 100).toString(),
                end_time: new Date(end_time),
                targeting: { ...targeting, age_min: targeting?.age_min.toString() }
            }
            :
            {
                client: campaign.clientId,
                campaign_id: campaign.id,
                access_token: pageAccessToken,
                status: "PAUSED",
                billing_event: "IMPRESSIONS",
                targeting: { ...targeting, age_min: "18" }
            }
    })

    const { errors, isDirty, dirtyFields } = form.formState

    console.log(errors)

    const { execute: postAdSet, isPending: isPostingAdSet } = useAction(publishAdSet, {
        onSuccess: () => {
            toast.success("Ad Set created successfully!")
            onClose()
        },
        onError: (error) => toast.error(error)
    })

    const { execute: updateAdSet, isPending: isUpdatingAdSet } = useAction(updateAdSetAction, {
        onSuccess: () => {
            toast.success("Ad Set updated successfully!")
            onClose()
        },
        onError: (error) => toast.error(error)
    })

    function onSubmit(data) {
        if (isEditSession) {
            const payload = {}

            for (let prop of Object.keys(data)) {
                if (dirtyFields[prop]) {
                    payload[prop] = data[prop]
                }
            }

            updateAdSet(data)
            return
        }
        
        postAdSet(data)
    }

    return (
        <div className="bg-main-light p-8 max-w-5xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                    <div className="bg-white p-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ad Set Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <OptimizationGoal data={data} form={form} />
                    <ScheduleAdSet form={form} isEditSession={isEditSession} />
                    <div className="bg-white p-4 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <FormLabel>Audience controls</FormLabel>
                            <FormDescription>Set criteria for where ads for this campaign can be delivered.</FormDescription>
                        </div>
                        <Locations form={form} isEditSession={isEditSession} />
                        <Locales data={data} form={form} />
                        <AgeSegmentation form={form} message={errors?.targeting?.message} />
                    </div>
                    <Button
                        disabled={isPostingAdSet || isUpdatingAdSet || !isDirty}
                        type="submit"
                        variant="main"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}
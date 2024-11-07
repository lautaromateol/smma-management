"use client"
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "@/hooks/use-action";
import { useOpenModal } from "@/hooks/use-open-modal";
import { AdSet } from "@/actions/publish-ad-set/schema";
import { publishAdSet } from "@/actions/publish-ad-set";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Locales, Locations, OptimizationGoal, ScheduleAdSet } from "./ads";
import { AgeSegmentation } from "./ads/age-segmentation";

export function MetaAdForm({ data }) {

    const { campaign, pageAccessToken } = data

    const { onClose } = useOpenModal((state) => state)

    const form = useForm({
        resolver: zodResolver(AdSet),
        defaultValues: {
            client: campaign.clientId,
            campaign_id: campaign.id,
            access_token: pageAccessToken,
            status: "PAUSED",
            billing_event: "IMPRESSIONS"
        }
    })

    const { errors } = form.formState

    console.log(errors)

    const { execute, isPending } = useAction(publishAdSet, {
        onSuccess: () => {
            toast.success("Ad Set created successfully")
            onClose()
        },
        onError: (error) => toast.error(error)
    })

    function onSubmit(data) {
        // console.log(data)
        execute(data)
    }

    return (
        <div className="bg-main-light p-8 max-w-5xl">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4">
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
                    <ScheduleAdSet form={form} />
                    <div className="bg-white p-4 space-y-4">
                        <div className="flex flex-col space-y-2">
                            <FormLabel>Audience controls</FormLabel>
                            <FormDescription>Set criteria for where ads for this campaign can be delivered.</FormDescription>
                        </div>
                        <Locations data={data} form={form} />
                        <Locales data={data} form={form} />
                        <AgeSegmentation form={form} />
                    </div>
                    <Button
                        disabled={isPending}
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
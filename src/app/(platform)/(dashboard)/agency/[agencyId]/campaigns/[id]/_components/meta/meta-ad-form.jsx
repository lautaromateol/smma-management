"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdSet } from "@/actions/publish-ad-set/schema";
import { Locales, Locations, OptimizationGoal, ScheduleAdSet } from "./ads";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function MetaAdForm({ data }) {

    const { campaign } = data

    const form = useForm({
        resolver: zodResolver(AdSet),
        defaultValues: {
            status: "ACTIVE",
            campaign_id: campaign.id
        }
    })

    const { errors } = form.formState

    console.log(errors)

    function onSubmit(data) {
        console.log(data)
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
                    </div>
                    <Button
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
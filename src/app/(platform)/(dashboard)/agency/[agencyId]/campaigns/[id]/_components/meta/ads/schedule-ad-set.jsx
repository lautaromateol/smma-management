import { useState } from "react";
import { PopoverWrapper } from "@/components/popover-wrapper";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export function ScheduleAdSet({ form }) {

  const [showPopover, setShowPopover] = useState(false)

  return (
    <div className="bg-white p-4 space-y-4">
      <div className="flex items-center gap-x-1">
        <FormLabel>Schedule</FormLabel>
        <PopoverWrapper
          open={showPopover}
          onOpenChange={setShowPopover}
          align="right"
          trigger={
            <Button
              type="button"
              variant="ghost"
              className="p-0"
              onMouseEnter={() => setShowPopover(true)}
              onMouseLeave={() => setShowPopover(false)}
            >
              <Info
                className="size-4" />
            </Button>
          }
        >
          <p className="font-semibold text-sm mb-2">When using a lifetime campaign budget</p>
          <p className="text-sm mb-1">Ad set schedules affect the distribution of a lifetime campaign budget. Days with more opportunities receive more budget, so the amount spent per day will fluctuate.</p>
        </PopoverWrapper>
      </div>
      <FormField
        control={form.control}
        name="start_time"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start date</FormLabel>
            <PopoverWrapper
              className="w-auto p-0"
              align="start"
              trigger={
                <FormControl>
                  <Button
                    variant="outline"
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
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </FormControl>
              }
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverWrapper>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="end_time"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>End date</FormLabel>
            <PopoverWrapper
              className="w-auto p-0"
              align="start"
              trigger={
                <FormControl>
                  <Button
                    variant="outline"
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
                    <CalendarIcon className="ml-auto size-4 opacity-50" />
                  </Button>
                </FormControl>
              }
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => form.getValues().start_time ? date < new Date(form.getValues().start_time) : date < new Date()}
                initialFocus
              />
            </PopoverWrapper>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

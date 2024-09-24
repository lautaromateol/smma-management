"use client"
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'

export function SchedulePost({ form, message }) {
  
  const [scheduled, setScheduled] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState(null) 

  function onChange(value) {
    setScheduled(value)
    form.setValue("published", !value)
  }

  function handleDateChange(date) {
    if (selectedDateTime) {
      const updatedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        selectedDateTime.getHours(),
        selectedDateTime.getMinutes()
      )
      setSelectedDateTime(updatedDateTime)
      form.setValue("scheduled_publish_time", updatedDateTime) 
      form.setValue("unpublished_content_type", "SCHEDULED")
    } else {
      setSelectedDateTime(date)
      form.setValue("scheduled_publish_time", date)
      form.setValue("unpublished_content_type", "SCHEDULED")
    }
  }

  function handleTimeChange(event) {
    const time = event.target.value.split(":")
    const hours = parseInt(time[0], 10)
    const minutes = parseInt(time[1], 10)

    if (selectedDateTime) {
      const updatedDateTime = new Date(
        selectedDateTime.getFullYear(),
        selectedDateTime.getMonth(),
        selectedDateTime.getDate(),
        hours,
        minutes
      )
      setSelectedDateTime(updatedDateTime)
      form.setValue("scheduled_publish_time", updatedDateTime)
      form.setValue("unpublished_content_type", "SCHEDULED")
    } else {
      const now = new Date()
      const newDateTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
      setSelectedDateTime(newDateTime)
      form.setValue("scheduled_publish_time", newDateTime)
      form.setValue("unpublished_content_type", "SCHEDULED")
    }
  }

  return (
    <div className="bg-white space-y-4 p-4">
      <div className="flex items-center justify-between">
        <FormLabel>Scheduling options</FormLabel>
        <div className="flex items-center gap-x-2">
          <p className="text-sm">Program date and time</p>
          <Switch checked={scheduled} onCheckedChange={onChange} />
        </div>
      </div>
      {scheduled && (
        <div className="space-y-2">
          <p className="text-sm">Select a date and time in the future to publish your post.</p>
          <FormField
            control={form.control}
            name="scheduled_publish_time"
            render={({ field }) => (
              <FormItem className={cn("flex flex-col",
                message && "text-destructive"
              )}>
                <FormLabel className="flex items-center gap-x-2">
                  Pick a date
                </FormLabel>
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
                        {selectedDateTime ? (
                          format(selectedDateTime, "PPP p") // Muestra fecha y hora
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
                      selected={selectedDateTime}
                      onSelect={handleDateChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="space-y-2 mt-2">
                  <FormLabel>Pick a time</FormLabel>
                  <Input
                    type="time"
                    onChange={handleTimeChange}
                  />
                </div>

                <FormMessage>
                  {message ? message : ""}
                </FormMessage>
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  )
}

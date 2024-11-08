import { useEffect, useState } from "react";
import { Info } from "lucide-react";
import { PopoverWrapper } from "@/components/popover-wrapper";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AgeSegmentation({ form }) {

  const [showPopover, setShowPopover] = useState(false)

  function handleAgeChange(value) {
    const targeting = form.getValues()?.targeting

    const newTargetingObj = {
      ...targeting,
      age_min: value
    }

    form.setValue("targeting", newTargetingObj)
  }

  useEffect(() => {
    const targeting = form.getValues()?.targeting
    if (!targeting?.age_min) {
      form.setValue("targeting.age_min", 18)
    }
  }, [form])

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-x-1">
        <FormLabel>Minimum age</FormLabel>
        <PopoverWrapper
          open={showPopover}
          onOpenChange={setShowPopover}
          trigger={
            <Button
              type="button"
              variant="ghost"
              className="p-0"
              onMouseEnter={() => setShowPopover(true)}
              onMouseLeave={() => setShowPopover(false)}
            >
              <Info className="size-4" />
            </Button>
          }
        >
          <p className="text-sm">Without an upper age limit, our system can show your ads to a broader audience, which can improve results. You can&apos;t select a minimum age below 18 globally, 20 in Thailand or 21 in Indonesia.</p>
        </PopoverWrapper>
      </div>
      <FormField
        control={form.control}
        name="targeting.age_min"
        render={({ field }) => (
          <FormItem>
            <Select
              onValueChange={(value) => {
                field.onChange(value)
                handleAgeChange(value)
              }}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue>
                    {field.value ? field.value : "Select an age"}
                  </SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => i + 18).map((num) => (
                  <SelectItem key={num} value={num}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  )
}

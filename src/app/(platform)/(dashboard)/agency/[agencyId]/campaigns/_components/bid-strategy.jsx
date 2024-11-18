import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { bidStrategies } from "@/constants/bid-strategies";

export function BidStrategy({ form, objective }) {
  return (
    <FormField
      control={form.field}
      name="bid_strategy"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Bid strategy</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a bid strategy">
                  {bidStrategies.find((item) => item.key === field.value)?.title ?? "Select a bid strategy"}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {bidStrategies.filter((item) => item.compatible_objectives.includes(objective)).map((item) => (
                <SelectItem key={item.key} value={item.key}>
                  <div className="space-y-0.5">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs">{item.description}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

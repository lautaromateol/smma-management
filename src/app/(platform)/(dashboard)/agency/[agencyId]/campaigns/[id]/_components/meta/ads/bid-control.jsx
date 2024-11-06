import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function BidControl({ form }) {
  return (
    <div className="flex flex-col gap-y-2">
      <FormField
        name="bid_amount"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bid control</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormDescription>Meta will aim to get the most 1,000 impressions without bidding more than your bid amount in any auction using the bid cap bid strategy.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

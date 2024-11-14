import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BidStrategy as BidStrategies } from "@prisma/client";

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
                  {field.value ? field.value : "Select a bid strategy"}
                </SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={BidStrategies.LOWEST_COST_WITH_BID_CAP}>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">Bid cap</p>
                  <p className="text-xs">Set the highest that you want to bid in any auction.</p>
                </div>
              </SelectItem>
              <SelectItem value={BidStrategies.LOWEST_COST_WITHOUT_CAP}>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">Highest volume</p>
                  <p className="text-xs">Get the most results for your budget.</p>
                </div>
              </SelectItem>
              <SelectItem value={BidStrategies.COST_CAP}>
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">Cost per result goal</p>
                  <p className="text-xs">Aim for a certain cost per result while maximising the volume of results.</p>
                </div>
              </SelectItem>
              {objective === "OUTCOME_SALES" || objective === "OUTCOME_APP_PROMOTION" &&
                <SelectItem value={BidStrategies.LOWEST_COST_WITH_MIN_ROAS}>
                  <div className="space-y-0.5">
                    <p className="font-medium text-sm">ROAS goal</p>
                    <p className="text-xs">Aim for a certain return on ad spend while maximising the value of results.</p>
                  </div>
                </SelectItem>}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  )
}

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { optimizationGoalsInfo } from "@/constants/optimization-goals-info";
import { BidControl } from ".";

export function OptimizationGoal({ data, form }) {

  const { optimizationGoals, objectiveTitle } = data

  return (
    <div className="bg-white p-4 space-y-4">
      <FormLabel>{objectiveTitle}</FormLabel>
      <div className="flex flex-col gap-y-2">
        <FormField
          control={form.control}
          name="optimization_goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Performance Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a goal">
                      {field.value
                        ? optimizationGoalsInfo.find((item) => item.goal === field.value).title
                        : "Select a goal"
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    optimizationGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        <div className="flex flex-col gap-y-0.5">
                          <p className="text-sm">{optimizationGoalsInfo.find((item) => item.goal === goal).title}</p>
                          <p className="text-xs">{optimizationGoalsInfo.find((item) => item.goal === goal).description}</p>
                        </div>
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <BidControl form={form} />
    </div>
  )
}

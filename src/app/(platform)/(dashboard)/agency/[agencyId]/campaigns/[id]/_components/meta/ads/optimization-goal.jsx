"use client"
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { optimizationGoalsInfo } from "@/constants/optimization-goals-info";
import { BidControl, ConversionLocation, PromotedObject } from ".";
import { objectives } from "@/constants/campaign-objectives";

export function OptimizationGoal({ data, form }) {

  const { campaign } = data
  const { objective, bid_strategy } = campaign

  const campaignObjective = objectives.find((item) => item.objective === objective)
  const hasConversionLocation = campaignObjective.has_conversion_location
  const locations = hasConversionLocation ? campaignObjective.conversion_locations.find((item) => item.bid_strategy === bid_strategy).locations : []

  const [location, setLocation] = useState(hasConversionLocation ? locations[0].key : "")

  const optimizationGoals = hasConversionLocation ? locations.find((item) => item.key === location).optimization_goals : campaignObjective.optimization_goals.find((item) => item.bid_strategy === bid_strategy).goals
  const relatedGoals = hasConversionLocation ? locations.find((item) => item.key === location).related_goals : []

  return (
    <div className="bg-white p-4 space-y-2">
      {hasConversionLocation ?
        <>
          <FormLabel>Conversion</FormLabel>
          <ConversionLocation location={location} setLocation={setLocation} locations={locations} />
        </>
        :
        <FormLabel>{campaignObjective.title}</FormLabel>
      }
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
                  hasConversionLocation ?
                    <>
                      <SelectGroup>
                        <SelectLabel>Primary goals</SelectLabel>
                        {optimizationGoals.map((goal) => (
                          <SelectItem key={goal} value={goal}>
                            <div className="flex flex-col gap-y-0.5">
                              <p className="text-sm">{optimizationGoalsInfo.find((item) => item.goal === goal).title}</p>
                              <p className="text-xs">{optimizationGoalsInfo.find((item) => item.goal === goal).description}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      {
                        relatedGoals && (
                          <SelectGroup>
                            <SelectLabel>Other Goals</SelectLabel>
                            {
                              relatedGoals.map((goal) => (
                                <SelectItem key={goal} value={goal}>
                                  <div className="flex flex-col gap-y-0.5">
                                    <p className="text-sm">{optimizationGoalsInfo.find((item) => item.goal === goal).title}</p>
                                    <p className="text-xs">{optimizationGoalsInfo.find((item) => item.goal === goal).description}</p>
                                  </div>
                                </SelectItem>
                              ))
                            }
                          </SelectGroup>
                        )
                      }
                    </>
                    :
                    <>
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
                    </>
                }
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {hasConversionLocation && <PromotedObject form={form} location={location} data={data} />}
      <BidControl form={form} />
    </div>
  )
}

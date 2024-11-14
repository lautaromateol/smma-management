"use client"
import { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { optimizationGoalsInfo } from "@/constants/optimization-goals-info";
import { BidControl, ConversionLocation, PromotedObject } from ".";
import { conversionLocation } from "@/constants/conversion-location";

export function OptimizationGoal({ data, form }) {

  const [location, setLocation] = useState("Messaging apps")
  const { optimizationGoals, objectiveTitle, campaign } = data
  const { objective } = campaign

  const isTraffic = objective === "OUTCOME_TRAFFIC"
  const selectedLocation = conversionLocation.find((item) => item.title === location)

  return (
    <div className="bg-white p-4 space-y-2">
      {isTraffic ?
        <>
          <FormLabel>Conversion</FormLabel>
          <ConversionLocation location={location} setLocation={setLocation} />
        </>
        :
        <FormLabel>{objectiveTitle}</FormLabel>
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
                  isTraffic ?
                    <>
                      <SelectGroup>
                        <SelectLabel>Traffic goals</SelectLabel>
                        {selectedLocation.related_goals.map((goal) => (
                          <SelectItem key={goal} value={goal}>
                            <div className="flex flex-col gap-y-0.5">
                              <p className="text-sm">{optimizationGoalsInfo.find((item) => item.goal === goal).title}</p>
                              <p className="text-xs">{optimizationGoalsInfo.find((item) => item.goal === goal).description}</p>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      {
                        selectedLocation.secondary_goals && (
                          <SelectGroup>
                            <SelectLabel>Other Goals</SelectLabel>
                            {
                              selectedLocation.secondary_goals.map((goal) => (
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
      {isTraffic && <PromotedObject form={form} location={location} data={data} />}
      <BidControl form={form} />
    </div>
  )
}

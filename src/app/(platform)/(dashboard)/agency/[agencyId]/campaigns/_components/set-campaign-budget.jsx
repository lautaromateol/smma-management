"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/lib/format-number";
import { FormDescription, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function SetCampaignBudget({ form, message, isEditSession }) {

  const formBudgetType = form?.getValues()?.lifetime_budget ? "lifetime_budget" : "daily_budget"
  const formBudget = form?.getValues()?.lifetime_budget ? form?.getValues().lifetime_budget : form?.getValues()?.daily_budget ? form?.getValues()?.daily_budget : 0

  const [budgetType, setBudgetType] = useState(formBudgetType)
  const [budget, setBudget] = useState(formBudget)

  function handleBudgetTypeChange(type) {
    setBudgetType((prev) => {
      form.unregister(prev)
      return type
    })
    form.setValue(type, budget, { shouldDirty: true })
  }

  function handleBudgetChange(e) {
    const value = e.target.value;
    setBudget(value)
    form.setValue(budgetType, value, { shouldDirty: true });
  }

  return (
    <div className="space-y-2">
      <FormLabel className={cn(message && !form.getValues(budgetType) && "text-destructive")}>
        Campaign Budget
      </FormLabel>
      <div className="flex items-center gap-x-0.5">
        <Select onValueChange={handleBudgetTypeChange} value={budgetType} disabled={isEditSession}>
          <SelectTrigger>
            <SelectValue placeholder="Choose budget type">
              {budgetType === "daily_budget" ? "Daily budget" : "Lifetime budget"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily_budget">Daily budget</SelectItem>
            <SelectItem value="lifetime_budget">Lifetime budget</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          placeholder="$500.00"
        />
      </div>
      <FormDescription>
        {budgetType === "daily_budget" ?
          `You'll spend an average of ${formatNumber(budget)} per day and your maximum weekly spend is ${formatNumber(budget * 7)}` :
          `You won't spend more than ${formatNumber(budget)} during the lifetime of your campaign. You'll spend more on days with more opportunities and less on days with fewer opportunities.`}
      </FormDescription>
      {message && !form.getValues(budgetType) && <FormMessage>{message}</FormMessage>}
    </div>
  );
}

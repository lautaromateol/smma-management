"use client"
import { LabelList, Pie, PieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { CardWrapper } from "../../../_components/card-wrapper"

export const description = "A pie chart with a label list"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export function BudgetDistribution() {
  return (
    <CardWrapper
      title="Budget distribution"
      description="A pie chart graphic with your expenses distribution by social platform."
      className="col-span-1 border-none"
    >
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[250px]"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="visitors" hideLabel />}
          />
          <Pie data={chartData} dataKey="visitors">
            <LabelList
              dataKey="browser"
              className="fill-background"
              stroke="none"
              fontSize={12}
              formatter={(value) =>
                chartConfig[value]?.label
              }
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </CardWrapper>
  )
}

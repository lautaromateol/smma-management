"use client"
import { CardWrapper } from "@/components/card-wrapper"
import { TrendingDown, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
    icon: TrendingDown,
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
    icon: TrendingUp,
  },
}

export function InvestmentROI() {
  return (
    <CardWrapper
      title="Investment vs ROI"
      description="Compare your campaigns investments with your obtained results based on your Return of Investment."
      className="border-none"
      // footer={
      //   <div className="flex w-full items-start gap-2 text-sm">
      //     <div className="grid gap-2">
      //       <div className="flex items-center gap-2 font-medium leading-none">
      //         Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
      //       </div>
      //       <div className="flex items-center gap-2 leading-none text-muted-foreground">
      //         January - June 2024
      //       </div>
      //     </div>
      //   </div>
      // }
    >
      <ChartContainer config={chartConfig}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Area
            dataKey="mobile"
            type="natural"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            stackId="a"
          />
          <Area
            dataKey="desktop"
            type="natural"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            stackId="a"
          />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </CardWrapper>
  )
}


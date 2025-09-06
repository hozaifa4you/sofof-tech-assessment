"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   type ChartConfig,
   ChartContainer,
   ChartLegend,
   ChartLegendContent,
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A stacked bar chart with a legend";

const chartData = [
   { month: "Friday", created: 186, done: 80 },
   { month: "Saturday", created: 305, done: 200 },
   { month: "Sunday", created: 237, done: 120 },
   { month: "Monday", created: 73, done: 190 },
   { month: "Tuesday", created: 209, done: 130 },
   { month: "Wednesday", created: 214, done: 140 },
   { month: "Thursday", created: 214, done: 140 },
];

const chartConfig = {
   created: {
      label: "Created",
      color: "var(--chart-1)",
   },
   done: {
      label: "Done",
      color: "var(--chart-2)",
   },
} satisfies ChartConfig;

export function TodoBarChart() {
   return (
      <Card>
         <CardHeader>
            <CardTitle>Weekly Todos</CardTitle>
            <CardDescription>
               {new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString()} -{" "}
               {new Date().toDateString()}
            </CardDescription>
         </CardHeader>
         <CardContent>
            <ChartContainer config={chartConfig}>
               <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="month"
                     tickLine={false}
                     tickMargin={10}
                     axisLine={false}
                     tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar
                     dataKey="created"
                     stackId="a"
                     fill="var(--color-created)"
                     radius={[0, 0, 4, 4]}
                  />
                  <Bar
                     dataKey="done"
                     stackId="a"
                     fill="var(--color-done)"
                     radius={[4, 4, 0, 0]}
                  />
               </BarChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
               Showing last week todo report (created vs done)
            </div>
         </CardFooter>
      </Card>
   );
}

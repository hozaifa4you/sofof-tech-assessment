"use client";
import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";
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
   ChartTooltip,
   ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A pie chart with a label list";

const chartData = [
   { status: "pending", todos: 275, fill: "var(--color-pending)" },
   { status: "done", todos: 200, fill: "var(--color-done)" },
   { status: "in_progress", todos: 187, fill: "var(--color-in_progress)" },
   { status: "canceled", todos: 173, fill: "var(--color-canceled)" },
];

const chartConfig = {
   todos: {
      label: "Todos",
   },
   pending: {
      label: "Pending",
      color: "var(--chart-1)",
   },
   done: {
      label: "Done",
      color: "var(--chart-2)",
   },
   in_progress: {
      label: "In Progress",
      color: "var(--chart-3)",
   },
   canceled: {
      label: "Canceled",
      color: "var(--chart-4)",
   },
} satisfies ChartConfig;

export function TodoStatusReport() {
   return (
      <Card className="flex flex-col">
         <CardHeader className="items-center pb-0">
            <CardTitle>Todo Status Report</CardTitle>
            <CardDescription>Whole report of your todo status</CardDescription>
         </CardHeader>
         <CardContent className="flex-1 pb-0">
            <ChartContainer
               config={chartConfig}
               className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
            >
               <PieChart>
                  <ChartTooltip
                     content={<ChartTooltipContent nameKey="todos" hideLabel />}
                  />
                  <Pie data={chartData} dataKey="todos">
                     <LabelList
                        dataKey="status"
                        className="fill-background"
                        stroke="none"
                        fontSize={12}
                        formatter={(value: keyof typeof chartConfig) =>
                           chartConfig[value]?.label
                        }
                     />
                  </Pie>
               </PieChart>
            </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
               Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
               Showing whole time todo status report
            </div>
         </CardFooter>
      </Card>
   );
}

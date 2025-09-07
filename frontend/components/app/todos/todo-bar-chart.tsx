"use client";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
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
import { env } from "@/config/env";
import { useSession } from "@/hooks/use-session";

export const description = "A stacked bar chart with a legend";

interface WeeklyAnalyticsData {
   month: string;
   created: number;
   done: number;
   date: string;
}

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
   const session = useSession();
   const [data, setData] = useState<WeeklyAnalyticsData[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchChartData = async () => {
         if (!session?.access_token) {
            setLoading(false);
            return;
         }

         try {
            setLoading(true);
            setError(null);

            const response = await fetch(
               `${env.nextPublicApiUrl}/api/v1/analytics/weekly-reports`,
               {
                  method: "GET",
                  headers: {
                     "Content-Type": "application/json",
                     Authorization: `Bearer ${session.access_token}`,
                  },
               },
            );

            if (!response.ok) {
               throw new Error(
                  `Failed to fetch chart data: ${response.status}`,
               );
            }

            const weeklyData: WeeklyAnalyticsData[] = await response.json();

            setData(weeklyData);
         } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
         } finally {
            setLoading(false);
         }
      };

      fetchChartData();
   }, [session?.access_token]);

   const calculateTrendPercentage = () => {
      if (data.length < 2) return 0;

      const lastThreeDays = data
         .slice(-3)
         .reduce((sum, day) => sum + day.created + day.done, 0);
      const firstFourDays = data
         .slice(0, 4)
         .reduce((sum, day) => sum + day.created + day.done, 0);

      if (firstFourDays === 0) return 0;

      return ((lastThreeDays - firstFourDays) / firstFourDays) * 100;
   };

   const trendPercentage = calculateTrendPercentage();

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
            {loading ? (
               <div className="flex h-64 items-center justify-center">
                  <div className="text-muted-foreground">
                     Loading chart data...
                  </div>
               </div>
            ) : error ? (
               <div className="flex h-64 items-center justify-center">
                  <div className="text-destructive">Error: {error}</div>
               </div>
            ) : (
               <ChartContainer config={chartConfig}>
                  <BarChart accessibilityLayer data={data}>
                     <CartesianGrid vertical={false} />
                     <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                     />
                     <ChartTooltip
                        content={<ChartTooltipContent hideLabel />}
                     />
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
            )}
         </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
               {trendPercentage >= 0 ? "Trending up" : "Trending down"} by{" "}
               {Math.abs(trendPercentage).toFixed(1)}% this week{" "}
               <TrendingUp
                  className={`h-4 w-4 ${trendPercentage < 0 ? "rotate-180" : ""}`}
               />
            </div>
            <div className="text-muted-foreground leading-none">
               Showing last week todo report (created vs done)
            </div>
         </CardFooter>
      </Card>
   );
}

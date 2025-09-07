"use client";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
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
import { env } from "@/config/env";
import { useSession } from "@/hooks/use-session";

export const description = "A pie chart with a label list";

interface StatusReportData {
   status: string;
   count: number;
}

interface ChartDataItem {
   status: string;
   todos: number;
   fill: string;
}

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

const statusColorMap: Record<string, string> = {
   pending: "var(--color-pending)",
   done: "var(--color-done)",
   in_progress: "var(--color-in_progress)",
   canceled: "var(--color-canceled)",
};

export function TodoStatusReport() {
   const session = useSession();
   const [data, setData] = useState<ChartDataItem[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchStatusData = async () => {
         if (!session?.access_token) {
            setLoading(false);
            return;
         }

         try {
            setLoading(true);
            setError(null);

            const response = await fetch(
               `${env.nextPublicApiUrl}/api/v1/analytics/status-reports`,
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
                  `Failed to fetch status data: ${response.status}`,
               );
            }

            const statusData: StatusReportData[] = await response.json();

            const chartData: ChartDataItem[] = statusData.map((item) => ({
               status: item.status,
               todos: item.count,
               fill: statusColorMap[item.status] || "var(--chart-5)",
            }));

            setData(chartData);
         } catch (err) {
            console.error("Error fetching status data:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
         } finally {
            setLoading(false);
         }
      };

      fetchStatusData();
   }, [session?.access_token]);

   const calculateTotalTodos = () => {
      return data.reduce((sum, item) => sum + item.todos, 0);
   };

   const calculateCompletionRate = () => {
      const total = calculateTotalTodos();
      if (total === 0) return 0;

      const completed = data.find((item) => item.status === "done")?.todos || 0;
      return (completed / total) * 100;
   };

   const totalTodos = calculateTotalTodos();
   const completionRate = calculateCompletionRate();

   return (
      <Card className="flex flex-col">
         <CardHeader className="items-center pb-0">
            <CardTitle>Todo Status Report</CardTitle>
            <CardDescription>
               {totalTodos > 0 ? `${totalTodos} total todos` : "No todos found"}
            </CardDescription>
         </CardHeader>
         <CardContent className="flex-1 pb-0">
            {loading ? (
               <div className="flex h-[250px] items-center justify-center">
                  <div className="text-muted-foreground">
                     Loading status data...
                  </div>
               </div>
            ) : error ? (
               <div className="flex h-[250px] items-center justify-center">
                  <div className="text-destructive">Error: {error}</div>
               </div>
            ) : data.length === 0 ? (
               <div className="flex h-[250px] items-center justify-center">
                  <div className="text-muted-foreground">No data available</div>
               </div>
            ) : (
               <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
               >
                  <PieChart>
                     <ChartTooltip
                        content={
                           <ChartTooltipContent nameKey="todos" hideLabel />
                        }
                     />
                     <Pie data={data} dataKey="todos">
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
            )}
         </CardContent>
         <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
               {completionRate > 0 ? (
                  <>
                     {completionRate.toFixed(1)}% completion rate{" "}
                     <TrendingUp className="h-4 w-4" />
                  </>
               ) : (
                  "No completed todos yet"
               )}
            </div>
            <div className="text-muted-foreground leading-none">
               Showing todo status distribution
            </div>
         </CardFooter>
      </Card>
   );
}

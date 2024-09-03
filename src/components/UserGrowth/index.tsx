"use client";

import { Sparkles, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { InsightsPayload, MetricsData } from "@/shared/types";
import { cn } from "@/shared/utils";
import { userGrowthPrompt } from "@/shared/constants";

const UserGrowth = ({
  metrics,
  className,
  animate = false,
  onInsightClick
}: {
  metrics: MetricsData;
  className?: string;
  animate?: boolean;
  onInsightClick: (data: InsightsPayload) => void
}) => {
  const { userGrowth } = metrics;

  const chartConfig = {
    totalUsers: {
      label: "Total Users",
      color: "hsl(var(--chart-1))",
    },
    activeUsers: {
      label: "Active Users",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const insightPayload = {
    type: "userGrowth",
    label: "User Growth Insights",
    desc: "Here are some tailored insights based on the user growth data.",
    prompt: `${JSON.stringify(userGrowth)} ${userGrowthPrompt}`,
  }

  return (
    <div className={cn("flex flex-col justify-between cardBg p-3", className)}>
      <div className="mb-5 text-white flex flex-wrap justify-between items-center">
        <h2 className="font-semibold">User Growth</h2>
        <button tabIndex={0} className="cardBg p-2 hover:bg-blue-950" onClick={() => onInsightClick(insightPayload)}>
          <Sparkles size={18} className="" />
        </button>
      </div>
      <div className="flex-shrink-0">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={userGrowth}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} stroke="#121214" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
              tick={{ fill: "#fff" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#fff" }}
              domain={["auto", "auto"]}
              tickMargin={10}
              tickFormatter={(value) => (value / 1000).toFixed(1) + "K"}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="totalUsers"
              type="monotone"
              stroke="var(--color-totalUsers)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-totalUsers)",
              }}
              activeDot={{
                r: 6,
              }}
              isAnimationActive={animate}
            />
            <Line
              dataKey="activeUsers"
              type="monotone"
              stroke="var(--color-activeUsers)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-activeUsers)",
              }}
              activeDot={{
                r: 6,
              }}
              isAnimationActive={animate}
            />
          </LineChart>
        </ChartContainer>
      </div>
      <div className="mt-4 flex gap-2">
        <TrendingUp className="h-6 w-6 text-green-400" />
        <div className="text-base text-gray-300">
          Total users are up by{" "}
          <span className="font-semibold text-white px-1"> 11.43% </span> and
          Active users are up by{" "}
          <span className="font-semibold text-white px-1"> 7.35%.</span>
        </div>
      </div>
    </div>
  );
};

export default UserGrowth;

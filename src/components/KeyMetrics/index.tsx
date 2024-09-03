"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MetricsData } from "@/shared/types";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { cn, formatNumber } from "@/shared/utils";

const chartConfig = {
  users: {
    label: "Users",
  },
  active: {
    label: "Active",
    color: "#2EB88A",
  },
  inactive: {
    label: "Offline",
    color: "#E23670",
  },
} satisfies ChartConfig;

const KeyMetrics = ({
  metrics,
  className,
  animate = false
}: {
  metrics: MetricsData;
  className?: string;
  animate?: boolean
}) => {
  const { keyMetrics, activeUsers } = metrics;
  const chartData = [
    {
      browser: "active",
      users: activeUsers.activeUsers,
      fill: "var(--color-active)",
    },
    {
      browser: "inactive",
      users: activeUsers.totalUsers - activeUsers.activeUsers,
      fill: "var(--color-inactive)",
    },
  ];

  const totalUsers = formatNumber(activeUsers.totalUsers);

  return (
    <div
      data-testid="key-metrics-container"
      className={cn("flex flex-col flex-wrap justify-between p-5 cardBg border-0", className)}
    >
      <h2 className="text-white font-semibold text-base">Key Metrics</h2>
      <div data-testid="pie-container" className="flex-1 pb-0 flex-shrink-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data-testid="pie"
              data={chartData}
              dataKey="users"
              nameKey="browser"
              innerRadius={70}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-xl font-bold"
                        >
                          {totalUsers.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-gray-300"
                        >
                          Total Users
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </div>

      <div className="flex flex-wrap gap-2 justify-between">
        <div className="grid w-max px-4 auto-rows-min gap-1">
          <p className="text-sm text-gray-300">Active Users</p>
          <p className="text-xl font-bold leading-none text-white">
            {formatNumber(metrics.activeUsers.activeUsers)}
          </p>
        </div>
        <div className="grid w-max px-4 auto-rows-min gap-1">
          <div className="text-sm text-gray-300">Total Streams</div>
          <div className="text-xl font-bold leading-none text-white">
            {formatNumber(keyMetrics.totalStreams)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;

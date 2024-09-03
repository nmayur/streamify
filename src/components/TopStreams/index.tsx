"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MetricsData } from "@/shared/types";
import { cn } from "@/shared/utils";

const chartConfig = {
  songName: {
    label: "Song Name",
    color: "#2662D9",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const TopStreams = ({
  metrics,
  className,
  animate = false,
}: {
  metrics: MetricsData;
  className?: string;
  animate?: boolean;
}) => {
  return (
    <div className={cn("flex flex-col cardBg p-3", className)}>
      <div className="mb-5 text-white flex flex-wrap justify-between items-center">
        <h2 className="font-semibold">Top Streamed Songs</h2>
      </div>
      <div className="">
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={metrics.topStreamedSongs}
            layout="vertical"
            margin={{
              right: 50,
            }}
          >
            <CartesianGrid horizontal={false} stroke="#121214" />
            <YAxis
              dataKey="songName"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              hide
            />
            <XAxis dataKey="streamCount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="streamCount"
              layout="vertical"
              fill="var(--color-songName)"
              radius={4}
            >
              <LabelList
                dataKey="songName"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="streamCount"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TopStreams;

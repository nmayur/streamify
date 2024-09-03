"use client";

import { BadgeInfo, Sparkles } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn, formatNumber } from "@/shared/utils";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

interface CommonChartProps {
  data: any[];
  config: ChartConfig;
  title: string;
  className?: string;
  description?: string;
  showAiBtn?: boolean;
  onInsightClick?: () => void
}

const CommonPieChart = ({
  data,
  config,
  title,
  className,
  description,
  showAiBtn = false,
  onInsightClick
}: CommonChartProps) => {
  return (
    <div data-testid="common-pie-chart" className={cn("flex flex-col cardBg p-3", className)}>
      <div className="mb-5 text-white flex flex-wrap justify-between items-center">
        <h2 data-testid="chart-title" className="font-semibold">{title}</h2>
        {showAiBtn && (
          <button tabIndex={0} className="cardBg p-2 hover:bg-blue-950" onClick={onInsightClick} data-testid="ai-button">
            <Sparkles size={18} />
          </button>
        )}
      </div>
      <div className="flex-1 pb-0">
        <ChartContainer
          config={config}
          className="mx-auto aspect-square max-h-[300px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={data}
              dataKey="users"
              label={({ value }) => formatNumber(value)}
              nameKey="label"
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </div>
      {description && (
        <div className="mt-4 flex gap-2">
          <BadgeInfo className="w-10 text-blue-500" />
          <div className="text-base text-gray-300">{description}</div>
        </div>
      )}
    </div>
  );
};

export default CommonPieChart;

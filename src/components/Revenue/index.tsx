import CommonChart from "@/components/CommonPieChart";
import { InsightsPayload, MetricsData } from "@/shared/types";
import { ChartConfig } from "../ui/chart";
import { generateChartData } from "@/shared/utils";
import { revenuePrompt } from "@/shared/constants";

// country, users
const RevenueData = ({
  metrics,
  className,
  onInsightClick,
}: {
  metrics: MetricsData;
  className?: string;
  onInsightClick: (data: InsightsPayload) => void;
}) => {
  const { revenueDistribution } = metrics;
  const chartData = [
    {
      label: "Subscriptions",
      users: revenueDistribution.subscriptions,
    },
    {
      label: "Ads",
      users: revenueDistribution.ads,
    },
  ];
  const updatedChartData = generateChartData(chartData);

  const chartConfig: ChartConfig = {
    users: {
      label: "Users",
    },
  };

  updatedChartData.forEach(({ label, fill }) => {
    chartConfig[label] = {
      label: label,
      color: fill,
    };
  });

  const insightPayload = {
    type: "revenue",
    label: "Revenue Insigts",
    desc: "Here are some tailored insights based on the user revenue data.",
    prompt: `${JSON.stringify(chartData)} ${revenuePrompt}`,
  };

  return (
    <CommonChart
      data={updatedChartData}
      config={chartConfig}
      title="Revenue"
      className={className}
      description="Most of the subscriptions are from the USA, while India and the UK have the highest ad consumption."
      showAiBtn
      onInsightClick={() => onInsightClick(insightPayload)}
    />
  );
};

export default RevenueData;

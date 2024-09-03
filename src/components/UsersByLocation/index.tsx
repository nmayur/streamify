import PieChart from "@/components/CommonPieChart";
import { Distribution } from "@/shared/types";
import { generateChartData } from "@/shared/utils";
import { ChartConfig } from "../ui/chart";

// country, users
const UsersByLocation = ({
  data,
  className,
  showAiBtn = false,
}: {
  data: Distribution[];
  className?: string;
  showAiBtn?: boolean;
}) => {
  const chartData = generateChartData(data);

  const chartConfig: ChartConfig = {
    users: {
      label: "Users",
    },
  };

  chartData.forEach(({ label, fill }) => {
    chartConfig[label] = {
      label: label,
      color: fill,
    };
  });

  return (
    <PieChart
      data={chartData}
      config={chartConfig}
      title={"Active Users by Location"}
      className={className}
      description={
        "The USA leads with 60,000 users, followed by India (50,000) and the UK (40,000)."
      }
      showAiBtn={showAiBtn}
    />
  );
};

export default UsersByLocation;

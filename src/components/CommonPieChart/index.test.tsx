import { render, screen } from "@testing-library/react";
import CommonPieChart from "@/components/CommonPieChart";

const mockData = [
  { label: "USA", users: 60000, fill: "#2EB88A" },
  { label: "UK", users: 40000, fill: "#E23670" },
];

const mockConfig = {
  users: { label: "Users" },
  USA: { label: "USA", color: "#2EB88A" },
  UK: { label: "UK", color: "#E23670" },
};

describe("CommonPieChart Component", () => {
  it("renders the chart title correctly", () => {
    render(<CommonPieChart
      data={mockData}
      config={mockConfig}
      title="User Distribution"
    />);
    const title = screen.getByTestId("chart-title");
    expect(title).toHaveTextContent("User Distribution");
  });

  it("renders the AI button when showAiBtn is true", () => {
    render(<CommonPieChart data={mockData} config={mockConfig} title="User Distribution" showAiBtn />);
    const aiButton = screen.getByTestId("ai-button");
    expect(aiButton).toBeInTheDocument();
  });

  it("does not render the AI button when showAiBtn is false", () => {
    render(<CommonPieChart data={mockData} config={mockConfig} title="User Distribution" />);
    const aiButton = screen.queryByTestId("ai-button");
    expect(aiButton).toBeNull();
  });

});

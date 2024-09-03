import { cn, formatNumber, getRandomColor, generateChartData } from "./utils";
import { PIE_CHART_COLORS } from "./constants";
import { Distribution, PieChartDataItem } from "./types";

// Test cases for the `cn` function
describe("cn", () => {
  it("should merge and return Tailwind CSS classes", () => {
    expect(cn("text-white", "bg-blue-500")).toBe("text-white bg-blue-500");
    expect(cn("p-4", "m-2", "p-4")).toBe("m-2 p-4"); // `twMerge` merges duplicate classes
    expect(cn("text-white", false && "bg-blue-500")).toBe("text-white");
    expect(cn("", undefined, "text-white")).toBe("text-white");
  });
});

// Test cases for the `formatNumber` function
describe("formatNumber", () => {
  it("should format numbers with the appropriate suffix", () => {
    expect(formatNumber(123)).toBe("123 ");
    expect(formatNumber(1234)).toBe("1.2 K");
    expect(formatNumber(1234567)).toBe("1.2 M");
    expect(formatNumber(1234567890)).toBe("1.2 B");
    expect(formatNumber(1234567890123)).toBe("1.2 T");
    expect(formatNumber(12345678901234)).toBe("12.3 T"); // Should handle large numbers correctly
  });
});

// Test cases for the `getRandomColor` function
describe("getRandomColor", () => {
  it("should return a random color from PIE_CHART_COLORS", () => {
    const randomColor = getRandomColor();
    expect(PIE_CHART_COLORS).toContain(randomColor);
  });
});

// Test cases for the `generateChartData` function
describe("generateChartData", () => {
  it("should generate pie chart data from a given distribution", () => {
    const distribution: Distribution[] = [
      { label: "USA", users: 1000 },
      { label: "India", users: 2000 },
    ];

    const expectedResult: PieChartDataItem[] = [
      { label: "USA", users: 1000, fill: PIE_CHART_COLORS[0] },
      { label: "India", users: 2000, fill: PIE_CHART_COLORS[1] },
    ];

    expect(generateChartData(distribution)).toEqual(expectedResult);
  });

  it("should handle an empty distribution array", () => {
    const distribution: Distribution[] = [];
    const expectedResult: PieChartDataItem[] = [];
    expect(generateChartData(distribution)).toEqual(expectedResult);
  });
});

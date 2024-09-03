import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { PIE_CHART_COLORS } from "./constants";
import { Distribution, PieChartDataItem } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: number): string => {
  const suffixes = ["", "K", "M", "B", "T"]; // Suffixes for thousands, millions, billions, trillions
  let suffixIndex = 0;

  // Loop to divide the value until it is less than 1000, incrementing the suffix index accordingly
  while (value >= 1000 && suffixIndex < suffixes.length - 1) {
    value /= 1000;
    suffixIndex++;
  }

  // Return the formatted number with a maximum of one decimal place
  return `${parseFloat(value.toFixed(1))} ${suffixes[suffixIndex]}`;
};

// Function to get a random color from the PIR_CHART_COLORS array
export const getRandomColor = () =>
  PIE_CHART_COLORS[Math.floor(Math.random() * PIE_CHART_COLORS.length)];

export const generateChartData = (
  distribution: Distribution[]
): PieChartDataItem[] => {
  return distribution.map(({ label, users }, i) => {
    return {
      label,
      users,
      fill: PIE_CHART_COLORS[i], // Assign a random color
    }
  });
};


// Open AI API Call
export const fetchAIInsights = async (data: any): Promise<any> => {
  try {
    const response = await fetch("/api/openAI", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: data.prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to call the OpenAI API");
    }

    const resData = await response.json();
    return JSON.parse(resData.content);
  } catch (error) {
    console.error("Something went wrong:", error);
    return null;
  }
};
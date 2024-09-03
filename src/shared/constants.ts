// Array of PIR_CHART_COLORS
export const PIE_CHART_COLORS = [
  "#E23670",
  "#2662D9",
  "#2EB88A",
  "#AF57DB",
  "#E88C30",
];

export const BLUR_FADE_DELAY = 0.8;

// open ai prompts

export const userGrowthPrompt = `
study this graph data of user growth, generate some insights. I want to show it as a list with pointers, include points like 
- user growth in the year, 
- active user trends. keep it concise. 
- Percentage User growth
and more
Give a proper title for each insight. and give response in this format [{title: string, description: string}]
Only give me output in stringified JSON format
`;

export const revenuePrompt = `
study this graph data of revenue, generate some insights. I want to show it as a list with pointers, include points like 
- where is the most revenuew being generate, 
- what next active steps shall we take to increase revenue.
and more
Give a proper title for each insight. and give response in this format [{title: string, description: string}]
Only give me output in stringified JSON format
`;

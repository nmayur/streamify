import { metricsData } from "../../../../public/mockData";

export async function GET(request: Request): Promise<Response> {
  return new Response(JSON.stringify(metricsData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

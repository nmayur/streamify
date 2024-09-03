import { recentStreams } from "../../../../public/mockData";

export async function GET(request: Request): Promise<Response> {
  return new Response(JSON.stringify(recentStreams), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

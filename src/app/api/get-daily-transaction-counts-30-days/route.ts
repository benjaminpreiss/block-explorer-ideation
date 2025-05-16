import { getDailyTransactionCounts30Days } from "@/utils/eth";

// This requires CORS protection!
// Didn't add, due to time constraints.

export async function GET() {
  const data = await getDailyTransactionCounts30Days();
  return Response.json(data);
}

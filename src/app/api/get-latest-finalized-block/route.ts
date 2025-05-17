import { getLatestFinalizedBlock } from "@/utils/eth";

// This requires CORS protection!
// Didn't add, due to time constraints.

export async function GET() {
  const data = await getLatestFinalizedBlock();
  return Response.json(data.toString());
}

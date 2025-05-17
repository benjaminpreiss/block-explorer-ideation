import { getBlockByNumber } from "@/utils/eth";
import { NextRequest } from "next/server";

// This requires CORS protection!
// Didn't add, due to time constraints.

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const numberParam = searchParams.get("number");
  if (!numberParam) throw new Error("number query parameter is undefined.");
  const data = await getBlockByNumber({ blockNumber: BigInt(numberParam) });
  return Response.json(
    JSON.stringify(
      data,
      (key, value) =>
        typeof value === "bigint" ? `BIGINT::${value.toString()}` : value, // return everything else unchanged
    ),
  );
}

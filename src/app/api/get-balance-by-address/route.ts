import { getBalance } from "@/utils/eth";
import { NextRequest } from "next/server";
import { isAddress } from "viem";

// This requires CORS protection!
// Didn't add, due to time constraints.

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const addressParam = searchParams.get("address");
  if (!addressParam) throw new Error("address query parameter is undefined.");
  if (!isAddress(addressParam)) throw new Error("address is not valid.");
  const data = await getBalance({ address: addressParam });
  return Response.json(
    JSON.stringify(
      data,
      (key, value) =>
        typeof value === "bigint" ? `BIGINT::${value.toString()}` : value, // return everything else unchanged
    ),
  );
}

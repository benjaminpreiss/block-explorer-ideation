import {
  getBalance,
  getBlockByNumber,
  getLatestWalletTransactions,
} from "@/utils/eth";
import { NextRequest } from "next/server";
import { Address, isAddress } from "viem";

// This requires CORS protection!
// Didn't add, due to time constraints.

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const addressParam = searchParams.get("address");
  // cursor is not required.
  const cursorParam = searchParams.get("cursor");
  if (!addressParam) throw new Error("address query parameter is undefined.");
  if (!isAddress(addressParam)) throw new Error("address is not valid.");
  const data = await getLatestWalletTransactions({
    cursor: cursorParam ?? undefined,
    address: addressParam,
  });
  return Response.json(data);
}

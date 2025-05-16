import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
// import Moralis from "moralis";
const duneOptions = {
  method: "GET",
  headers: { "X-DUNE-API-KEY": process.env.DUNE_API_KEY as string },
};

/*
await Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});
*/

export const drpcClient = createPublicClient({
  chain: mainnet,
  transport: http(
    `https://lb.drpc.org/ogrpc?network=ethereum&dkey=${process.env.DRPC_API_KEY}`,
  ),
});

export async function getDailyTransactionCounts30Days() {
  const response = await fetch(
    "https://api.dune.com/api/v1/query/5143691/results",
    duneOptions,
  );
  const { result } = await response.json();
  if (!result) throw new Error("Couldn't get result");
  return result.rows as { day: string; transaction_count: number }[];
}

export type TransactionsCounts = Awaited<
  ReturnType<typeof getDailyTransactionCounts30Days>
>;

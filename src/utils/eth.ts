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
    { batch: { wait: 50 } },
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

export async function getLatestFinalizedBlock() {
  return await drpcClient.getBlockNumber();
}

export async function getBlockByNumber({
  blockNumber,
}: {
  blockNumber: bigint;
}) {
  return await drpcClient.getBlock({ blockNumber, includeTransactions: true });
}

export function rangeBigInt(start: bigint, end: bigint): bigint[] {
  if (end < start) {
    throw new Error("End must be greater than or equal to start");
  }

  const result: bigint[] = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }

  return result;
}

// INCLUSIVE! for both start and end!
export async function getBlocksInRangeBatched({
  start,
  end,
  batchSize = 20,
}: {
  start: bigint;
  end: bigint;
  batchSize?: number;
}) {
  const allBlocks = [];

  // Convert batchSize to bigint for arithmetic consistency
  const batchSizeBigInt = BigInt(batchSize);

  for (let i = start; i <= end; i += batchSizeBigInt) {
    // Calculate the upper bound for this batch
    const batchEnd =
      end < i + batchSizeBigInt - BigInt(1)
        ? end
        : i + batchSizeBigInt - BigInt(1);

    const batchPromises = [];
    for (let blockNumber = i; blockNumber <= batchEnd; blockNumber++) {
      batchPromises.push(getBlockByNumber({ blockNumber }));
    }

    const batchBlocks = await Promise.all(batchPromises);
    allBlocks.push(...batchBlocks);
  }

  return allBlocks;
}

export type TransactionsCounts = Awaited<
  ReturnType<typeof getDailyTransactionCounts30Days>
>;

export type GetBlockByNumber = Awaited<ReturnType<typeof getBlockByNumber>>;

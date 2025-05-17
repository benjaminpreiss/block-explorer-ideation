import { useTimePassed } from "@/components/Time";
import { Address, formatEther, Transaction } from "viem";
import { formatAtLeast2SignificantNoSci } from "@/utils/formatting";
import Link from "next/link";

type BlockData = {
  number: bigint;
  timestamp: bigint;
  transactions: Transaction<bigint, number, false>[];
  miner: Address;
  lastUpdatedAt: number | undefined;
};

function Header({ data }: { data: BlockData }) {
  const timePassed = useTimePassed(Number(data.timestamp) * 1000);
  return (
    <div className="flex flex-col bg-brand-green px-5 py-4 md:px-4 md:py-2.5 gap-1 md:gap-2 [&:not(:only-child)]:border-b-2 border-black">
      <div className="flex lg:flex-row flex-col justify-between gap-1 md:gap-1 md:gap-x-8 lg:items-center">
        <span className="font-semibold text-sm md:text-base">
          Block {data.number}, {timePassed}
        </span>
        <Link
          href={`/wallet/${data.miner}`}
          className="font-semibold text-sm md:text-base hover:underline underline-offset-2"
        >
          Miner: {data.miner}
        </Link>
      </div>
      <span className="font-normal text-[0.8125rem] leading-tight md:text-sm">
        {data.transactions.length} transactions
      </span>
    </div>
  );
}

function Txn({
  hash,
  amount,
  from,
  to,
}: {
  hash: Address;
  amount: bigint;
  from: Address;
  to: Address | null;
}) {
  return (
    <div
      className="flex flex-col bg-white px-5 py-4 md:px-4 md:py-2.5 gap-1 md:gap-2 [&:not(:last-child)]:border-b-2"
      style={{
        borderImage:
          "repeating-linear-gradient(90deg, black 0, black 0.3125rem, transparent 0.3125rem, transparent 0.9375rem) 100",
      }}
    >
      <div className="flex lg:flex-row flex-col justify-between gap-1 md:gap-1 md:gap-x-8 lg:items-center">
        <span className="font-normal text-[0.8125rem] leading-tight md:text-sm">
          txn {hash.slice(0, 16) + "..."}
        </span>
        <span className="font-semibold text-[0.8125rem] leading-tight md:text-sm">
          Amount:{" "}
          {formatAtLeast2SignificantNoSci(parseFloat(formatEther(amount)))} Eth
        </span>
      </div>
      <div className="flex lg:flex-row flex-col justify-between gap-1 md:gap-1 md:gap-x-8 lg:items-center">
        <Link
          href={`/wallet/${from}`}
          className="font-semibold text-sm md:text-base hover:underline underline-offset-2"
        >
          From: {from.slice(0, 16) + "..."}
        </Link>
        <Link
          href={`/wallet/${from}`}
          className="font-semibold text-sm md:text-base hover:underline underline-offset-2"
        >
          To: {to ? to.slice(0, 16) + "..." : "-"}
        </Link>
      </div>
    </div>
  );
}

export default function Block({
  data,
  condensed,
  showMore,
}: {
  data: BlockData;
  condensed: boolean;
  showMore?: () => void;
}) {
  return (
    <div className="relative h-fit">
      <div
        className={`flex flex-col border-2 border-black rounded-2xl md:rounded-3xl overflow-hidden ${condensed ? "-translate-y-1.5 md:translate-1.5 relative z-10" : ""}`}
      >
        <Header data={data} />
        {!condensed && (
          <>
            {data.transactions.slice(0, showMore ? 2 : undefined).map((txn) => (
              <Txn
                key={txn.hash}
                hash={txn.hash}
                amount={txn.value}
                from={txn.from}
                to={txn.to}
              />
            ))}
            {showMore && (
              <button
                className="cursor-pointer font-semibold underline underline-offset-2 text-sm md:text-xl text-left md:text-center px-5 py-4 md:px-4 md:py-2.5 bg-white"
                onClick={showMore}
              >
                Show more
              </button>
            )}
          </>
        )}
      </div>
      {condensed && (
        <div className="absolute z-0 top-0 inset-x-0 h-full border-2 border-black rounded-2xl md:rounded-3xl overflow-hidden bg-brand-green"></div>
      )}
    </div>
  );
}

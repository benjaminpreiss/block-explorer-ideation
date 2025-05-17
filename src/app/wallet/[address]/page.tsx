"use client";
import AccountTxn from "@/components/AccountTxn";
import Card from "@/components/Card";
import { useQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import { isAddress, formatEther, Address } from "viem";

export default function Page() {
  const { address } = useParams<{ address: string }>();
  const balanceQuery = useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      const response = await fetch(
        `/api/get-balance-by-address?address=${address}`,
      );
      const responseJson = await response.json();
      return JSON.parse(responseJson, (key, value) => {
        if (typeof value === "string" && value.startsWith("BIGINT::")) {
          return BigInt(value.slice(8));
        }
        return value;
      });
    },
  });
  const [latestTxtCursor, setLatestTxnCursor] = useState<string | null>(null);
  const latestTxtQuery = useQuery({
    queryKey: ["latest-txns", address, latestTxtCursor],
    queryFn: async () => {
      const response = await fetch(
        `/api/get-txns-by-wallet?address=${address}&cursor=${latestTxtCursor}`,
      );
      return await response.json();
    },
  });

  if (!isAddress(address)) notFound();
  return (
    <main className="grid md:col-span-2 gap-4 md:gap-8">
      <Card
        variant="dark"
        head={{ title: "Wallet details" }}
        text={<span className="">{address}</span>}
        truncateText
      />
      <Card
        variant="light"
        head={{ title: "Current balance" }}
        text={
          <span className="">
            {balanceQuery.isLoading
              ? "loading..."
              : balanceQuery.isError
                ? "error!"
                : parseFloat(formatEther(balanceQuery.data)).toFixed(5) +
                  " Eth"}
          </span>
        }
        truncateText
      />
      <Card
        variant="light"
        head={{ title: "Transaction history" }}
        footer={
          latestTxtQuery.isError
            ? { text: "error", centered: true }
            : latestTxtQuery.isFetching
              ? { text: "loading...", centered: true }
              : latestTxtQuery.data?.cursor && {
                  text: "show older transactions",
                  centered: true,
                  action: () => {
                    setLatestTxnCursor(latestTxtQuery.data.cursor);
                  },
                }
        }
      >
        <div className="flex flex-col gap-3 -mx-3 md:mx-0 -mb-8 md:mb-0 min-h-[38rem] lg:min-h-[26rem]">
          {latestTxtQuery.data?.result.map(
            (
              d: {
                transaction_fee: string;
                to_address: Address;
                from_address: Address;
                value: number;
                block_number: number;
                block_timestamp: string;
              },
              i: number,
            ) => (
              <AccountTxn
                key={i}
                transactionFee={d.transaction_fee}
                address={
                  address === d.to_address ? d.from_address : d.to_address
                }
                direction={address === d.to_address ? "From" : "To"}
                amount={d.value}
                blockNumber={d.block_number}
                blockTimestamp={d.block_timestamp}
              />
            ),
          )}
        </div>
      </Card>
    </main>
  );
}

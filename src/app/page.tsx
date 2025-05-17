"use client";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { extent } from "d3";
import { GetBlockByNumber, rangeBigInt, TransactionsCounts } from "@/utils/eth";
import Block from "@/components/Block";
import { useEffect, useRef, useState } from "react";
import TimeTracker from "@/components/Time";
import { useSearch } from "@/components/Search";

export default function Home() {
  const { value, onChange, setToggled } = useSearch();

  const dailyTransactionCounts30DaysQuery = useQuery({
    queryKey: ["daily-transaction-counts-30-days"],
    queryFn: async () => {
      const response = await fetch("/api/get-daily-transaction-counts-30-days");
      return (await response.json()) as TransactionsCounts;
    },
  });

  const latestFinalizedBlockQuery = useQuery({
    queryKey: ["latest-finalized-block"],
    queryFn: async () => {
      const response = await fetch("/api/get-latest-finalized-block");
      return BigInt(await response.json());
    },
    // refetch every 12 seconds
    refetchInterval: 12000,
  });

  // what block window are we rendering?
  const [renderedBlockRange, setRenderedBlockRange] =
    useState<[bigint, bigint]>();

  useEffect(() => {
    // only set once.
    const latestFinalizedBlock = latestFinalizedBlockQuery.data;
    if (renderedBlockRange === undefined && latestFinalizedBlock)
      setRenderedBlockRange([
        latestFinalizedBlock - BigInt(1),
        latestFinalizedBlock,
      ]);
  }, [latestFinalizedBlockQuery.data]);

  // series of number of all blocks we are rendering.
  const blocksSeries = renderedBlockRange
    ? rangeBigInt(...renderedBlockRange)
    : [];

  // block queries executed in parallel
  // hoping for viem batching (as I specified a batch wait time)!
  const blocksQuery = useQueries({
    queries: blocksSeries.map((number) => {
      return {
        queryKey: ["blocks", number.toString()],
        queryFn: async () => {
          const response = await fetch(
            `/api/get-block-by-number?number=${number}`,
          );
          const responseJson = await response.json();
          return JSON.parse(responseJson, (key, value) => {
            if (typeof value === "string" && value.startsWith("BIGINT::")) {
              return BigInt(value.slice(8));
            }
            return value;
          }) as GetBlockByNumber;
        },
      };
    }),
    // this could be memoized
    // see https://tanstack.com/query/latest/docs/framework/react/reference/useQueries#memoization
    combine: (results) => {
      return {
        data: results
          .flatMap((result) => result.data ?? [])
          .sort((a, b) => Number(b.timestamp) - Number(a.timestamp)),
        pending: results.some((result) => result.isPending),
        fetching: results.some((result) => result.isFetching),
        error: results.some((result) => result.isError),
        // unix expoch in milliseconds
        lastUpdatedAt:
          results.length === 0
            ? undefined
            : Math.max(...results.map((d) => d.dataUpdatedAt)),
      };
    },
  });

  // state to keep track of expanded block txns
  // array of block numbers that are expanded
  const [expandedBlockTxns, setExpandedBlockTxns] = useState<bigint[]>([]);

  const recentBlocksCardHeadButton =
    latestFinalizedBlockQuery.isFetching || blocksQuery.fetching
      ? { text: "loading..." }
      : latestFinalizedBlockQuery.isError || blocksQuery.error
        ? { text: "error!" }
        : !!renderedBlockRange &&
            latestFinalizedBlockQuery.data &&
            latestFinalizedBlockQuery.data > renderedBlockRange[1]
          ? {
              text: `show ${latestFinalizedBlockQuery.data - renderedBlockRange[1]} new block(s)`,
              action: () => {
                setRenderedBlockRange(
                  (val) => val && [val[0], latestFinalizedBlockQuery.data],
                );
              },
            }
          : {
              text: (
                <span>
                  synced{" "}
                  <TimeTracker
                    timestampMillis={Number(blocksQuery.lastUpdatedAt)}
                  />{" "}
                  ago
                </span>
              ),
            };

  return (
    <main className="grid grid-cols-subgrid md:col-span-2 gap-4 md:gap-8">
      <div className="col-span-1">
        <Card variant="dark" text="Welcome to ETH explorer!" />
      </div>

      <div className="md:col-start-1 md:row-start-2 col-span-1">
        <Card variant="light" head={{ title: "Search for address" }}>
          <Input
            onClick={() => {
              setToggled(true);
            }}
            value={value}
            onChange={onChange}
          />
        </Card>
      </div>
      <div className="md:col-start-2 md:row-start-1 md:row-span-2">
        <Card
          variant="light"
          head={{ title: "Daily transaction count" }}
          text={
            dailyTransactionCounts30DaysQuery.isLoading
              ? "loading..."
              : dailyTransactionCounts30DaysQuery.isError
                ? "error!"
                : dailyTransactionCounts30DaysQuery.isSuccess
                  ? dailyTransactionCounts30DaysQuery.data[
                      dailyTransactionCounts30DaysQuery.data.length - 1
                    ].transaction_count.toString()
                  : "error!"
          }
        >
          {dailyTransactionCounts30DaysQuery.isSuccess ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyTransactionCounts30DaysQuery.data}>
                <YAxis
                  hide
                  domain={
                    extent(
                      dailyTransactionCounts30DaysQuery.data,
                      (d) => d.transaction_count,
                    ) as [number, number]
                  }
                />
                <Line
                  type="monotone"
                  dataKey="transaction_count"
                  stroke="#111411"
                  strokeWidth={2}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          ) : null}
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card
          variant="light"
          head={{
            title: "Most recent block(s)",
            button: recentBlocksCardHeadButton,
          }}
        >
          <div className="flex flex-col gap-3 -mx-3 md:mx-0 -mb-8 md:mb-0 min-h-[38rem] lg:min-h-[26rem]">
            {blocksQuery.data.map((d, i, arr) => (
              <Block
                data={{ ...d, lastUpdatedAt: blocksQuery.lastUpdatedAt }}
                key={i}
                condensed={i === arr.length - 1 ? true : false}
                showMore={
                  expandedBlockTxns.includes(d.number)
                    ? undefined
                    : () => {
                        setExpandedBlockTxns((ebt) => [...ebt, d.number]);
                      }
                }
              />
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}

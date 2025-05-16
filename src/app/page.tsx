"use client";
import Card from "@/components/Card";
import Input from "@/components/Input";
import { useQuery } from "@tanstack/react-query";
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import { extent } from "d3";
import { TransactionsCounts } from "@/utils/eth";

export default function Home() {
  const query = useQuery({
    queryKey: ["daily-transaction-counts-30-days"],
    queryFn: async () => {
      const response = await fetch("/api/get-daily-transaction-counts-30-days");
      return (await response.json()) as TransactionsCounts;
    },
  });

  return (
    <main className="grid grid-cols-subgrid md:col-span-2 gap-4 md:gap-8">
      <div className="col-span-1">
        <Card variant="dark" text="Welcome to ETH explorer!" />
      </div>

      <div className="md:col-start-1 md:row-start-2 col-span-1">
        <Card variant="light" head={{ title: "Search for address" }}>
          <Input />
        </Card>
      </div>
      <div className="md:col-start-2 md:row-start-1 md:row-span-2">
        <Card
          variant="light"
          head={{ title: "Daily transaction count" }}
          text={
            query.isLoading
              ? "loading..."
              : query.isError
                ? "error!"
                : query.isSuccess
                  ? query.data[
                      query.data.length - 1
                    ].transaction_count.toString()
                  : "error!"
          }
        >
          {query.isSuccess ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={query.data}>
                <YAxis
                  hide
                  domain={
                    extent(query.data, (d) => d.transaction_count) as [
                      number,
                      number,
                    ]
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
    </main>
  );
}

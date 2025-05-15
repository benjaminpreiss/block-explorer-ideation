import BlackBox from "@/components/BlackBox";
import { notFound } from "next/navigation";
import { isAddress } from "viem";

export default async function Page({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  const address = (await params).address;
  if (!isAddress(address)) notFound();
  return (
    <main className="grid col-span-2">
      <BlackBox description="Wallet details" text={address} />
    </main>
  );
}

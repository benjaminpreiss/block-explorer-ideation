import Card from "@/components/Card";
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
      <Card variant="dark" head={{ title: "Wallet details" }} text={address} />
    </main>
  );
}

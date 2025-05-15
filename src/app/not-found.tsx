import BlackBox from "@/components/BlackBox";

export default function NotFound({
  params,
}: {
  params: Promise<{ address: string }>;
}) {
  return (
    <main className="grid col-span-2">
      <BlackBox
        description="Not found"
        text="Could not find the requested ressource"
      />
    </main>
  );
}

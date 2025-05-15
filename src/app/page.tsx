import Card from "@/components/Card";
import Input from "@/components/Input";

export default function Home() {
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
          text="21.5M"
        />
      </div>
    </main>
  );
}

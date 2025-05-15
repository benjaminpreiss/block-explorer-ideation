import Card from "@/components/Card";

export default function NotFound() {
  return (
    <main className="grid col-span-2">
      <Card
        variant="dark"
        head={{ title: "Not found" }}
        text="Could not find the requested ressource"
      />
    </main>
  );
}

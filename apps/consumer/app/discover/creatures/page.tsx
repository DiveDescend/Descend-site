import CreatureCard from "@/components/shared/creature-card";
import { CREATURES } from "@/lib/mock-data";

export default function CreaturesPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Marine Creatures</h1>
        <p className="text-muted-foreground">Find dive sites by the creatures you want to encounter.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {CREATURES.map((c) => (
          <CreatureCard key={c.id} {...c} />
        ))}
      </div>
    </div>
  );
}

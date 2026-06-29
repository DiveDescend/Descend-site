import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex flex-col items-center gap-6 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Users className="h-10 w-10 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Community</h1>
          <p className="mt-2 text-muted-foreground">
            Connect with divers around the world, share dive logs, and discover new spots through the community.
          </p>
        </div>
        <div className="rounded-lg border bg-muted/50 px-6 py-4 text-sm text-muted-foreground">
          Community features are coming soon. Stay tuned.
        </div>
        <Button variant="outline">Get notified when it launches</Button>
      </div>
    </div>
  );
}

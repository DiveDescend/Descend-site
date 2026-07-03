import { ArrowDown, Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export type PathNodeState = "default" | "completed" | "current" | "locked";

export function PathNode({ icon: Icon, title, note, state = "default", action }: {
  icon: React.ElementType;
  title: string;
  note: string;
  state?: PathNodeState;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3 text-left shadow-sm",
        state === "current" && "border-primary/40 bg-primary/5 ring-2 ring-primary/15",
        state === "completed" && "border-primary/30 bg-background",
        state === "locked" && "border-dashed bg-background opacity-60",
        state === "default" && "bg-background"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            state === "current" || state === "completed"
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
          {state === "completed" && (
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </div>
          )}
          {state === "locked" && (
            <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border bg-background">
              <Lock className="h-2.5 w-2.5 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-tight">{title}</p>
          <p className="text-xs text-muted-foreground">{note}</p>
        </div>
      </div>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function Arrow() {
  return <ArrowDown className="mx-auto my-1.5 h-4 w-4 text-muted-foreground/60" />;
}

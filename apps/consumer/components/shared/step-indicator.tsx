import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: number;
  current: number;
  labels?: string[];
}

export default function StepIndicator({ steps, current, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: steps }, (_, i) => {
        const stepNum = i + 1;
        const done = stepNum < current;
        const active = stepNum === current;
        return (
          <div key={stepNum} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium transition-colors",
                done && "bg-primary text-primary-foreground",
                active && "border-2 border-primary bg-background text-primary",
                !done && !active && "border border-muted-foreground/30 bg-muted text-muted-foreground"
              )}
            >
              {done ? "✓" : stepNum}
            </div>
            {labels?.[i] && (
              <span
                className={cn(
                  "hidden text-sm sm:block",
                  active ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                {labels[i]}
              </span>
            )}
            {stepNum < steps && (
              <div className={cn("h-px w-6 flex-1", done ? "bg-primary" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: number;
  current: number;
  labels?: string[];
}

function CheckIcon() {
  return (
    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,5 4,8.5 11,1.5" />
    </svg>
  );
}

export default function StepIndicator({ steps, current, labels }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="grid items-center" style={{ gridTemplateColumns: `repeat(${steps}, 1fr)` }}>
        {Array.from({ length: steps }, (_, i) => {
          const stepNum = i + 1;
          const done = stepNum < current;
          const active = stepNum === current;
          const isFirst = i === 0;
          const isLast = i === steps - 1;

          return (
            <div key={stepNum} className="relative flex items-center justify-center">
              {!isFirst && (
                <div className={cn("absolute right-1/2 top-4 h-px left-0", stepNum <= current ? "bg-primary" : "bg-border")} />
              )}
              {!isLast && (
                <div className={cn("absolute left-1/2 top-4 h-px right-0", done ? "bg-primary" : "bg-border")} />
              )}
              <div className={cn(
                "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                done && "bg-primary text-primary-foreground",
                active && "bg-background border-2 border-primary text-primary",
                !done && !active && "bg-background border-2 border-border text-muted-foreground/50"
              )}>
                {done ? <CheckIcon /> : stepNum}
              </div>
            </div>
          );
        })}
      </div>

      {labels && labels.length > 0 && (
        <div className="mt-2 grid" style={{ gridTemplateColumns: `repeat(${steps}, 1fr)` }}>
          {labels.map((label, i) => {
            const stepNum = i + 1;
            const active = stepNum === current;
            const done = stepNum < current;
            return (
              <p key={i} className={cn(
                "text-center text-[11px] leading-tight",
                active && "font-semibold text-foreground",
                done && "text-muted-foreground",
                !done && !active && "text-muted-foreground/40"
              )}>
                {label}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

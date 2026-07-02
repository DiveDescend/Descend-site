"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, GraduationCap, LifeBuoy, Medal, Ship, Waves, X } from "lucide-react";
import { cn } from "@/lib/utils";

function PathNode({ icon: Icon, title, note, accent }: {
  icon: React.ElementType;
  title: string;
  note: string;
  accent?: boolean;
}) {
  return (
    <div className={cn(
      "flex items-center gap-3 rounded-xl border p-3 text-left shadow-sm",
      accent ? "border-primary/40 bg-primary/5" : "bg-background"
    )}>
      <div className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
        accent ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
      )}>
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight">{title}</p>
        <p className="text-xs text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}

function Arrow() {
  return <ArrowDown className="mx-auto my-1.5 h-4 w-4 text-muted-foreground/60" />;
}

export default function LearningPathModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onMouseDown={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border bg-background p-6 shadow-lg sm:p-8">
        <button onClick={onClose} aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted">
          <X className="h-4 w-4" />
        </button>

        <h2 className="text-xl font-bold tracking-tight">The scuba learning path</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Every diver follows the same first three steps. After Rescue Diver, choose the path that fits your goals.
        </p>

        <div className="mx-auto mt-6 max-w-md">
          <PathNode icon={Waves} title="Open Water Diver" note="Start here — your first certification, dive to 18m" accent />
          <Arrow />
          <PathNode icon={Ship} title="Advanced Open Water" note="Five adventure dives, extend your depth to 30m" />
          <Arrow />
          <PathNode icon={LifeBuoy} title="Rescue Diver" note="Prevent and manage dive emergencies" />
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-dashed p-4">
            <p className="text-xs font-semibold text-muted-foreground">Recreational path</p>
            <div className="mt-3">
              <PathNode icon={Medal} title="Master Scuba Diver" note="Rescue + 5 specialties + 50 logged dives" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              The highest recreational rating — fewer than 2% of divers earn it.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed p-4">
            <p className="text-xs font-semibold text-muted-foreground">Professional path</p>
            <div className="mt-3">
              <PathNode icon={GraduationCap} title="Divemaster" note="Lead certified divers professionally" />
              <Arrow />
              <PathNode icon={GraduationCap} title="Instructor" note="Teach courses and certify new divers" />
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Specialty courses like Nitrox and Deep Diver can be added at any point after Open Water.
        </p>
      </div>
    </div>,
    document.body
  );
}

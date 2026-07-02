"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const GAP = 4; // matches gap-1

/**
 * Single-line chip list: chips that don't fit collapse into a trailing "+N" chip.
 */
export default function ChipRow({ items, className }: { items: string[]; className?: string }) {
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(items.length);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const compute = () => {
      const available = el.clientWidth;
      const children = Array.from(el.children) as HTMLElement[];
      const counterWidth = children[children.length - 1].offsetWidth;
      const widths = children.slice(0, -1).map((c) => c.offsetWidth);

      const total = widths.reduce((sum, w, i) => sum + w + (i > 0 ? GAP : 0), 0);
      if (total <= available) {
        setVisibleCount(widths.length);
        return;
      }

      let used = 0;
      let count = 0;
      for (let i = 0; i < widths.length; i++) {
        const next = used + (i > 0 ? GAP : 0) + widths[i];
        if (next + GAP + counterWidth > available) break;
        used = next;
        count = i + 1;
      }
      setVisibleCount(count);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items]);

  const hidden = items.length - visibleCount;
  const chipClass = "shrink-0 whitespace-nowrap font-medium text-[11px]";

  return (
    <div className={cn("relative", className)}>
      {/* Invisible copy of every chip plus the counter, used only for measurement */}
      <div ref={measureRef} aria-hidden className="invisible absolute inset-x-0 top-0 flex gap-1 overflow-hidden">
        {items.map((item) => (
          <Badge key={item} variant="secondary" className={chipClass}>{item}</Badge>
        ))}
        <Badge variant="secondary" className={chipClass}>+{items.length}</Badge>
      </div>

      <div className="flex gap-1 overflow-hidden">
        {items.slice(0, visibleCount).map((item) => (
          <Badge key={item} variant="secondary" className={chipClass}>{item}</Badge>
        ))}
        {hidden > 0 && (
          <Badge variant="secondary" className={chipClass}>+{hidden}</Badge>
        )}
      </div>
    </div>
  );
}

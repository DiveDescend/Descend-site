"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardCarouselProps {
  children: React.ReactNode;
  cardWidth?: number; // px — used to compute scroll jump
  className?: string;
}

export default function CardCarousel({ children, cardWidth = 208, className }: CardCarouselProps) {
  const ref     = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd,   setAtEnd]   = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  // Check on mount (after cards render)
  useEffect(() => { sync(); }, [sync]);

  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  return (
    <div className={cn("relative", className)}>
      {/* Card strip — scrollbar hidden, driven by buttons */}
      <div
        ref={ref}
        onScroll={sync}
        className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>

      {/* Left chevron — appears after first scroll */}
      {!atStart && (
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute left-2 top-[30%] -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background border shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Right chevron */}
      {!atEnd && (
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute right-2 top-[30%] -translate-y-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background border shadow-md hover:shadow-lg transition-shadow"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

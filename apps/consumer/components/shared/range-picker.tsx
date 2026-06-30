"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MONTHS     = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function pad(n: number) { return String(n).padStart(2, "0"); }
function isoFromParts(y: number, m: number, d: number) { return `${y}-${pad(m + 1)}-${pad(d)}`; }

export function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function MonthGrid({ year, month, dateFrom, dateTo, hovered, onSelect, onHover }: {
  year: number; month: number;
  dateFrom: string; dateTo: string; hovered: string;
  onSelect: (iso: string) => void;
  onHover: (iso: string) => void;
}) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const firstDow    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const effectiveEnd = dateTo || (!dateTo && hovered > dateFrom ? hovered : "");

  return (
    <div className="w-60">
      <p className="mb-3 text-center text-sm font-semibold">{MONTHS[month]} {year}</p>
      <div className="mb-1 grid grid-cols-7 text-center">
        {DAY_LABELS.map(d => (
          <span key={d} className="text-[10px] font-medium text-muted-foreground">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="h-10" />;
          const iso      = isoFromParts(year, month, day);
          const isPast   = new Date(year, month, day) < today;
          const isStart  = iso === dateFrom;
          const isEnd    = iso === dateTo;
          const inRange  = !!(dateFrom && effectiveEnd && iso > dateFrom && iso < effectiveEnd);
          const startCap = isStart && !!(dateFrom && effectiveEnd);
          const endCap   = isEnd   && !!dateFrom;

          return (
            <div key={day} className="relative flex h-10 items-center justify-center"
              onMouseEnter={() => !isPast && onHover(iso)}
            >
              {inRange  && <div className="absolute inset-0 bg-primary/10" />}
              {startCap && <div className="absolute inset-y-0 left-1/2 right-0 bg-primary/10" />}
              {endCap   && <div className="absolute inset-y-0 left-0 right-1/2 bg-primary/10" />}
              <button
                disabled={isPast}
                onClick={() => onSelect(iso)}
                className={cn(
                  "relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
                  (isStart || isEnd)
                    ? "bg-foreground text-background font-semibold"
                    : "hover:bg-muted",
                  isPast && "cursor-not-allowed opacity-30"
                )}
              >{day}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface RangePickerProps {
  dateFrom: string;
  dateTo: string;
  onSelect: (iso: string) => void;
  className?: string;
}

export default function RangePicker({ dateFrom, dateTo, onSelect, className }: RangePickerProps) {
  const today = new Date();
  const [view, setView]       = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [hovered, setHovered] = useState("");

  const leftYear  = view.getFullYear();
  const leftMonth = view.getMonth();
  const right     = new Date(leftYear, leftMonth + 1, 1);

  function handleSelect(iso: string) {
    onSelect(iso);
  }

  return (
    <div className={cn("p-6", className)} onMouseLeave={() => setHovered("")}>
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={() => setView(new Date(leftYear, leftMonth - 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
        ><ChevronLeft className="h-4 w-4" /></button>
        <button
          onClick={() => setView(new Date(leftYear, leftMonth + 1, 1))}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted transition-colors"
        ><ChevronRight className="h-4 w-4" /></button>
      </div>
      <div className="flex gap-8">
        <MonthGrid
          year={leftYear} month={leftMonth}
          dateFrom={dateFrom} dateTo={dateTo}
          hovered={!dateTo ? hovered : ""}
          onSelect={handleSelect} onHover={setHovered}
        />
        <MonthGrid
          year={right.getFullYear()} month={right.getMonth()}
          dateFrom={dateFrom} dateTo={dateTo}
          hovered={!dateTo ? hovered : ""}
          onSelect={handleSelect} onHover={setHovered}
        />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {!dateFrom
          ? "Select your start date"
          : !dateTo
          ? "Now select your end date"
          : `${shortDate(dateFrom)} – ${shortDate(dateTo)}`}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PERIODS = ["This month", "Last 3 months", "This year", "All time"] as const;
type Period = (typeof PERIODS)[number];

const PERIOD_DATA: Record<Period, { revenue: string; bookings: number; avg: string }> = {
  "This month": { revenue: "$3,240", bookings: 28, avg: "$116" },
  "Last 3 months": { revenue: "$9,870", bookings: 84, avg: "$117" },
  "This year": { revenue: "$24,830", bookings: 210, avg: "$118" },
  "All time": { revenue: "$24,830", bookings: 210, avg: "$118" },
};

const BREAKDOWN = [
  { type: "Fun Dives", bookings: 34, revenue: "$4,080" },
  { type: "Courses", bookings: 12, revenue: "$6,240" },
];

const HISTORY = [
  { date: "Dec 23", diver: "Tom Blackwell", type: "Open Water Course", amount: "$450" },
  { date: "Dec 23", diver: "Aisha Malik", type: "Blue Corner Wall Dive", amount: "$110" },
  { date: "Dec 22", diver: "Sofia Andersen", type: "Advanced Open Water", amount: "$380" },
  { date: "Dec 21", diver: "James Liu", type: "Night Reef Dive", amount: "$85" },
  { date: "Dec 20", diver: "Yuki Tanaka", type: "Blue Corner Wall Dive", amount: "$220" },
  { date: "Dec 19", diver: "Elena Vasquez", type: "Rescue Diver Course", amount: "$520" },
  { date: "Dec 18", diver: "David Okafor", type: "WWII Wreck Dive", amount: "$95" },
  { date: "Dec 17", diver: "Marco Rossi", type: "Shark Drift Dive", amount: "$390" },
  { date: "Dec 16", diver: "Sarah Chen", type: "Manta Ray Point", amount: "$220" },
  { date: "Dec 15", diver: "Tom Blackwell", type: "Night Reef Dive", amount: "$85" },
];

export default function IncomePage() {
  const [period, setPeriod] = useState<Period>("This month");
  const data = PERIOD_DATA[period];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Income</h1>
        <p className="text-muted-foreground">Track your revenue and booking history.</p>
      </div>

      {/* Hero revenue block */}
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Revenue</p>
          <p className="text-6xl font-bold tracking-tight">{data.revenue}</p>
          <div className="flex justify-center gap-2 flex-wrap">
            {PERIODS.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  period === p
                    ? "bg-primary text-primary-foreground"
                    : "border text-muted-foreground hover:text-foreground hover:border-primary"
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="p-5 text-center">
          <p className="text-sm text-muted-foreground">Revenue this period</p>
          <p className="mt-1 text-2xl font-bold">{data.revenue}</p>
        </CardContent></Card>
        <Card><CardContent className="p-5 text-center">
          <p className="text-sm text-muted-foreground">Bookings</p>
          <p className="mt-1 text-2xl font-bold">{data.bookings}</p>
        </CardContent></Card>
        <Card><CardContent className="p-5 text-center">
          <p className="text-sm text-muted-foreground">Avg. booking value</p>
          <p className="mt-1 text-2xl font-bold">{data.avg}</p>
        </CardContent></Card>
      </div>

      {/* Revenue breakdown */}
      <Card>
        <CardHeader><CardTitle className="text-base">Revenue Breakdown</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="grid grid-cols-3 px-6 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <span>Type</span><span className="text-center">Bookings</span><span className="text-right">Revenue</span>
            </div>
            {BREAKDOWN.map((row) => (
              <div key={row.type} className="grid grid-cols-3 px-6 py-3 text-sm">
                <span>{row.type}</span>
                <span className="text-center text-muted-foreground">{row.bookings}</span>
                <span className="text-right font-medium">{row.revenue}</span>
              </div>
            ))}
            <div className="grid grid-cols-3 px-6 py-3 text-sm font-semibold bg-muted/30">
              <span>Total</span>
              <span className="text-center">{BREAKDOWN.reduce((s, r) => s + r.bookings, 0)}</span>
              <span className="text-right">$10,320</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking history */}
      <Card>
        <CardHeader><CardTitle className="text-base">Booking History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            <div className="grid grid-cols-4 px-6 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <span>Date</span><span>Diver</span><span>Item</span><span className="text-right">Amount</span>
            </div>
            {HISTORY.map((row, i) => (
              <div key={i} className="grid grid-cols-4 px-6 py-3 text-sm">
                <span className="text-muted-foreground">{row.date}</span>
                <span>{row.diver}</span>
                <span className="text-muted-foreground truncate pr-4">{row.type}</span>
                <span className="text-right font-medium">{row.amount}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground pb-6">
        Payouts are processed monthly. Stripe Connect integration coming soon.
      </p>
    </div>
  );
}

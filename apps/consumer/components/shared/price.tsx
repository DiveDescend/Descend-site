"use client";

import { useCurrency } from "@/lib/currency-context";

interface PriceProps {
  amount: number;
  className?: string;
}

export default function Price({ amount, className }: PriceProps) {
  const { format } = useCurrency();
  return <span className={className}>{format(amount)}</span>;
}

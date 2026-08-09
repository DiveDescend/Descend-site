"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type CurrencyCode = "USD" | "INR";

// Static, approximate conversion for display purposes only — not a live FX feed.
const USD_TO_INR = 83;

const SYMBOLS: Record<CurrencyCode, string> = { USD: "$", INR: "₹" };
const LOCALES: Record<CurrencyCode, string> = { USD: "en-US", INR: "en-IN" };
const STORAGE_KEY = "descend_currency";

interface CurrencyContextValue {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (usdAmount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "USD" || saved === "INR") setCurrencyState(saved);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem(STORAGE_KEY, c);
  }, []);

  const format = useCallback(
    (usdAmount: number) => {
      const amount = currency === "INR" ? Math.round(usdAmount * USD_TO_INR) : usdAmount;
      return `${SYMBOLS[currency]}${amount.toLocaleString(LOCALES[currency])}`;
    },
    [currency]
  );

  return <CurrencyContext.Provider value={{ currency, setCurrency, format }}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within a CurrencyProvider");
  return ctx;
}

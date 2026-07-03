"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe, type DemoState } from "./demo-store";

export function useDemoStore(): DemoState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** True once the client store has hydrated — use to suppress seed-flash where it matters. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}

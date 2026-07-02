import { createBrowserClient } from "@supabase/ssr";

// Returns null when Supabase env vars aren't configured (e.g. a deployment
// without them) so callers can degrade gracefully instead of crashing.
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}

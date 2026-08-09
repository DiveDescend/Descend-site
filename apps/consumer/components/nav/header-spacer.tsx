"use client";

import { usePathname } from "next/navigation";

/**
 * HomeHeader is `position: fixed`, so normal-flow content starts at y=0 underneath it.
 * On the homepage the full-bleed hero is meant to sit behind the transparent header —
 * everywhere else, page content needs a spacer so it isn't hidden behind the bar.
 */
const NO_SPACER_ROUTES = ["/", "/search"];

export default function HeaderSpacer() {
  const pathname = usePathname();
  if (NO_SPACER_ROUTES.includes(pathname)) return null;
  return <div className="h-[88px]" />;
}

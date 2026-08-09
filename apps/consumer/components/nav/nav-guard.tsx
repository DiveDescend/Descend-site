"use client";

import { usePathname } from "next/navigation";
import HomeHeader from "./home-header";

const HIDDEN_ROUTES = ["/demo-login"];

export default function NavGuard() {
  const pathname = usePathname();
  if (HIDDEN_ROUTES.includes(pathname)) return null;
  return <HomeHeader />;
}

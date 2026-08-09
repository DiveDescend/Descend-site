"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import NavSearchBar from "@/components/home/nav-search-bar";
import { useCurrency } from "@/lib/currency-context";

function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <button
      type="button"
      onClick={() => setCurrency(currency === "USD" ? "INR" : "USD")}
      aria-label="Switch currency"
      className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-bold text-white transition-all duration-150 hover:bg-white/10 active:scale-90"
    >
      {currency}
    </button>
  );
}

function Auth({ showSearch }: { showSearch: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) { setEmail(null); return; }
    supabase.auth.getUser().then(({ data }) => setEmail(data.user?.email ?? null));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (email === undefined) return <div className="h-5 w-28" />;

  if (email) {
    return (
      <div className="flex items-center gap-3">
        <Link href="/profile" className="text-sm font-semibold text-white">
          Profile
        </Link>
        <button
          onClick={handleSignOut}
          className="rounded-full border border-white/50 px-4 py-2 text-sm font-bold text-white transition-all duration-150 hover:bg-white/10 active:scale-95"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/login" className="text-sm font-semibold text-white">
        Sign in
      </Link>
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-columns] duration-300 ease-out",
          showSearch ? "grid-cols-[0fr]" : "grid-cols-[1fr]"
        )}
      >
        <div className="min-w-0 overflow-hidden">
          <Link
            href="/signup"
            className="block whitespace-nowrap rounded-full bg-white px-4 py-2 text-sm font-bold text-[#0F2E4C] transition-all duration-150 hover:bg-white/90 active:scale-95"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomeHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isSearch = pathname === "/search";
  const hasHero = isHome || isSearch;
  const [scrolled, setScrolled] = useState(!hasHero);
  const [showSearch, setShowSearch] = useState(isSearch || !hasHero);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!hasHero) {
      setScrolled(true);
      setShowSearch(true);
      return;
    }
    // /search has its own full-bleed banner instead of a real hero, and no embedded
    // search card of its own — so the nav's search bar should be visible right away,
    // while the header background still fades in from transparent on scroll.
    if (isSearch) {
      setShowSearch(true);
      const onScroll = () => setScrolled(window.scrollY > 60);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hand off to the nav search bar the instant the hero leaves the viewport —
    // tracked natively via IntersectionObserver instead of comparing scrollY
    // against a guessed height, which drifts on resize/mobile chrome and let the
    // hero card overlap the sections below it before disappearing.
    const hero = document.getElementById("home-hero");
    let observer: IntersectionObserver | undefined;
    if (hero) {
      observer = new IntersectionObserver(([entry]) => setShowSearch(!entry.isIntersecting), { threshold: 0 });
      observer.observe(hero);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [hasHero, isSearch]);

  return (
    <header
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        scrolled ? "shadow-sm" : "bg-transparent"
      )}
      style={scrolled ? { background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px) saturate(160%)", WebkitBackdropFilter: "blur(20px) saturate(160%)" } : undefined}
    >
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4 px-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/logo.svg" alt="Descend" width={26} height={22} priority className="brightness-0 invert" />
          <span className="text-lg font-bold tracking-tight text-white">Descend</span>
        </Link>
        <div className="hidden flex-1 items-center justify-center sm:flex">
          <motion.div
            initial={false}
            animate={{ opacity: showSearch ? 1 : 0, scale: showSearch || reduceMotion ? 1 : 0.95 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            style={{ pointerEvents: showSearch ? "auto" : "none" }}
          >
            <NavSearchBar />
          </motion.div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <CurrencyToggle />
          <Auth showSearch={showSearch} />
        </div>
      </div>
    </header>
  );
}

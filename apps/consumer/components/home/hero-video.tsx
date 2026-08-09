"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";

export default function HeroVideo() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <Image
        src="/videos/hero-dive-poster.jpg"
        alt="Diver exploring an underwater reef"
        fill
        priority
        className="object-cover"
      />
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster="/videos/hero-dive-poster.jpg"
      className="h-full w-full object-cover"
    >
      <source src="/videos/hero-dive.mp4" type="video/mp4" />
    </video>
  );
}

import type { CSSProperties } from "react";

// Matches the hero/nav search bar's glass treatment exactly, so every card reads as the same material.
export const GLASS_BG: CSSProperties = {
  background: "rgba(255,255,255,0.14)",
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
};

// A solid (non-blurred) accent chip for small elements sitting on top of an
// already-glass surface — e.g. an icon badge inside a glass card. Never stack
// two translucent/blurred materials: legibility collapses. This is intentionally
// flat, not another material layer.
export const GLASS_CHIP_SOLID: CSSProperties = {
  background: "rgba(255,255,255,0.16)",
};

export const GLASS_BORDER = "border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.25)]";

export const GLASS_BUTTON_BORDER = "border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.2)]";

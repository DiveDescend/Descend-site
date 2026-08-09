const STEEL = "#8FB4D1";

interface IllustrationProps {
  className?: string;
  flip?: boolean;
  color?: string;
}

/** Flat, single-tone silhouette — no outlines, no multi-color parts. */
export function DiverSilhouette({ className, flip, color = STEEL }: IllustrationProps) {
  return (
    <svg
      viewBox="0 0 300 220"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill={color}
    >
      <ellipse cx="55" cy="168" rx="30" ry="13" transform="rotate(20 55 168)" />
      <ellipse cx="95" cy="140" rx="26" ry="15" transform="rotate(35 95 140)" />
      <rect x="100" y="42" width="30" height="64" rx="14" transform="rotate(-8 115 74)" />
      <rect x="95" y="85" width="108" height="44" rx="22" transform="rotate(-6 149 107)" />
      <rect x="108" y="92" width="55" height="17" rx="8.5" transform="rotate(55 118 100)" />
      <ellipse cx="184" cy="149" rx="28" ry="16" transform="rotate(-25 184 149)" />
      <ellipse cx="226" cy="176" rx="30" ry="13" transform="rotate(-15 226 176)" />
      <rect x="176" y="56" width="66" height="19" rx="9.5" transform="rotate(-35 181 66)" />
      <circle cx="233" cy="41" r="11" />
      <circle cx="213" cy="84" r="25" />
      <circle cx="248" cy="112" r="5" opacity="0.7" />
      <circle cx="257" cy="128" r="4" opacity="0.55" />
      <circle cx="262" cy="144" r="3" opacity="0.4" />
    </svg>
  );
}

export function FishSilhouette({ className, color = STEEL }: IllustrationProps) {
  return (
    <svg viewBox="0 0 80 50" className={className} fill={color}>
      <polygon points="14,25 0,10 0,40" />
      <ellipse cx="38" cy="25" rx="24" ry="15" />
      <polygon points="30,12 40,1 47,14" />
    </svg>
  );
}

export function BubbleCluster({ className, color = STEEL }: IllustrationProps) {
  return (
    <svg viewBox="0 0 60 140" className={className} fill={color}>
      <circle cx="30" cy="120" r="9" opacity="0.5" />
      <circle cx="14" cy="90" r="6" opacity="0.4" />
      <circle cx="38" cy="62" r="5" opacity="0.35" />
      <circle cx="20" cy="34" r="4" opacity="0.3" />
      <circle cx="34" cy="12" r="3" opacity="0.25" />
    </svg>
  );
}

export const GRID_PATTERN_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
  backgroundSize: "34px 34px",
};

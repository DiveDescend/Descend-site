// Shared "free-form" water gradient, inspired by Maldives lagoon water: a near-black base
// washed with organic, irregularly-sized and irregularly-blurred turquoise/lagoon-blue fields.
// Used identically everywhere — hero overlay, page content, and footer — so the whole page
// reads as one continuous gradient instead of separate color systems stitched together.

export const MESH_BASE = "#050B14";
export const MESH_TURQUOISE = "#2DD4BF";
export const MESH_LAGOON_BLUE = "#0EA5E9";

interface Blob {
  color: string;
  top: string;
  left: string;
  width: string;
  height: string;
  opacity: number;
  radius: string;
  rotate: string;
  blur: number;
}

// Deliberately irregular: sizes range from ~34vw to ~125vw and blur from 100px to 210px,
// so the wash feels hand-placed rather than a repeating pattern.
const BLOBS: Blob[] = [
  { color: MESH_TURQUOISE, top: "-22%", left: "-38%", width: "125vw", height: "102vh", opacity: 0.12, radius: "58% 42% 63% 37% / 41% 55% 45% 59%", rotate: "-10deg", blur: 210 },
  { color: MESH_LAGOON_BLUE, top: "0%", left: "48%", width: "56vw", height: "52vh", opacity: 0.2, radius: "45% 55% 40% 60% / 55% 45% 60% 40%", rotate: "18deg", blur: 120 },
  { color: MESH_TURQUOISE, top: "18%", left: "12%", width: "34vw", height: "30vh", opacity: 0.16, radius: "63% 37% 52% 48% / 48% 60% 40% 52%", rotate: "6deg", blur: 100 },
  { color: MESH_LAGOON_BLUE, top: "30%", left: "22%", width: "115vw", height: "94vh", opacity: 0.11, radius: "40% 60% 55% 45% / 60% 40% 55% 45%", rotate: "-14deg", blur: 205 },
  { color: MESH_TURQUOISE, top: "52%", left: "-22%", width: "80vw", height: "70vh", opacity: 0.13, radius: "55% 45% 60% 40% / 45% 55% 40% 60%", rotate: "9deg", blur: 165 },
  { color: MESH_LAGOON_BLUE, top: "64%", left: "56%", width: "40vw", height: "36vh", opacity: 0.17, radius: "48% 52% 45% 55% / 52% 48% 60% 40%", rotate: "-20deg", blur: 105 },
  { color: MESH_TURQUOISE, top: "80%", left: "2%", width: "118vw", height: "96vh", opacity: 0.13, radius: "52% 48% 58% 42% / 44% 56% 42% 58%", rotate: "12deg", blur: 200 },
];

function Blobs() {
  return (
    <>
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: b.top,
            left: b.left,
            width: b.width,
            height: b.height,
            background: b.color,
            opacity: b.opacity,
            borderRadius: b.radius,
            transform: `rotate(${b.rotate})`,
            filter: `blur(${b.blur}px)`,
          }}
        />
      ))}
    </>
  );
}

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='0.5'/></svg>`;
const GRAIN_URI = `data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}`;

/**
 * A single backdrop pinned to the viewport (position: fixed), rendered once and shared by
 * every section — hero, content, footer. Because it never scrolls and is never re-instantiated
 * per-section, there is exactly one gradient on the page: no seams, no restarting blob patterns.
 * Sections just need a transparent background so this shows through.
 */
export function FixedMeshBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: MESH_BASE }}>
      <Blobs />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: `url("${GRAIN_URI}")`, backgroundSize: "180px 180px" }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
    </div>
  );
}

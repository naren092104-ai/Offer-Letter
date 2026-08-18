import { BRAND } from "@/lib/brand";

/**
 * Default AutoRevive watermark. Template-level defaults only — intentionally
 * not configurable from the generator UI.
 */
export function DocumentWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
    >
      <span
        className="select-none font-bold uppercase"
        style={{
          color: "rgba(24, 26, 27, 0.12)",
          fontSize: "19mm",
          letterSpacing: "0.12em",
          opacity: 0.9,
          transform: "rotate(-18deg)",
          transformOrigin: "center",
          filter: "blur(0.15px)",
        }}
      >
        {BRAND.name}
      </span>
    </div>
  );
}

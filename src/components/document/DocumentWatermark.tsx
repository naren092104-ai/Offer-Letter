import { BRAND } from "@/lib/brand";

/**
 * Default AutoRevive watermark. Template-level defaults only — intentionally
 * not configurable from the generator UI.
 */
export function DocumentWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden"
    >
      <img
        src={BRAND.watermarkUrl}
        alt=""
        className="w-[135mm] max-w-none opacity-[0.5] print:opacity-[0.5]"
      />
      <span className="-mt-[6mm] text-[16mm] font-bold uppercase tracking-[0.18em] text-doc-dark opacity-[0.05] print:opacity-[0.05]">
        {BRAND.name}
      </span>
    </div>
  );
}

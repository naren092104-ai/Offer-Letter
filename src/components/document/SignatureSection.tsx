import { BRAND } from "@/lib/brand";
import { hasSignature, type SignatureState } from "@/lib/signature";

export function SignatureSection({
  signature,
  showPlaceholder,
}: {
  signature: SignatureState;
  /** preview shows a placeholder box; print/PDF never does */
  showPlaceholder?: boolean | undefined;
}) {
  const present = hasSignature(signature);

  return (
    <div className="mt-[10mm]">
      <p className="text-[3.6mm] font-bold text-doc-ink">For,</p>

      <div className="mt-[1mm] h-[20mm] w-[70mm]">
        {present ? (
          <div
            className="flex h-full items-center"
            style={{ transform: `translate(${signature.offsetX}mm, ${signature.offsetY}mm)` }}
          >
            {signature.mode === "type" ? (
              <span
                className="leading-none text-doc-ink"
                style={{
                  fontFamily: signature.fontCss,
                  fontSize: `${Math.max(6, signature.width / 4.5)}mm`,
                }}
              >
                {signature.typedText}
              </span>
            ) : (
              <img
                src={signature.imageUrl ?? ""}
                alt="Authorised signature"
                style={{ width: `${signature.width}mm` }}
                className="h-auto max-h-[20mm] w-auto object-contain"
              />
            )}
          </div>
        ) : showPlaceholder ? (
          <div className="flex h-[16mm] w-[55mm] items-center justify-center rounded-[1mm] border border-dashed border-doc-rule text-[3mm] italic text-doc-muted print:hidden">
            Signature
          </div>
        ) : null}
      </div>

      <p className="text-[3.6mm] font-bold text-doc-ink">{BRAND.hrName},</p>
      <p className="text-[3.6mm] text-doc-ink">{BRAND.hrTitle},</p>
      <p className="text-[3.6mm] text-doc-ink">{BRAND.name}.</p>
    </div>
  );
}

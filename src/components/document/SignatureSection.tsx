import { BRAND } from "@/lib/brand";
import { hasSignature, type SignatureState } from "@/lib/signature";

export function SignatureSection({
  hrSignature,
  candidateSignature,
  showPlaceholder,
}: {
  hrSignature: SignatureState;
  candidateSignature: SignatureState;
  /** preview shows a placeholder box; print/PDF never does */
  showPlaceholder?: boolean | undefined;
}) {
  const hrPresent = hasSignature(hrSignature);
  const candidatePresent = hasSignature(candidateSignature);

  return (
    <div className="mt-[10mm]">
      <div className="flex gap-[15mm]">
        {/* Candidate Signature */}
        <div className="flex-1">
          <p className="text-[3.6mm] font-bold text-doc-ink">Candidate,</p>

          <div className="mt-[1mm] h-[20mm] w-full">
            {candidatePresent ? (
              <div
                className="flex h-full items-center"
                style={{ transform: `translate(${candidateSignature.offsetX}mm, ${candidateSignature.offsetY}mm)` }}
              >
                {candidateSignature.mode === "type" ? (
                  <span
                    className="leading-none text-doc-ink"
                    style={{
                      fontFamily: candidateSignature.fontCss,
                      fontSize: `${Math.max(6, candidateSignature.width / 4.5)}mm`,
                    }}
                  >
                    {candidateSignature.typedText}
                  </span>
                ) : (
                  <img
                    src={candidateSignature.imageUrl ?? ""}
                    alt="Candidate signature"
                    style={{ width: `${candidateSignature.width}mm` }}
                    className="h-auto max-h-[20mm] w-auto object-contain"
                  />
                )}
              </div>
            ) : showPlaceholder ? (
              <div className="flex h-[16mm] items-center justify-center rounded-[1mm] border border-dashed border-doc-rule text-[3mm] italic text-doc-muted print:hidden">
                Signature
              </div>
            ) : null}
          </div>

          <p className="text-[3.6mm] text-doc-ink">Date: ___________</p>
        </div>

        {/* HR Signature */}
        <div className="flex-1">
          <p className="text-[3.6mm] font-bold text-doc-ink">For,</p>

          <div className="mt-[1mm] h-[20mm] w-full">
            {hrPresent ? (
              <div
                className="flex h-full items-center"
                style={{ transform: `translate(${hrSignature.offsetX}mm, ${hrSignature.offsetY}mm)` }}
              >
                {hrSignature.mode === "type" ? (
                  <span
                    className="leading-none text-doc-ink"
                    style={{
                      fontFamily: hrSignature.fontCss,
                      fontSize: `${Math.max(6, hrSignature.width / 4.5)}mm`,
                    }}
                  >
                    {hrSignature.typedText}
                  </span>
                ) : (
                  <img
                    src={hrSignature.imageUrl ?? ""}
                    alt="Authorised signature"
                    style={{ width: `${hrSignature.width}mm` }}
                    className="h-auto max-h-[20mm] w-auto object-contain"
                  />
                )}
              </div>
            ) : showPlaceholder ? (
              <div className="flex h-[16mm] items-center justify-center rounded-[1mm] border border-dashed border-doc-rule text-[3mm] italic text-doc-muted print:hidden">
                Signature
              </div>
            ) : null}
          </div>

          <p className="text-[3.6mm] font-bold text-doc-ink">{BRAND.hrName},</p>
          <p className="text-[3.6mm] text-doc-ink">{BRAND.hrTitle},</p>
          <p className="text-[3.6mm] text-doc-ink">{BRAND.name}.</p>
        </div>
      </div>
    </div>
  );
}

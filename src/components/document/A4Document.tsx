import { DocumentHeader } from "./DocumentHeader";
import { DocumentFooter } from "./DocumentFooter";
import { DocumentWatermark } from "./DocumentWatermark";
import { SignatureSection } from "./SignatureSection";
import { buildPages } from "./documentContent";
import type { DocumentData } from "@/lib/brand";
import type { SignatureState } from "@/lib/signature";

export function A4Document({
  data,
  signature,
  showSignaturePlaceholder,
}: {
  data: DocumentData;
  signature: SignatureState;
  showSignaturePlaceholder?: boolean | undefined;
}) {
  const pages = buildPages(data);

  return (
    <div className="a4-stack">
      {pages.map((body, i) => (
        <section key={i} className="a4-page">
          <DocumentWatermark />
          <div className="a4-header">
            <DocumentHeader />
          </div>
          <div className="a4-body">
            {body}
            {i === pages.length - 1 ? (
              <SignatureSection signature={signature} showPlaceholder={showSignaturePlaceholder} />
            ) : null}
          </div>
          <div className="a4-footer">
            <DocumentFooter />
          </div>
        </section>
      ))}
    </div>
  );
}

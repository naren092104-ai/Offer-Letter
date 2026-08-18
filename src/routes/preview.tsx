import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Download, Printer, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { A4Document } from "@/components/document/A4Document";
import { useStudio } from "@/lib/documentStore";
import { exportPdf, pdfFileName } from "@/lib/pdf";
import { hasSignature } from "@/lib/signature";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Preview · AutoRevive HR Letter Studio" },
      {
        name: "description",
        content:
          "Full A4 portrait preview of the AutoRevive letter with print and one-click PDF download.",
      },
      { property: "og:title", content: "AutoRevive Letter Preview" },
      {
        property: "og:description",
        content: "Review every A4 page, then print or download the branded PDF.",
      },
    ],
  }),
  component: Preview,
});

const MM_PER_PX = 96 / 25.4; // px per mm at 96dpi

function Preview() {
  const { data, signature } = useStudio();
  const navigate = useNavigate();
  const printRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.85);
  const [busy, setBusy] = useState(false);

  // Fit the A4 width to the viewport on first render / small screens.
  useEffect(() => {
    const fit = () => {
      const w = shellRef.current?.clientWidth ?? window.innerWidth;
      const pageWidthPx = 210 * MM_PER_PX;
      setZoom(Math.min(1, Math.max(0.3, (w - 24) / pageWidthPx)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  async function generate() {
    if (!hasSignature(signature)) {
      toast.error("Please add an HR signature in the editor before generating the PDF.");
      return;
    }
    if (!printRef.current) return;
    setBusy(true);
    try {
      await exportPdf(printRef.current, pdfFileName(data));
      toast.success("PDF downloaded.");
    } catch (e) {
      console.error(e);
      toast.error("Could not generate the PDF. Try the Print option instead.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="bg-background">
      <Toaster />

      <header className="preview-toolbar sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="sm" onClick={() => void navigate({ to: "/editor" })}>
            <ArrowLeft /> Back to Editor
          </Button>
          <div className="hidden w-44 items-center gap-2 md:flex">
            <span className="text-[11px] text-muted-foreground">Zoom</span>
            <Slider
              min={0.3}
              max={1}
              step={0.01}
              value={[zoom]}
              onValueChange={([v]) => setZoom(v ?? zoom)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}>
              <Printer /> Print
            </Button>
            <Button size="sm" onClick={generate} disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : <Download />} Generate PDF
            </Button>
          </div>
        </div>
      </header>

      <main ref={shellRef} className="mx-auto w-full max-w-[1200px] px-2 py-6 sm:px-6">
        <div className="overflow-x-auto">
          <div className="mx-auto flex justify-center" aria-label="A4 document preview">
            <div
              id="print-root"
              ref={printRef}
              style={{
                width: "210mm",
                zoom: `${zoom}`,
                transformOrigin: "top center",
              }}
            >
              <A4Document data={data} signature={signature} showSignaturePlaceholder />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

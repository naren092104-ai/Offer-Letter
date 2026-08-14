import type { DocumentData } from "./brand";

const A4 = { w: 210, h: 297 };

export function pdfFileName(d: DocumentData) {
  const label =
    d.docType === "internship"
      ? "Internship_Letter"
      : d.docType === "offer"
        ? "Offer_Letter"
        : "Appointment_Letter";
  const name = (d.candidateName || "Candidate")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  return `AutoRevive_${label}_${name || "Candidate"}.pdf`;
}

/** Renders each .a4-page inside `root` as its own A4 portrait PDF page. */
export async function exportPdf(root: HTMLElement, fileName: string) {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas-pro"),
  ]);

  const pages = Array.from(root.querySelectorAll<HTMLElement>(".a4-page"));
  if (pages.length === 0) return;

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]!;
    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: page.scrollWidth,
      windowHeight: page.scrollHeight,
    });
    const img = canvas.toDataURL("image/jpeg", 0.95);
    if (i > 0) pdf.addPage("a4", "portrait");
    pdf.addImage(img, "JPEG", 0, 0, A4.w, A4.h, undefined, "FAST");
  }

  pdf.save(fileName);
}

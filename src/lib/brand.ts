import logoAsset from "@/assets/document/autorevive-logo.png.asset.json";
import watermarkAsset from "@/assets/document/autorevive-watermark.png.asset.json";

export const BRAND = {
  name: "AutoRevive",
  tagline: "UNLOCK. BID. DRIVE.",
  phone: "+91 9489991230",
  email: "hr@autorevives.com",
  website: "www.autorevives.com",
  footerEmail: "hr@autorevives.com",
  footerWebsite: "www.autorevive.com",
  address: "99 B, Kuppusamy Reddy Street, Uthangarai, Krishnagiri - 635207, Tamil Nadu, India.",
  hrName: "Jemsina Banu S",
  hrTitle: "Human Resources",
  logoUrl: logoAsset.url,
  watermarkUrl: watermarkAsset.url,
} as const;

export type DocumentType = "internship" | "internship-placement" | "offer" | "appointment";

/** Internship-style letters (duration + stipend, placement page). */
export const isInternshipType = (t: DocumentType) =>
  t === "internship" || t === "internship-placement";

export const DOCUMENT_TYPES: { value: DocumentType; label: string; blurb: string }[] = [
  {
    value: "internship",
    label: "Letter of Internship",
    blurb: "Performance-based internship offer with placement opportunity",
  },
  {
    value: "internship-placement",
    label: "Internship cum Placement Letter",
    blurb: "Internship with an assured performance-based placement track",
  },
  { value: "offer", label: "Offer Letter", blurb: "Formal job offer with compensation details" },
  {
    value: "appointment",
    label: "Appointment Letter",
    blurb: "Confirmation of appointment and terms of employment",
  },
];

export interface DocumentData {
  docType: DocumentType;
  refNo: string;
  date: string;
  salutation: string;
  candidateName: string;
  candidateAddress: string;
  position: string;
  startDate: string;
  workModel: string;
  duration: string;
  stipend: string;
  ctc: string;
  reportingTo: string;
  acceptByDate: string;
  noticePeriod: string;
}

export const defaultDocumentData: DocumentData = {
  docType: "internship",
  refNo: "AV/HR/Uthangari/26-27/02",
  date: "",
  salutation: "Ms.",
  candidateName: "",
  candidateAddress: "",
  position: "",
  startDate: "",
  workModel: "Hybrid Model",
  duration: "3 Months",
  stipend: "Unpaid",
  ctc: "",
  reportingTo: "",
  acceptByDate: "",
  noticePeriod: "30 days",
};

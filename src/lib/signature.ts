export type SignatureMode = "none" | "upload" | "draw" | "type";

export const SIGNATURE_FONTS = [
  { id: "cursive-1", label: "Classic Script", css: "'Great Vibes', cursive" },
  { id: "cursive-2", label: "Flowing Hand", css: "'Dancing Script', cursive" },
  { id: "cursive-3", label: "Elegant Slant", css: "'Sacramento', cursive" },
  { id: "cursive-4", label: "Formal Signature", css: "'Allura', cursive" },
] as const;

export interface SignatureState {
  mode: SignatureMode;
  /** data URL for upload/draw modes */
  imageUrl: string | null;
  typedText: string;
  fontCss: string;
  /** rendered width in mm inside the signature box */
  width: number;
  offsetX: number;
  offsetY: number;
}

export const defaultSignature: SignatureState = {
  mode: "none",
  imageUrl: null,
  typedText: "",
  fontCss: SIGNATURE_FONTS[0].css,
  width: 45,
  offsetX: 0,
  offsetY: 0,
};

export function hasSignature(s: SignatureState) {
  if (s.mode === "type") return s.typedText.trim().length > 0;
  if (s.mode === "upload" || s.mode === "draw") return !!s.imageUrl;
  return false;
}

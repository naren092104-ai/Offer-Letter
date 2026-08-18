import { useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, Upload, PenLine, Type, Trash2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Toaster } from "@/components/ui/sonner";
import { SignaturePad } from "@/components/document/SignaturePad";
import { BRAND, DOCUMENT_TYPES, isInternshipType } from "@/lib/brand";
import type { DocumentData, DocumentType } from "@/lib/brand";
import { setDocumentData, setHRSignatureState, setCandidateSignatureState, useStudio } from "@/lib/documentStore";
import { SIGNATURE_FONTS, defaultSignature, hasSignature } from "@/lib/signature";

export const Route = createFileRoute("/editor")({
  head: () => ({
    meta: [
      { title: "Editor · AutoRevive HR Letter Studio" },
      {
        name: "description",
        content:
          "Fill in document type, candidate details and your signature, then preview the branded AutoRevive A4 letter.",
      },
      { property: "og:title", content: "AutoRevive HR Letter Editor" },
      {
        property: "og:description",
        content: "Enter candidate details and sign — AutoRevive branding is built in.",
      },
    ],
  }),
  component: Editor,
});

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function Step({
  n,
  title,
  subtitle,
  children,
}: {
  n: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <header className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          {n}
        </span>
        <div>
          <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
          {subtitle ? <p className="text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
      </header>
      {children}
    </section>
  );
}

function Editor() {
  const { data, hrSignature, candidateSignature } = useStudio();
  const navigate = useNavigate();
  const [drawing, setDrawing] = useState(false);
  const [candidateDrawing, setCandidateDrawing] = useState(false);
  const [typedDraft, setTypedDraft] = useState<string>(BRAND.hrName);
  const [candidateTypedDraft, setCandidateTypedDraft] = useState<string>(data.candidateName);
  const [typedFont, setTypedFont] = useState<string>(SIGNATURE_FONTS[0].css);
  const [candidateTypedFont, setCandidateTypedFont] = useState<string>(SIGNATURE_FONTS[0].css);
  const fileRef = useRef<HTMLInputElement>(null);
  const candidateFileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof DocumentData>(k: K, v: DocumentData[K]) =>
    setDocumentData((d) => ({ ...d, [k]: v }));

  const signed = useMemo(() => hasSignature(hrSignature), [hrSignature]);
  const candidateSigned = useMemo(() => hasSignature(candidateSignature), [candidateSignature]);

  function onUpload(file: File | undefined) {
    if (!file) return;
    if (!/image\/(png|jpe?g|webp)/.test(file.type)) {
      toast.error("Please choose a PNG, JPG or WEBP image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setHRSignatureState((s) => ({ ...s, mode: "upload", imageUrl: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function onCandidateUpload(file: File | undefined) {
    if (!file) return;
    if (!/image\/(png|jpe?g|webp)/.test(file.type)) {
      toast.error("Please choose a PNG, JPG or WEBP image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () =>
      setCandidateSignatureState((s) => ({ ...s, mode: "upload", imageUrl: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function goPreview() {
    if (!data.candidateName.trim()) {
      toast.error("Please enter the candidate's name first.");
      return;
    }
    void navigate({ to: "/preview" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <img src={BRAND.logoUrl} alt="AutoRevive" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold tracking-tight">HR Letter Studio</h1>
              <p className="text-xs text-muted-foreground">
                Branding is built in — just add the details.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-[11px] font-medium text-accent-foreground md:inline-flex">
              <ShieldCheck className="size-3.5" /> Nothing is saved — data clears on refresh
            </span>
            <Button size="sm" onClick={goPreview}>
              <Eye /> Preview Document
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] space-y-5 px-4 py-8 sm:px-6">
        <Step n={1} title="Document type" subtitle="Pick the letter you're issuing">
          <div className="grid gap-2 sm:grid-cols-2">
            {DOCUMENT_TYPES.map((t) => {
              const active = data.docType === t.value;
              return (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => set("docType", t.value as DocumentType)}
                  className={`rounded-xl border p-3 text-left transition-colors ${
                    active
                      ? "border-primary bg-accent"
                      : "border-border bg-background hover:bg-secondary"
                  }`}
                >
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.blurb}</p>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n={2} title="Candidate details" subtitle="Who is this letter for?">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Salutation">
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={data.salutation}
                onChange={(e) => set("salutation", e.target.value)}
              >
                {["Mr.", "Ms.", "Mrs.", "Dr."].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Full name">
              <Input
                value={data.candidateName}
                placeholder="Gopika L"
                onChange={(e) => set("candidateName", e.target.value)}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Address / City">
                <Input
                  value={data.candidateAddress}
                  placeholder="Salem, Tamil Nadu."
                  onChange={(e) => set("candidateAddress", e.target.value)}
                />
              </Field>
            </div>
            <Field label="Reference number">
              <Input value={data.refNo} onChange={(e) => set("refNo", e.target.value)} />
            </Field>
            <Field label="Letter date">
              <Input type="date" value={data.date} onChange={(e) => set("date", e.target.value)} />
            </Field>
          </div>
        </Step>

        <Step
          n={3}
          title={isInternshipType(data.docType) ? "Internship details" : "Employment details"}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Position / Designation">
              <Input
                value={data.position}
                placeholder="Developer"
                onChange={(e) => set("position", e.target.value)}
              />
            </Field>
            <Field label="Work model">
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={data.workModel}
                onChange={(e) => set("workModel", e.target.value)}
              >
                {["Hybrid Model", "Work From Office", "Remote Model"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </Field>
            {isInternshipType(data.docType) ? (
              <>
                <Field label="Duration">
                  <Input value={data.duration} onChange={(e) => set("duration", e.target.value)} />
                </Field>
                <Field label="Stipend" hint="Type “Unpaid” or an amount like ₹8,000">
                  <Input value={data.stipend} onChange={(e) => set("stipend", e.target.value)} />
                </Field>
                {data.docType === "internship-placement" && (
                  <Field label="Placement Salary (Optional)" hint="Enter salary like ₹4,50,000 per annum">
                    <Input
                      value={data.ctc}
                      placeholder="₹XX,XXX per annum"
                      onChange={(e) => set("ctc", e.target.value)}
                    />
                  </Field>
                )}
              </>
            ) : (
              <>
                <Field label="Annual compensation">
                  <Input
                    value={data.ctc}
                    placeholder="₹4,50,000 per annum"
                    onChange={(e) => set("ctc", e.target.value)}
                  />
                </Field>
              </>
            )}
            <Field label="Accept on or before">
              <Input
                type="date"
                value={data.acceptByDate}
                onChange={(e) => set("acceptByDate", e.target.value)}
              />
            </Field>
            <Field label="Notice period">
              <Input
                value={data.noticePeriod}
                onChange={(e) => set("noticePeriod", e.target.value)}
              />
            </Field>
          </div>
        </Step>

        <Step
          n={4}
          title="Signature"
          subtitle="Upload, draw or type — this is the only asset you provide"
        >
          <div className="mb-4 grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant={hrSignature.mode === "upload" ? "default" : "outline"}
              size="sm"
              onClick={() => fileRef.current?.click()}
            >
              <Upload /> Upload
            </Button>
            <Button
              type="button"
              variant={hrSignature.mode === "draw" ? "default" : "outline"}
              size="sm"
              onClick={() => setDrawing(true)}
            >
              <PenLine /> Draw
            </Button>
            <Button
              type="button"
              variant={hrSignature.mode === "type" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setHRSignatureState((s) => ({
                  ...s,
                  mode: "type",
                  imageUrl: null,
                  typedText: typedDraft,
                  fontCss: typedFont,
                }))
              }
            >
              <Type /> Type
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={(e) => onUpload(e.target.files?.[0])}
            />
          </div>

          {drawing ? (
            <div className="mb-4 rounded-xl border border-border p-3">
              <SignaturePad
                onCancel={() => setDrawing(false)}
                onSave={(url) => {
                  setHRSignatureState((s) => ({ ...s, mode: "draw", imageUrl: url }));
                  setDrawing(false);
                  toast.success("Signature saved to the letter.");
                }}
              />
            </div>
          ) : null}

          {hrSignature.mode === "type" ? (
            <div className="mb-4 space-y-3 rounded-xl border border-border p-3">
              <Field label="Signature text">
                <Input
                  value={typedDraft}
                  onChange={(e) => {
                    setTypedDraft(e.target.value);
                    setHRSignatureState((s) => ({ ...s, typedText: e.target.value }));
                  }}
                />
              </Field>
              <div className="grid grid-cols-2 gap-2">
                {SIGNATURE_FONTS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setTypedFont(f.css);
                      setHRSignatureState((s) => ({ ...s, fontCss: f.css }));
                    }}
                    className={`rounded-lg border px-3 py-2 text-left transition-colors ${
                      hrSignature.fontCss === f.css
                        ? "border-primary bg-accent"
                        : "border-border hover:bg-secondary"
                    }`}
                  >
                    <span className="block text-xl" style={{ fontFamily: f.css }}>
                      {typedDraft || "Signature"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {signed ? (
            <div className="space-y-4 rounded-xl border border-border p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-14 flex-1 items-center overflow-hidden rounded-lg bg-secondary px-3">
                  {hrSignature.mode === "type" ? (
                    <span className="text-2xl" style={{ fontFamily: hrSignature.fontCss }}>
                      {hrSignature.typedText}
                    </span>
                  ) : (
                    <img
                      src={hrSignature.imageUrl ?? ""}
                      alt="Signature preview"
                      className="max-h-12 w-auto object-contain"
                    />
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setHRSignatureState(() => defaultSignature)}
                >
                  <Trash2 /> Remove
                </Button>
              </div>

              <Field label={`Size — ${hrSignature.width}mm`}>
                <Slider
                  min={20}
                  max={70}
                  step={1}
                  value={[hrSignature.width]}
                  onValueChange={([v]) => setHRSignatureState((s) => ({ ...s, width: v ?? s.width }))}
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nudge horizontally">
                  <Slider
                    min={-15}
                    max={25}
                    step={1}
                    value={[hrSignature.offsetX]}
                    onValueChange={([v]) =>
                      setHRSignatureState((s) => ({ ...s, offsetX: v ?? s.offsetX }))
                    }
                  />
                </Field>
                <Field label="Nudge vertically">
                  <Slider
                    min={-8}
                    max={8}
                    step={1}
                    value={[hrSignature.offsetY]}
                    onValueChange={([v]) =>
                      setHRSignatureState((s) => ({ ...s, offsetY: v ?? s.offsetY }))
                    }
                  />
                </Field>
              </div>
            </div>
          ) : (
            <p className="rounded-xl bg-secondary px-3 py-2.5 text-xs text-muted-foreground">
              No signature yet. A placeholder shows in the preview only — the PDF needs a real
              signature.
            </p>
          )}
        </Step>

        <Step n={5} title="Preview" subtitle="Review the full A4 document, then print or export">
          <Button onClick={goPreview}>
            <Eye /> Preview Document
          </Button>
        </Step>
      </main>
    </div>
  );
}

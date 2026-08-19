import type { ReactNode } from "react";
import { BRAND, isInternshipType, type DocumentData } from "@/lib/brand";
import { parseAmount } from "@/lib/salary";
import { SalaryPage } from "./SalarySection";
import type { SignatureState } from "@/lib/signature";

const fmt = (iso: string, fallback: string) => {
  if (!iso) return fallback;
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const fmtCtc = (value: string, fallback = "₹XX,XXX") => {
  const amount = parseAmount(value);
  if (!amount) return fallback;
  return `${(amount / 100000).toFixed(2).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1")} LPA`;
};

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold">{children}</strong>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <>
    <h2 className="my-[6mm] text-[4mm] font-bold uppercase text-doc-ink">{title}</h2>
    {children}
  </>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="mb-[5mm] text-justify text-[4mm] leading-[2] text-doc-ink">{children}</p>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h2 className="my-[8mm] text-center text-[4.8mm] font-bold uppercase tracking-wide text-doc-ink">
    {children}
  </h2>
);

function Intro({ d }: { d: DocumentData }) {
  const name = `${d.salutation} ${d.candidateName || "________"}`;
  const isInternship = isInternshipType(d.docType);
  const label =
    d.docType === "internship"
      ? "Internship Offer Letter"
      : d.docType === "internship-placement"
        ? "Internship-Cum-Placement Offer Letter"
        : d.docType === "offer"
          ? "Offer Letter"
          : "Appointment Letter";

  return (
    <>
      <p className="text-[3.6mm] font-bold text-doc-ink">
        {isInternship ? "Offer Letter No.:" : "Reference No.:"} {d.refNo}
      </p>
      <p className="mt-[3mm] text-[3.6mm] font-bold text-doc-ink">To,</p>
      <p className="text-[3.6mm] font-bold text-doc-ink">{name},</p>
      <p className="text-[3.6mm] text-doc-ink">{d.candidateAddress || "—"}</p>
      <p className="mt-[2mm] text-[3.6mm] font-bold text-doc-ink">
        Date: {fmt(d.date, "__/__/____")}
      </p>

      <h1 className="my-[10mm] text-center text-[4.6mm] font-bold text-doc-ink">
        <span className="underline underline-offset-4">{label}</span>
      </h1>

      <P>
        <B>Dear {name},</B>
      </P>
      {isInternship ? (
        <>
          <P>
            We are pleased to offer you a 3-month internship with the position of{" "}
            <B>{d.position || "________"}</B> at AutoRevive. Based on your qualifications and
            discussions during the selection process, we are confident that you will make a valuable
            contribution to our organization. Upon successful completion of the internship, you will be
            eligible for evaluation for potential full-time employment based on your performance.
          </P>
          <P>
            <B>Internship Details:</B>
          </P>
          <ul className="mb-[4mm] list-disc space-y-[1.5mm] pl-[8mm] text-[3.9mm] leading-[1.8] text-doc-ink">
            <li>Position: <B>{d.position || "________"}</B></li>
            <li>Internship Start Date: <B>{fmt(d.startDate, "________")}</B></li>
            <li>Internship Duration: <B>3 Months</B></li>
            <li>Work Model: <B>{d.workModel}</B></li>
            <li>Internship Compensation: <B>{d.stipend?.toLowerCase() === "unpaid" ? "Unpaid" : d.stipend || "Unpaid"}</B></li>
          </ul>
        </>
      ) : (
        <>
          <P>
            We are pleased to confirm your employment with the position of{" "}
            <B>{d.position || "________"}</B> with AutoRevive. Based on your qualifications and
            discussions during the selection process, we are confident that you will make a valuable
            contribution to our organization.
          </P>
          <P>
            Your employment will commence on a <B>{d.workModel}</B>
            {d.ctc ? (
              <>
                , with an annual CTC of <B>{fmtCtc(d.ctc)}</B>
              </>
            ) : null}
            {d.reportingTo ? (
              <>
                , reporting to <B>{d.reportingTo}</B>
              </>
            ) : null}
            .
          </P>
        </>
      )}
    </>
  );
}

function PerformancePage({ d }: { d: DocumentData }) {
  const isPlacementTrack = d.docType === "internship-placement";
  const isInternship = isInternshipType(d.docType);
  const engagementLabel = isPlacementTrack ? "program" : "internship";
  const completionLabel = isPlacementTrack ? "completion certificate" : "Internship Completion Certificate";

  return (
    <>
      <Title>{isPlacementTrack ? "Placement Opportunity" : isInternship ? "Internship Opportunity" : "Employment Opportunity"}</Title>
      <P>
        {isInternship
          ? `The ${engagementLabel} is designed to provide practical exposure and evaluate your suitability for a full-time role at AutoRevive. Upon successful completion of the 3-month ${engagementLabel}, your overall performance will be evaluated. Based on the performance evaluation and the Company&rsquo;s business requirements, you may be considered for a full-time employment opportunity with AutoRevive.`
          : "The opportunity is designed to provide practical exposure and evaluate your suitability for a full-time role at AutoRevive. Your performance will be reviewed based on the Company&rsquo;s business requirements and role expectations."}
      </P>
      <Title>Performance Evaluation Criteria</Title>
      <P>
        Your {isInternship ? (isPlacementTrack ? "performance" : "internship performance") : "performance"} will be evaluated based on the following factors:
      </P>
      <ul className="mb-[4mm] list-disc space-y-[2mm] pl-[8mm] text-[3.9mm] leading-[1.8] text-doc-ink">
        <li>Technical and functional performance</li>
        <li>Quality and timely completion of assigned work</li>
        <li>Attendance and punctuality</li>
        <li>Learning ability and initiative</li>
        <li>Communication and teamwork</li>
        <li>Professional conduct</li>
        <li>Overall contribution to the Company</li>
        <li>Ability to take responsibility and work independently</li>
      </ul>
      <Title>{isInternship ? "Placement & Starting Compensation" : "Compensation & Employment Terms"}</Title>
      <P>
        {isInternship ? (
          <>
            If selected for full-time employment based on the {isPlacementTrack ? "performance" : "internship performance"} evaluation, you will be offered an annual CTC of <B>{fmtCtc(d.ctc)}</B>. The final designation, compensation, employment terms, and applicable benefits will be communicated separately through the Employment/Appointment Letter.
          </>
        ) : (
          <>
            You will be offered an annual CTC of <B>{fmtCtc(d.ctc)}</B>. The final designation, compensation, employment terms, and applicable benefits will be communicated separately through the Employment/Appointment Letter.
          </>
        )}
      </P>
      <P>
        {isInternship
          ? `Full-time employment is subject to satisfactory ${isPlacementTrack ? "performance" : "internship performance"}, successful evaluation, availability of a suitable position, and the Company&rsquo;s business requirements. Completion of the ${engagementLabel} does not constitute an automatic entitlement to employment.`
          : "Full-time employment is subject to satisfactory performance, successful evaluation, availability of a suitable position, and the Company&rsquo;s business requirements. Employment does not constitute an automatic entitlement to continued service."}
      </P>
      <Title>{isInternship ? (isPlacementTrack ? "Program Compensation & Completion" : "Internship Compensation & Completion Certificate") : "Compensation Details"}</Title>
      <P>
        {isInternship ? (
          <>
            The {engagementLabel} is <B>{d.stipend?.toLowerCase() === "unpaid" ? "unpaid" : d.stipend}</B>
            {d.stipend?.toLowerCase() === "unpaid"
              ? ` and does not carry any stipend or salary. A ${completionLabel} will be issued upon successful completion of the ${engagementLabel}, subject to the Company&rsquo;s applicable policies.`
              : ` per month. A ${completionLabel} will be issued upon successful completion of the ${engagementLabel}, subject to the Company&rsquo;s applicable policies.`}
          </>
        ) : (
          <>
            Your employment is <B>{d.stipend?.toLowerCase() === "unpaid" ? "unpaid" : d.stipend}</B>
            {d.stipend?.toLowerCase() === "unpaid"
              ? " and does not carry any stipend or salary. Compensation details will be confirmed as part of the formal employment terms."
              : " per month. Compensation details will be confirmed as part of the formal employment terms."}
          </>
        )}
      </P>
    </>
  );
}

function TermsPage({ d }: { d: DocumentData }) {
  const isInternship = isInternshipType(d.docType);
  const engagementLabel = d.docType === "internship-placement" ? "engagement" : isInternship ? "internship" : "employment";

  return (
    <>
      <Title>Terms &amp; Conditions</Title>
      <ol className="list-decimal space-y-[3mm] pl-[7mm] text-[3.9mm] leading-[1.9] text-doc-ink">
        <li>Your {isInternship ? "internship" : "employment"} is subject to verification of all documents submitted by you.</li>
        <li>
          During your {isInternship ? "internship" : "employment"}, you shall maintain strict confidentiality of all company
          information, client data, and business operations.
        </li>
        <li>
          You are expected to comply with the Company&rsquo;s policies, code of conduct, and
          operational procedures.
        </li>
        <li>
          Under the {d.workModel} work model, you must report to the office whenever instructed by the Company.
        </li>
        <li>
          You are responsible for maintaining a stable internet connection and a professional work
          environment while working remotely.
        </li>
        <li>
          Either party may terminate this {engagementLabel} by providing {d.noticePeriod} written notice or
          payment in lieu of notice, as per Company policy.
        </li>
        <li>
          Any breach of Company policies or confidentiality obligations may result in disciplinary
          action, including immediate termination.
        </li>
      </ol>
    </>
  );
}

function ClosingPage({ d, hrSignature }: { d: DocumentData; hrSignature: SignatureState }) {
  const isInternship = isInternshipType(d.docType);
  const experienceLabel = isInternship ? "internship experience" : "employment experience";
  const hrPresent = hrSignature && (hrSignature.mode === "type" ? !!hrSignature.typedText : !!hrSignature.imageUrl);

  return (
    <>
      <Title>Documents Required for Joining</Title>
      <ul className="mb-[4mm] list-disc space-y-[2mm] pl-[8mm] text-[3.9mm] leading-[1.8] text-doc-ink">
        <li>Aadhaar Card</li>
        <li>PAN Card</li>
        <li>Educational Certificates</li>
        <li>Passport-size Photographs</li>
        <li>Bank Account Details</li>
        <li>Previous Employment Documents (if applicable) with 3 months&rsquo; pay slip</li>
      </ul>
      <P>
        Kindly sign and return a copy of this letter as a token of your acceptance on or before{" "}
        <B>{fmt(d.acceptByDate, "________")}</B>. The proposed date of joining is <B>{fmt(d.dateOfJoining || d.startDate, "________")}</B>.
        We welcome you to AutoRevive and look forward to a successful and rewarding {experienceLabel}.
      </P>
      <P>
        Should you have any questions regarding this {isInternship ? "internship offer" : "offer"}, please feel free to contact our
        Human Resources department at <B>+91 9597969650</B>.
      </P>

      <div className="mt-[10mm] grid grid-cols-2 items-start gap-[12mm]">
        <div className="text-[3.9mm] text-doc-ink">
          <p className="font-bold">For {BRAND.name}</p>
          {hrPresent && (
            <div className="mt-[1mm] mb-[1mm]">
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
                  alt="HR signature"
                  style={{ width: `${hrSignature.width}mm` }}
                  className="h-auto max-h-[20mm] w-auto object-contain"
                />
              )}
            </div>
          )}
          <p className="mt-[2mm] font-bold">{BRAND.hrName}</p>
          <p>{BRAND.hrTitle}</p>
          <p>{BRAND.name}.</p>
        </div>

        <div className="text-[3.9mm] text-doc-ink">
          <p className="font-bold">Candidate Signature</p>
          <div className="mt-[8mm] h-[1px] w-[45mm] border-b border-doc-rule" />
          <p className="mt-[2mm] font-bold">{d.candidateName}</p>
          <p>{d.position}</p>
          <p>{BRAND.name}.</p>
        </div>
      </div>
    </>
  );
}

/** Returns the page bodies for the selected document type. Signature goes on the last page. */
export function buildPages(d: DocumentData, hrSignature: SignatureState): ReactNode[] {
  const pages: ReactNode[] = [<Intro key="intro" d={d} />];
  if (d.docType === "internship-placement") pages.push(<PerformancePage key="perf" d={d} />);

  // Show salary page for offer/appointment letters OR for internship-cum-placement with CTC
  const annualCtc = parseAmount(d.ctc);
  const showSalary = (d.docType === "offer" || d.docType === "appointment") ||
                     (d.docType === "internship-placement" && annualCtc > 0);
  if (showSalary && annualCtc > 0) pages.push(<SalaryPage key="salary" annualCtc={annualCtc} />);
  
  pages.push(<TermsPage key="terms" d={d} />);
  pages.push(<ClosingPage key="close" d={d} hrSignature={hrSignature} />);
  return pages;
}

import type { ReactNode } from "react";
import { isInternshipType, type DocumentData } from "@/lib/brand";
import { parseAmount } from "@/lib/salary";
import { SalaryPage } from "./SalarySection";

const fmt = (iso: string, fallback: string) => {
  if (!iso) return fallback;
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
};

const B = ({ children }: { children: ReactNode }) => (
  <strong className="font-bold">{children}</strong>
);

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <>
    <h2 className="my-[6mm] text-[3.8mm] font-bold uppercase text-doc-ink">{title}</h2>
    {children}
  </>
);

const P = ({ children }: { children: ReactNode }) => (
  <p className="mb-[4mm] text-justify text-[3.6mm] leading-[1.9] text-doc-ink">{children}</p>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h2 className="my-[8mm] text-center text-[4.4mm] font-bold uppercase tracking-wide text-doc-ink">
    {children}
  </h2>
);

function Intro({ d }: { d: DocumentData }) {
  const name = `${d.salutation} ${d.candidateName || "________"}`;
  const label =
    d.docType === "internship"
      ? "Internship-Cum-Placement Offer Letter"
      : d.docType === "internship-placement"
        ? "Internship-Cum-Placement Offer Letter"
        : d.docType === "offer"
          ? "Offer Letter"
          : "Appointment Letter";
  return (
    <>
      <p className="text-[3.6mm] font-bold text-doc-ink">
        {isInternshipType(d.docType) ? "Offer Letter No.:" : "Reference No.:"} {d.refNo}
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
      {isInternshipType(d.docType) ? (
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
          <ul className="mb-[4mm] list-disc space-y-[1mm] pl-[8mm] text-[3.6mm] leading-[1.7] text-doc-ink">
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
            Your employment will commence from <B>{fmt(d.startDate, "________")}</B> on a{" "}
            <B>{d.workModel}</B>
            {d.ctc ? (
              <>
                , with an annual compensation of <B>{d.ctc}</B>
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
  return (
    <>
      <Title>Internship-Cum-Placement Opportunity</Title>
      <P>
        The internship is designed to provide practical exposure and evaluate your suitability for a full-time role at AutoRevive. Upon successful completion of the 3-month internship, your overall performance will be evaluated. Based on the performance evaluation and the Company&rsquo;s business requirements, you may be considered for a full-time employment opportunity with AutoRevive.
      </P>
      <Title>Performance Evaluation Criteria</Title>
      <P>
        Your internship performance will be evaluated based on the following factors:
      </P>
      <ul className="mb-[4mm] list-disc space-y-[1.5mm] pl-[8mm] text-[3.6mm] leading-[1.7] text-doc-ink">
        <li>Technical and functional performance</li>
        <li>Quality and timely completion of assigned work</li>
        <li>Attendance and punctuality</li>
        <li>Learning ability and initiative</li>
        <li>Communication and teamwork</li>
        <li>Professional conduct</li>
        <li>Overall contribution to the Company</li>
        <li>Ability to take responsibility and work independently</li>
      </ul>
      <Title>Placement &amp; Starting Compensation</Title>
      <P>
        If selected for full-time employment based on the internship performance evaluation, you will be offered a starting compensation of <B>₹XX,XXX per month</B>. The final designation, compensation, employment terms, and applicable benefits will be communicated separately through the Employment/Appointment Letter.
      </P>
      <P>
        Full-time employment is subject to satisfactory internship performance, successful evaluation, availability of a suitable position, and the Company&rsquo;s business requirements. Completion of the internship does not constitute an automatic entitlement to employment.
      </P>
      <Title>Internship Compensation &amp; Completion Certificate</Title>
      <P>
        The internship is <B>{d.stipend?.toLowerCase() === "unpaid" ? "unpaid" : d.stipend}</B>
        {d.stipend?.toLowerCase() === "unpaid"
          ? " and does not carry any stipend or salary. An Internship Completion Certificate will be issued upon successful completion of the internship, subject to the Company&rsquo;s applicable policies."
          : " per month. An Internship Completion Certificate will be issued upon successful completion of the internship, subject to the Company&rsquo;s applicable policies."}
      </P>
    </>
  );
}

function TermsPage({ d }: { d: DocumentData }) {
  return (
    <>
      <Title>Terms &amp; Conditions</Title>
      <ol className="list-decimal space-y-[2.5mm] pl-[7mm] text-[3.6mm] leading-[1.8] text-doc-ink">
        <li>Your internship is subject to verification of all documents submitted by you.</li>
        <li>
          During your internship engagement, you shall maintain strict confidentiality of all company
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
          Either party may terminate this internship engagement by providing {d.noticePeriod} written notice or
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

function ClosingPage({ d }: { d: DocumentData }) {
  return (
    <>
      <Title>Documents Required for Internship Joining</Title>
      <ul className="mb-[4mm] list-disc space-y-[1.5mm] pl-[8mm] text-[3.6mm] leading-[1.7] text-doc-ink">
        <li>Aadhaar Card</li>
        <li>PAN Card</li>
        <li>Educational Certificates</li>
        <li>Passport-size Photographs</li>
        <li>Bank Account Details</li>
        <li>Previous Employment Documents (if applicable) with 3 months&rsquo; pay slip</li>
      </ul>
      <P>
        Kindly sign and return a copy of this letter as a token of your acceptance on or before{" "}
        <B>{fmt(d.acceptByDate, "________")}</B>. We welcome you to AutoRevive and look forward to a
        successful and rewarding internship experience.
      </P>
      <P>
        Should you have any questions regarding this internship offer, please feel free to contact our
        Human Resources department at <B>hr@autorevives.com</B> or <B>+91 9489991230</B>.
      </P>
    </>
  );
}

/** Returns the page bodies for the selected document type. Signature goes on the last page. */
export function buildPages(d: DocumentData): ReactNode[] {
  const pages: ReactNode[] = [<Intro key="intro" d={d} />];
  if (isInternshipType(d.docType)) pages.push(<PerformancePage key="perf" d={d} />);
  const annualCtc = isInternshipType(d.docType) ? 0 : parseAmount(d.ctc);
  if (annualCtc > 0) pages.push(<SalaryPage key="salary" annualCtc={annualCtc} />);
  pages.push(<TermsPage key="terms" d={d} />);
  pages.push(<ClosingPage key="close" d={d} />);
  return pages;
}

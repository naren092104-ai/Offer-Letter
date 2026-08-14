import { computeSalary, inr, type SalaryBreakdown } from "@/lib/salary";

function Head({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-[3mm] text-[3.7mm] font-bold uppercase tracking-wide text-doc-ink">
      {children}
    </h3>
  );
}

function Cell({
  children,
  align = "right",
  bold,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  bold?: boolean;
}) {
  return (
    <td
      className={`border-b border-doc-rule px-[3mm] py-[1.6mm] text-[3.2mm] ${
        align === "right" ? "text-right tabular-nums" : "text-left"
      } ${bold ? "font-bold" : ""}`}
    >
      {children}
    </td>
  );
}

export function SalarySection({ breakdown }: { breakdown: SalaryBreakdown }) {
  const b = breakdown;
  return (
    <div className="mt-[4mm] space-y-[6mm]">
      <div className="overflow-hidden rounded-[2mm] border border-brand bg-white">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-doc-dark/95">
              <th className="px-[3mm] py-[1.6mm] text-left text-[3.1mm] font-semibold uppercase tracking-wide text-white">
                Component
              </th>
              <th className="px-[3mm] py-[1.6mm] text-right text-[3.1mm] font-semibold uppercase tracking-wide text-white">
                Monthly
              </th>
              <th className="px-[3mm] py-[1.6mm] text-right text-[3.1mm] font-semibold uppercase tracking-wide text-white">
                Annual
              </th>
            </tr>
          </thead>
          <tbody>
            {b.components.map((row) => (
              <tr key={row.label}>
                <Cell align="left">{row.label}</Cell>
                <Cell>{inr(row.monthly)}</Cell>
                <Cell>{inr(row.annual)}</Cell>
              </tr>
            ))}
            <tr className="bg-brand text-brand-foreground">
              <td className="px-[3mm] py-[2mm] text-[3.3mm] font-bold uppercase">Total CTC</td>
              <td className="px-[3mm] py-[2mm] text-right text-[3.3mm] font-bold tabular-nums">
                {inr(Math.round(b.ctcAnnual / 12))}
              </td>
              <td className="px-[3mm] py-[2mm] text-right text-[3.3mm] font-bold tabular-nums">
                {inr(b.ctcAnnual)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-hidden rounded-[2mm] border border-brand bg-white">
        <div className="bg-doc-dark px-[4mm] py-[2mm]">
          <p className="text-[3.4mm] font-bold uppercase tracking-wide text-white">
            Salary Breakup &amp; In-Hand Estimation
          </p>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <Cell align="left" bold>
                Gross Earnings (Monthly)
              </Cell>
              <Cell bold>{inr(b.grossMonthly)}</Cell>
            </tr>
            <tr>
              <Cell align="left">Deductions</Cell>
              <Cell>—</Cell>
            </tr>
            {b.deductions.map((d) => (
              <tr key={d.label}>
                <Cell align="left">
                  <span className="pl-[4mm]">{d.label}</span>
                </Cell>
                <Cell>{inr(d.monthly)}</Cell>
              </tr>
            ))}
            <tr>
              <Cell align="left" bold>
                Total Deductions
              </Cell>
              <Cell bold>{inr(b.totalDeductionsMonthly)}</Cell>
            </tr>
            <tr className="bg-brand text-brand-foreground">
              <td className="px-[3mm] py-[2mm] text-[3.3mm] font-bold uppercase">
                Estimated Monthly In-Hand
              </td>
              <td className="px-[3mm] py-[2mm] text-right text-[3.3mm] font-bold tabular-nums">
                {inr(b.inHandMonthly)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-[2.9mm] italic leading-[1.5] text-doc-muted">
        Figures are indicative and computed from the annual CTC using the company&rsquo;s standard
        salary structure. Actual deductions may vary based on statutory rules and declarations.
      </p>
    </div>
  );
}

export function SalaryPage({ annualCtc }: { annualCtc: number }) {
  return (
    <>
      <Head>Compensation Details</Head>
      <SalarySection breakdown={computeSalary(annualCtc)} />
    </>
  );
}

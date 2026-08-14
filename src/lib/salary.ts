/**
 * Configurable compensation model. These are template defaults — change the
 * percentages here, never hard-code amounts into the letter content.
 */
export const SALARY_CONFIG = {
  /** share of annual CTC */
  basicPct: 0.4,
  hraPct: 0.16,
  variablePct: 0.05,
  otherAllowancePct: 0.05,
  /** employer PF as a share of basic */
  employerPfPct: 0.12,
  /** employee PF as a share of basic */
  employeePfPct: 0.12,
  /** flat professional tax per month */
  professionalTaxMonthly: 200,
  otherDeductionsMonthly: 0,
} as const;

export interface SalaryRow {
  label: string;
  monthly: number;
  annual: number;
}

export interface SalaryBreakdown {
  ctcAnnual: number;
  components: SalaryRow[];
  grossMonthly: number;
  deductions: SalaryRow[];
  totalDeductionsMonthly: number;
  inHandMonthly: number;
}

/** Pulls a number out of free text like "₹4,50,000 per annum". */
export function parseAmount(value: string): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^\d.]/g, "");
  const n = Number.parseFloat(cleaned);
  if (!Number.isFinite(n) || n <= 0) return 0;
  // treat small numbers as lakhs (e.g. "4.5 LPA")
  if (/lpa|lakh/i.test(value) && n < 1000) return Math.round(n * 100000);
  return Math.round(n);
}

const r = (n: number) => Math.round(n);

export function computeSalary(annualCtc: number): SalaryBreakdown {
  const c = SALARY_CONFIG;
  const basic = r(annualCtc * c.basicPct);
  const hra = r(annualCtc * c.hraPct);
  const variable = r(annualCtc * c.variablePct);
  const other = r(annualCtc * c.otherAllowancePct);
  const employerPf = r(basic * c.employerPfPct);
  const special = Math.max(0, annualCtc - (basic + hra + variable + other + employerPf));

  const rows: SalaryRow[] = [
    { label: "Basic Salary", annual: basic, monthly: r(basic / 12) },
    { label: "HRA", annual: hra, monthly: r(hra / 12) },
    { label: "Special Allowance", annual: special, monthly: r(special / 12) },
    { label: "Employer PF", annual: employerPf, monthly: r(employerPf / 12) },
    { label: "Variable / Performance Pay", annual: variable, monthly: r(variable / 12) },
    { label: "Other Allowance", annual: other, monthly: r(other / 12) },
  ];

  const grossAnnual = basic + hra + special + other;
  const grossMonthly = r(grossAnnual / 12);
  const employeePfMonthly = r((basic * c.employeePfPct) / 12);

  const deductions: SalaryRow[] = [
    { label: "Employee PF", monthly: employeePfMonthly, annual: employeePfMonthly * 12 },
    {
      label: "Professional Tax",
      monthly: c.professionalTaxMonthly,
      annual: c.professionalTaxMonthly * 12,
    },
    {
      label: "Other Deductions",
      monthly: c.otherDeductionsMonthly,
      annual: c.otherDeductionsMonthly * 12,
    },
  ];

  const totalDeductionsMonthly = deductions.reduce((s, d) => s + d.monthly, 0);

  return {
    ctcAnnual: annualCtc,
    components: rows,
    grossMonthly,
    deductions,
    totalDeductionsMonthly,
    inHandMonthly: grossMonthly - totalDeductionsMonthly,
  };
}

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

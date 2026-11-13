import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/components/LegalPage";
import { RISK_SECTIONS } from "@/features/legal/content";
import { SITE_URL } from "@/config/site";

const description = "Important risk information for financial-market education and hypothetical research scenarios.";

export const metadata: Metadata = {
  title: "Risk Disclosure",
  description,
  alternates: { canonical: `${SITE_URL}/risk-disclosure` },
};

export default function RiskDisclosurePage() {
  return <LegalPage eyebrow="Legal" title="Risk Disclosure Statement" description={description} sections={RISK_SECTIONS} />;
}

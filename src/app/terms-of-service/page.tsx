import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/components/LegalPage";
import { TERMS_SECTIONS } from "@/features/legal/content";
import { SITE_URL } from "@/config/site";

const description = "The current status of Phantom King terms of service and what the platform is for.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description,
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
};

export default function TermsOfServicePage() {
  return <LegalPage eyebrow="Legal" title="Terms of Service" description={description} sections={TERMS_SECTIONS} />;
}

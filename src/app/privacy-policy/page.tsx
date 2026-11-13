import type { Metadata } from "next";
import { LegalPage } from "@/features/legal/components/LegalPage";
import { PRIVACY_SECTIONS } from "@/features/legal/content";
import { SITE_URL } from "@/config/site";

const description = "How the Phantom King learning platform handles your account, learning and payment information.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description,
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return <LegalPage eyebrow="Legal" title="Privacy Policy" description={description} sections={PRIVACY_SECTIONS} />;
}

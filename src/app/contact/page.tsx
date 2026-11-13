import type { Metadata } from "next";
import { ContactPage } from "@/features/contact/components/ContactPage";
import { SITE_URL } from "@/config/site";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "Contact & Support",
  description:
    "Find information about Phantom King support, complaints and corrections.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: "Contact Phantom King",
    description:
      "Phantom King learning support, general enquiries, complaints and corrections.",
    type: "website",
    url: `${siteUrl}/contact`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Phantom King",
    description:
      "Phantom King learning support, general enquiries, complaints and corrections.",
  },
};

export default function ContactRoutePage() {
  return <ContactPage />;
}

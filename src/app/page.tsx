import type { Metadata } from "next";
import { PrimeLandingPage } from "@/features/prime-landing/PrimeLandingPage";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/config/site";

const title = `${SITE_NAME} — ${SITE_TAGLINE}`;

export const metadata: Metadata = {
  title,
  description: SITE_DESCRIPTION,
  keywords: [
    "forex trading education",
    "learn forex trading",
    "gold XAUUSD education",
    "forex risk management",
    "crypto trading basics",
    "Bitcoin education",
    "market structure",
    "trading journal",
    "broker comparison",
    "portfolio risk analytics",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
};

export default function HomePage() {
  return <PrimeLandingPage />;
}

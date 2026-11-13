import type { Metadata } from "next";
import { AboutPage } from "@/features/about/components/AboutPage";
import { SITE_URL } from "@/config/site";

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  title: "About Phantom King",
  description:
    "Phantom King is an international financial markets education, research and trading technology platform. Learn about our mission, principles and editorial standards.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: "About Phantom King",
    description:
      "The mission, principles and editorial standards behind Phantom King.",
    type: "website",
    url: `${siteUrl}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: "About Phantom King",
    description:
      "The mission, principles and editorial standards behind Phantom King.",
  },
};

export default function AboutRoutePage() {
  return <AboutPage />;
}

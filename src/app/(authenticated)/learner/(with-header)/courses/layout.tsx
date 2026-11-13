import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { SITE_URL } from "@/config/site";
const siteUrl = SITE_URL;
const siteName = "Phantom King";
export const metadata: Metadata = {
    title: "Browse Courses | Phantom King",
    description: "Explore our collection of courses across business, technology, finance, design, and professional skills.",
    alternates: {
        canonical: `${siteUrl}/learner/courses`,
    },
    openGraph: {
        title: "Browse Courses | Phantom King",
        description: "Discover courses across business, technology, finance, design, and professional development.",
        url: `${siteUrl}/learner/courses`,
        siteName: siteName,
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function CoursesLayout({ children }: PropsWithChildren) {
    return <>{children}</>;
}

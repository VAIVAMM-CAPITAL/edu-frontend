import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
const siteUrl = SITE_URL;
const siteName = "Phantom King";
export const metadata: Metadata = {
    title: "Sign Up | Phantom King",
    description: "Create your Phantom King account. Start learning Forex, Gold and Crypto with structured modules and progress tracking.",
    alternates: {
        canonical: `${siteUrl}/signup`,
    },
    openGraph: {
        title: "Sign Up | Phantom King",
        description: "Start learning today with Phantom King. Create your account in minutes.",
        url: `${siteUrl}/signup`,
        siteName: siteName,
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function SignupLayout({ children, }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

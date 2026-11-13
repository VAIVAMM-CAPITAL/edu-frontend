import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
const siteUrl = SITE_URL;
const siteName = "Phantom King";
export const metadata: Metadata = {
    title: "Login | Phantom King",
    description: "Sign in to your Phantom King account. Access your modules and learning progress.",
    alternates: {
        canonical: `${siteUrl}/login`,
    },
    openGraph: {
        title: "Login | Phantom King",
        description: "Sign in to access your courses and learning tools at Phantom King.",
        url: `${siteUrl}/login`,
        siteName: siteName,
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};
export default function LoginLayout({ children, }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

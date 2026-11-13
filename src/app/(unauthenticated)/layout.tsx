import type { Metadata } from "next";
import { SITE_URL } from "@/config/site";
const siteUrl = SITE_URL;
const siteName = "Phantom King";
export const metadata: Metadata = {
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        siteName: siteName,
        locale: "en_US",
        type: "website",
    },
};
export default function UnauthenticatedLayout({ children, }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}

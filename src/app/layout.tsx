import type { Metadata, Viewport } from "next";
import { Manrope, Inter, Poppins } from "next/font/google";
import "../../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "@/components/providers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/config/site";
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    variable: "--font-poppins",
});
const siteUrl = SITE_URL;
const siteName = SITE_NAME;
const siteDescription = SITE_DESCRIPTION;
export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${siteName} — ${SITE_TAGLINE}`,
        template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: [
        "trading education",
        "forex academy",
        "gold and commodities education",
        "crypto academy",
        "market research",
        "risk management",
        "financial markets courses",
        "online courses",
    ],
    authors: [{ name: siteName, url: siteUrl }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: siteUrl,
        languages: {
            "en-AE": siteUrl,
            "en-IN": siteUrl,
            en: siteUrl,
        },
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: siteName,
        title: `${siteName} — ${SITE_TAGLINE}`,
        description: siteDescription,
        images: [
            {
                url: `${siteUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: `${siteName} — ${SITE_TAGLINE}`,
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: `${siteName} — ${SITE_TAGLINE}`,
        description: siteDescription,
        images: [`${siteUrl}/og-image.png`],
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    category: "Education",
};
export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
        { media: "(prefers-color-scheme: dark)", color: "#1b1a17" },
    ],
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};
export default function RootLayout({ children, }: Readonly<{
    children: React.ReactNode;
}>) {
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        name: siteName,
        url: siteUrl,
        logo: `${siteUrl}/brand/phantom-king-crown.png`,
        description: siteDescription,
    };
    const websiteJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: siteUrl,
        description: siteDescription,
        potentialAction: {
            "@type": "SearchAction",
            target: {
                "@type": "EntryPoint",
                urlTemplate: `${siteUrl}/learner/courses?search={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
        },
    };
    return (<html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteUrl}/>
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192"/>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"/>
        <link rel="manifest" href="/manifest.json"/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
        }}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
        }}/>
      </head>
      <body className={`${manrope.variable} ${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>);
}

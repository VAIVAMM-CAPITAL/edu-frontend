"use client";

import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { PageHeader } from "@/components/marketing/motion/PageHeader";
import { Reveal } from "@/components/marketing/motion/Reveal";
import { AnimatedCtaRow } from "@/components/marketing/motion/AnimatedCtaRow";

export type LegalSection = { heading: string; paragraphs: string[] };

type LegalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, description, sections }: LegalPageProps) {
  return (
    <MarketingPageShell>
      <main className="relative pt-28 pb-20 md:pt-36 lg:pt-44">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <PageHeader eyebrow={eyebrow} title={title} description={description} />

          <div className="mt-14 space-y-12">
            {sections.map((section) => (
              <Reveal as="section" key={section.heading}>
                <h2
                  className="display"
                  style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.2, color: "var(--text-primary)" }}
                >
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="text-base leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <AnimatedCtaRow
            ctas={[
              { label: "Privacy Policy", href: "/privacy-policy", variant: "ghost" },
              { label: "Terms of Service", href: "/terms-of-service", variant: "ghost" },
              { label: "Risk Disclosure", href: "/risk-disclosure", variant: "ghost" },
            ]}
          />
        </div>
      </main>
    </MarketingPageShell>
  );
}

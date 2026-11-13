"use client";

import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { PageHeader } from "@/components/marketing/motion/PageHeader";
import { Reveal } from "@/components/marketing/motion/Reveal";
import { AnimatedCtaRow } from "@/components/marketing/motion/AnimatedCtaRow";
import { SectionHeading, cardClass } from "@/components/marketing/section";
import { Eyebrow } from "@/features/prime-landing/components/ui/Eyebrow";
import {
  BRAND_ARCHITECTURE,
  CORE_PILLARS,
  EDITORIAL_STANDARDS,
  PRINCIPLES,
} from "@/config/phantom-content";

export function AboutPage() {
  return (
    <MarketingPageShell>
      <main className="relative pt-28 pb-20 md:pt-36 lg:pt-44">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PageHeader
            eyebrow="About"
            title={
              <>
                Intelligence over emotion.{" "}
                <em className="italic text-[var(--gold)]">Strategy over speculation.</em>
              </>
            }
            description="Phantom King is an international financial markets education, research and trading technology platform for ambitious traders, investors and market enthusiasts."
          />

          <Reveal as="section" className="mt-16">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[3fr_2fr]">
              <div className="space-y-5">
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Phantom King is envisioned as a global platform connecting financial market
                  education, independent research methodologies, trading analytics and responsible
                  market participation.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Our mission is to make complex market concepts accessible through structured
                  learning and transparent analytical frameworks. Our vision is to become a trusted
                  international destination for traders who value evidence, discipline and
                  continuous development.
                </p>
                <p className="text-lg leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  We believe market participation begins with education, preparation, transparency
                  and responsible risk management. We do not promise profits. We build knowledge. We
                  do not ignore risk. We respect it.
                </p>
              </div>

              <div className={cardClass}>
                <Eyebrow>Our principles</Eyebrow>
                <ul className="mt-5 space-y-3 text-sm">
                  {PRINCIPLES.map((principle) => (
                    <li key={principle} className="flex items-center gap-3">
                      <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                      <span style={{ color: "var(--text-primary)" }}>{principle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal as="section" className="mt-20">
            <SectionHeading eyebrow="What we do" title="Core pillars" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {CORE_PILLARS.map((pillar, index) => (
                <div key={pillar} className={cardClass}>
                  <span className="display text-2xl text-[var(--gold-bright)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--text-primary)" }}>
                    {pillar}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className="mt-20">
            <SectionHeading eyebrow="How we publish" title="Editorial standards" />
            <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {EDITORIAL_STANDARDS.map((standard) => (
                <li
                  key={standard}
                  className="flex items-start gap-3 text-base leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <span className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                  {standard}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section" className="mt-20">
            <SectionHeading eyebrow="The Phantom King family" title="Brand architecture" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {BRAND_ARCHITECTURE.map((brand) => (
                <div key={brand.name} className={cardClass}>
                  <h3
                    className="text-sm font-semibold uppercase tracking-[0.16em]"
                    style={{ color: "var(--gold-bright)" }}
                  >
                    {brand.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {brand.description}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <AnimatedCtaRow
            ctas={[
              { label: "Explore the Forex Academy", href: "/#chapter-courses", variant: "gold" },
              { label: "Start learning", href: "/signup", variant: "ghost" },
              { label: "Contact our team", href: "/contact", variant: "ghost" },
            ]}
          />
        </div>
      </main>
    </MarketingPageShell>
  );
}

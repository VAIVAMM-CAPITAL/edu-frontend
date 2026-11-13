"use client";

import { LifeBuoy, Mail, ShieldAlert } from "lucide-react";
import { MarketingPageShell } from "@/components/marketing/MarketingPageShell";
import { PageHeader } from "@/components/marketing/motion/PageHeader";
import { Reveal } from "@/components/marketing/motion/Reveal";
import { AnimatedCtaRow } from "@/components/marketing/motion/AnimatedCtaRow";
import { SectionHeading, cardClass } from "@/components/marketing/section";
import { CONTACT_EMAIL } from "@/config/company";

const TOPICS = [
  {
    icon: LifeBuoy,
    title: "Learning support",
    body: "Help with your account, module access, payments and lesson playback.",
  },
  {
    icon: Mail,
    title: "General enquiries",
    body: "Questions about the academy, membership tiers and upcoming modules.",
  },
  {
    icon: ShieldAlert,
    title: "Complaints and corrections",
    body: "Tell us if something is wrong or unclear. We correct errors transparently.",
  },
];

export function ContactPage() {
  return (
    <MarketingPageShell>
      <main className="relative pt-28 pb-20 md:pt-36 lg:pt-44">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PageHeader
            eyebrow="Contact & Support"
            title={
              <>
                Talk to{" "}
                <em className="italic text-[var(--gold)]">Phantom King</em>
              </>
            }
            description="Support for learners, general enquiries, and a clear route for complaints and corrections."
          />

          <Reveal as="section" className="mt-16">
            <SectionHeading eyebrow="How we can help" title="Reach the right team" />
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {TOPICS.map((topic) => (
                <div key={topic.title} className={cardClass}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--gold)]/10 text-[var(--gold-bright)]">
                    <topic.icon className="h-5 w-5" />
                  </span>
                  <h3
                    className="mt-5 text-base font-semibold tracking-tight"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {topic.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal as="section" className="mt-16">
            <div className={cardClass}>
              {CONTACT_EMAIL ? (
                <>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Email us and we will route your message to the right team.
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-3 inline-block text-lg font-medium text-[var(--gold-bright)] underline-offset-4 hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </>
              ) : (
                <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Our support contact details are being finalised and will be published here. If you
                  already have an account, sign in to reach your learning space.
                </p>
              )}
            </div>
          </Reveal>

          <AnimatedCtaRow
            ctas={[
              { label: "Start learning", href: "/signup", variant: "gold" },
              { label: "About Phantom King", href: "/about", variant: "ghost" },
              { label: "Explore the academy", href: "/#chapter-courses", variant: "ghost" },
            ]}
          />
        </div>
      </main>
    </MarketingPageShell>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/features/prime-landing/lib/gsap";
import { useRouter } from "next/navigation";
import { MEMBERSHIP_NOTE, MEMBERSHIP_TIERS } from "@/config/phantom-content";
import { useScrollStore } from "@/features/prime-landing/components/providers/ScrollStore";
import { Eyebrow } from "@/features/prime-landing/components/ui/Eyebrow";
import { Button } from "@/features/prime-landing/components/ui/Button";

export function Chapter7Plans() {
  const rootRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();
  const setChapter = useScrollStore((s) => s.setChapter);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    // Keep cards readable at all times; animate position only.
    gsap.set(cards, { y: 18, opacity: 1 });

    const enter = gsap.to(cards, {
      y: 0,
      duration: 0.9,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: {
        trigger: root,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "center 70%",
        end: "bottom top",
        scrub: 1,
      },
    });
    // Keep side cards readable on light background.
    tl.to(cards[0], { x: -20, duration: 1, ease: "none" }, 0);
    tl.to(cards[cards.length - 1], { x: 20, duration: 1, ease: "none" }, 0);

    const chapterTrigger = ScrollTrigger.create({
      trigger: root,
      start: "top center",
      end: "bottom center",
      onEnter: () => setChapter("plans"),
      onEnterBack: () => setChapter("plans"),
    });

    return () => {
      enter.scrollTrigger?.kill();
      enter.kill();
      tl.scrollTrigger?.kill();
      tl.kill();
      chapterTrigger.kill();
    };
  }, [setChapter]);

  return (
    <section
      ref={rootRef}
      id="chapter-plans"
      className="relative w-full px-6 py-36 lg:px-16"
      style={{ backgroundColor: "var(--paper)" }}
      aria-label="Membership"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Eyebrow onPaper>Membership</Eyebrow>
          <h2
            className="display mt-3"
            style={{
              fontSize: "clamp(2rem, 5.5vw, 4.25rem)",
              color: "var(--text-primary-ink)",
            }}
          >
            Choose your{" "}
            <em className="italic" style={{ color: "var(--gold-dark)" }}>
              tier
            </em>
            .
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {MEMBERSHIP_TIERS.map((plan, i) => (
            <div
              key={plan.name}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-[var(--gold)] bg-[var(--ink)] text-[var(--text-primary)] shadow-[0_24px_60px_-20px_rgba(212,165,116,0.35)]"
                  : "border-[rgba(10,10,15,0.24)] bg-white/95 text-[var(--text-primary-ink)] shadow-[0_18px_50px_rgba(27,26,23,0.12)]"
              }`}
            >
              <p
                className="text-xs uppercase tracking-[0.22em]"
                style={{ color: plan.highlighted ? "var(--gold-bright)" : "var(--gold-dark)" }}
              >
                {plan.tier}
              </p>
              <h3
                className="display mt-3"
                style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.05 }}
              >
                {plan.name}
              </h3>
              <p
                className="mt-3 text-sm"
                style={{
                  color: plan.highlighted ? "var(--text-secondary)" : "var(--text-secondary-ink)",
                }}
              >
                {plan.available ? "Open now" : "Opening soon"}
              </p>
              <ul className="mt-8 flex-1 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                    <span
                      style={{
                        color: plan.highlighted ? "var(--text-primary)" : "var(--text-primary-ink)",
                      }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button
                  type="button"
                  variant={plan.highlighted ? "primary" : "gold"}
                  className="w-full"
                  onClick={() => router.push(plan.available ? "/signup" : "/contact")}
                >
                  {plan.available ? "Start learning" : "Contact our team"}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <p
          className="mx-auto mt-10 max-w-3xl text-center text-sm"
          style={{ color: "var(--text-secondary-ink)" }}
        >
          {MEMBERSHIP_NOTE}
        </p>
      </div>
    </section>
  );
}

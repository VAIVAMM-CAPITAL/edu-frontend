"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap, ScrollTrigger, registerGsap } from "@/features/prime-landing/lib/gsap";
import { useScrollStore } from "@/features/prime-landing/components/providers/ScrollStore";
import { Button } from "@/features/prime-landing/components/ui/Button";
import { ScrollIndicator } from "@/features/prime-landing/components/ui/ScrollIndicator";
import { MarketArchitecture } from "../hero/MarketArchitecture";

export function Chapter1Gate() {
  const router = useRouter();
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setPortalProgress = useScrollStore((s) => s.setPortalProgress);
  const setChapter = useScrollStore((s) => s.setChapter);
  const scrollTo = (hash: string) => {
    const target = document.querySelector(hash) as HTMLElement | null;
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    const lenis = (
      window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } }
    ).__lenis;
    if (lenis?.scrollTo) {
      lenis.scrollTo(top, {
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 5),
      });
    } else {
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const content = contentRef.current;
    if (!root || !content) return;

    const triggers: ScrollTrigger[] = [];

    triggers.push(
      ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => setPortalProgress(self.progress),
      })
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: root,
        start: "top center",
        end: "bottom center",
        onEnter: () => setChapter("gate"),
        onEnterBack: () => setChapter("gate"),
      })
    );

    const fade = gsap.to(content, {
      opacity: 0,
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const heroItems = content.querySelectorAll<HTMLElement>("[data-hero-item]");
    gsap.set(heroItems, { opacity: 0, y: 24 });
    const enterHero = () => {
      gsap.to(heroItems, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: "expo.out",
      });
    };
    window.addEventListener("pl:loader-complete", enterHero, { once: true });
    const safety = window.setTimeout(enterHero, 1200);

    return () => {
      triggers.forEach((t) => t.kill());
      fade.scrollTrigger?.kill();
      fade.kill();
      window.removeEventListener("pl:loader-complete", enterHero);
      window.clearTimeout(safety);
    };
  }, [setPortalProgress, setChapter]);

  return (
    <section
      ref={rootRef}
      id="chapter-gate"
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ backgroundColor: "var(--ink)" }}
      aria-label="Introduction"
    >
      <MarketArchitecture />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[rgba(27,26,23,0.42)]"
      />

      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <h1
          data-hero-item
          className="display mt-8 max-w-[16ch]"
          style={{
            fontSize: "clamp(3rem, 8vw, 7rem)",
            textShadow: "0 0 80px rgba(212,165,116,0.15)",
            color: "var(--text-primary)",
          }}
        >
          Master the markets.{" "}
          <em className="italic text-[var(--gold)]">Rule your future.</em>
        </h1>
        <p data-hero-item className="body-lg mt-8 max-w-xl">
          Choose a Forex, Gold, Crypto or Bitcoin course. Follow its videos at your own pace, with course PDFs available after purchase.
        </p>
        <div
          data-hero-item
          className="mt-6 flex items-center justify-center gap-4 text-[13px] opacity-60"
          style={{ color: "var(--text-secondary)" }}
        >
          <span>Learn with Purpose. Analyse with Precision. Trade with Discipline.</span>
        </div>
        <div
          data-hero-item
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button type="button" variant="primary" onClick={() => scrollTo("#chapter-courses")}>
            Explore Our Academy
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push("/login")}>
            Sign in
          </Button>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}


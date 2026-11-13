"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ScrollTrigger, registerGsap } from "@/features/prime-landing/lib/gsap";
import { useScrollStore } from "@/features/prime-landing/components/providers/ScrollStore";
import { Eyebrow } from "@/features/prime-landing/components/ui/Eyebrow";
import { Button } from "@/features/prime-landing/components/ui/Button";
import { FallbackHero } from "@/features/prime-landing/components/hero/FallbackHero";

const PortalScene = dynamic(
  () =>
    import("@/features/prime-landing/components/hero/PortalScene").then(
      (m) => m.PortalScene
    ),
  { ssr: false, loading: () => <FallbackHero /> }
);

export function Chapter8Graduation() {
  const router = useRouter();
  const rootRef = useRef<HTMLElement>(null);
  const setChapter = useScrollStore((s) => s.setChapter);
  const setMorph = useScrollStore((s) => s.setMorph);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const morphTrigger = ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => setMorph(self.progress),
    });
    const chapterTrigger = ScrollTrigger.create({
      trigger: root,
      start: "top center",
      end: "bottom center",
      onEnter: () => setChapter("graduation"),
      onEnterBack: () => setChapter("graduation"),
    });

    return () => {
      morphTrigger.kill();
      chapterTrigger.kill();
    };
  }, [setChapter, setMorph]);

  return (
    <section
      ref={rootRef}
      id="chapter-graduation"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--ink)" }}
      aria-label="Begin"
    >
      <div className="absolute inset-0">
        <PortalScene source="graduation" mode="graduation" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[rgba(27,26,23,0.5)]"
      />
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <Eyebrow>Phantom King</Eyebrow>
        <h2
          className="display mt-4 max-w-[18ch]"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
            textShadow: "0 0 80px rgba(212,165,116,0.15)",
            color: "var(--text-primary)",
          }}
        >
          Learn the market. Understand the risk.{" "}
          <em className="italic text-[var(--gold)]">Master your process.</em>
        </h2>
        <p className="body-lg mt-6 max-w-xl">Education first. No promises of profit, and no shortcuts around risk.</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Button type="button" variant="primary" onClick={() => router.push("/signup")}>
            Start Learning
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.push("/contact")}>
            Contact Our Team
          </Button>
        </div>
      </div>
    </section>
  );
}


"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/features/prime-landing/lib/gsap";
import { useScrollStore } from "@/features/prime-landing/components/providers/ScrollStore";
import { Eyebrow } from "@/features/prime-landing/components/ui/Eyebrow";

import { SERVICE_CARDS } from "@/config/phantom-content";

export function Chapter4Categories() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setChapter = useScrollStore((s) => s.setChapter);

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1px)", () => {
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    const chapterTrigger = ScrollTrigger.create({
      trigger: root,
      start: "top center",
      end: "bottom center",
      onEnter: () => setChapter("categories"),
      onEnterBack: () => setChapter("categories"),
    });

    return () => {
      mm.revert();
      chapterTrigger.kill();
    };
  }, [setChapter]);

  return (
    <section
      ref={rootRef}
      id="chapter-categories"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", backgroundColor: "var(--paper)" }}
      aria-label="What Phantom King covers"
    >
      <div className="absolute left-8 top-16 z-10 lg:left-24">
        <Eyebrow onPaper>Six pillars</Eyebrow>
        <h2
          className="display mt-3 whitespace-nowrap"
          style={{
            fontSize: "clamp(1.75rem, 4.5vw, 3.5rem)",
            color: "var(--text-primary-ink)",
          }}
        >
          Market intelligence,{" "}
          <em className="italic" style={{ color: "var(--gold-dark)" }}>
            end to end
          </em>
          .
        </h2>
      </div>

      <div className="absolute inset-0 flex items-center pt-[clamp(8rem,18vh,12rem)]">
        <div
          ref={trackRef}
          className="flex items-stretch gap-[clamp(1rem,2vw,2rem)] pl-[clamp(1rem,4vw,4rem)] pr-[clamp(1rem,4vw,4rem)]"
          style={{ willChange: "transform" }}
        >
          {SERVICE_CARDS.map(({ number, division, name, description }) => (
            <article
              key={number}
              className="group relative flex w-[80vw] shrink-0 flex-col gap-6 rounded-2xl border border-[rgba(10,10,15,0.08)] bg-white/40 p-8 backdrop-blur transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:bg-white/60 md:w-[40vw] lg:w-[28vw] lg:gap-8 lg:p-10"
              style={{ minHeight: "46vh" }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-2xl border border-[var(--gold)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <span
                className="display shrink-0"
                style={{
                  fontSize: "clamp(3rem, 5vw, 4.5rem)",
                  color: "var(--gold-dark)",
                }}
              >
                {number}
              </span>
              <p
                className="text-xs uppercase tracking-[0.22em]"
                style={{ color: "var(--text-tertiary-ink)" }}
              >
                {division}
              </p>
              <div className="flex-1" aria-hidden="true" />
              <div className="shrink-0">
                <h3
                  className="headline"
                  style={{
                    fontSize: "clamp(1.5rem, 2.4vw, 2.25rem)",
                    color: "var(--text-primary-ink)",
                  }}
                >
                  {name}
                </h3>
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: "var(--text-secondary-ink)" }}
                >
                  {description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


import { Eyebrow } from "@/features/prime-landing/components/ui/Eyebrow";

export const cardClass =
  "rounded-3xl border border-[var(--fog)] bg-white/[0.02] p-6 transition-colors duration-300 hover:border-[var(--gold-bright)]";

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="display mt-4"
        style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", lineHeight: 1.15, color: "var(--text-primary)" }}
      >
        {title}
      </h2>
    </div>
  );
}

import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  /** `full` shows the crown with the wordmark, `mark` shows the crown only. */
  variant?: "full" | "mark";
  size?: "sm" | "md" | "lg";
  /** Hide the wordmark below the `sm` breakpoint to save header space. */
  collapseOnMobile?: boolean;
  className?: string;
  priority?: boolean;
};

const SIZES = {
  sm: { crown: "h-8 w-10", name: "text-[12px]", tag: "text-[8px]" },
  md: { crown: "h-[41px] w-[50px]", name: "text-[14px]", tag: "text-[10px]" },
  lg: { crown: "h-16 w-20", name: "text-[20px]", tag: "text-[12px]" },
} as const;

/**
 * Phantom King lockup: crown plus the uppercase wordmark. Text colour is
 * inherited, so it works on both the ivory and the charcoal surfaces.
 */
export function BrandLogo({
  variant = "full",
  size = "md",
  collapseOnMobile = false,
  className,
  priority = false,
}: BrandLogoProps) {
  const s = SIZES[size];
  return (
    <span className={cn("inline-flex shrink-0 items-center gap-[11px]", className)}>
      <Image
        src="/brand/phantom-king-crown.png"
        alt={variant === "mark" ? "Phantom King" : ""}
        aria-hidden={variant === "mark" ? undefined : true}
        width={640}
        height={520}
        className={cn("shrink-0 object-contain", s.crown)}
        priority={priority}
      />
      {variant === "full" && (
        <span className={cn("grid gap-px leading-[1.1]", collapseOnMobile && "hidden sm:grid")}>
          <strong className={cn("font-sans font-extrabold tracking-[0.125em]", s.name)}>
            PHANTOM KING
          </strong>
          <small className={cn("mt-[3px] font-sans font-semibold tracking-[0.11em] opacity-70", s.tag)}>
            GLOBAL TRADING INTELLIGENCE
          </small>
        </span>
      )}
    </span>
  );
}

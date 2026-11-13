import { formatMoney, isPurchasable, type MarketPrice } from "@/lib/market";
import { cn } from "@/lib/utils";

/**
 * A module's price in the visitor's country, with the original price struck
 * through when set. Modules without a price in that country say so instead.
 */
export function CoursePrice({
  course,
  className,
  priceClassName,
}: {
  course: MarketPrice;
  className?: string;
  priceClassName?: string;
}) {
  if (!isPurchasable(course)) {
    return <span className={cn("text-xs sm:text-sm text-muted-foreground", className)}>Not available in your country</span>;
  }
  const price = Number(course.price);
  const compareAt = course.compareAtPrice !== null && course.compareAtPrice !== undefined ? Number(course.compareAtPrice) : null;
  return (
    <span className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("text-base sm:text-lg font-bold text-primary", priceClassName)}>{formatMoney(price, course.currency)}</span>
      {compareAt !== null && Number.isFinite(compareAt) && compareAt > price && (
        <span className="text-xs sm:text-sm text-muted-foreground line-through">{formatMoney(compareAt, course.currency)}</span>
      )}
    </span>
  );
}

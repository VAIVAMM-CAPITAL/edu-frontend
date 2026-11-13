"use client";

import { useEffect, useState } from "react";
import { MARKETS, getMarket, readMarketCookie, writeMarketCookie, isMarketCode, type MarketCode } from "@/lib/market";
import { cn } from "@/lib/utils";

/**
 * Country picker for prices. The choice is stored in a cookie that the API
 * client and the middleware send with every request, then the page reloads so
 * every price, the cart and checkout switch to that country's price list.
 */
export function MarketSelector({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const [market, setMarket] = useState<MarketCode | null>(null);

  useEffect(() => {
    setMarket(readMarketCookie());
  }, []);

  const current = getMarket(market);

  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Country for prices</span>
      <select
        value={current.code}
        onChange={(event) => {
          const next = event.target.value;
          if (!isMarketCode(next) || next === current.code) return;
          writeMarketCookie(next);
          setMarket(next);
          window.location.reload();
        }}
        title={`Prices in ${current.currency} for ${current.name}`}
        className={cn(
          "h-10 max-w-full cursor-pointer appearance-none truncate rounded-full border pl-3 pr-8 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--gold,#c9a253)]",
          tone === "dark"
            ? "border-[var(--fog,#3a3a3a)] bg-transparent text-current hover:border-[var(--gold,#c9a253)]"
            : "border-input bg-background text-foreground hover:bg-muted/50",
        )}
      >
        {MARKETS.map((item) => (
          <option key={item.code} value={item.code} className="text-black">
            {item.flag} {item.name} · {item.currency}
          </option>
        ))}
      </select>
      <svg aria-hidden="true" viewBox="0 0 12 12" className="pointer-events-none absolute right-3 h-3 w-3 opacity-60">
        <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </label>
  );
}

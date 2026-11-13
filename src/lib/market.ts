/**
 * Countries with their own module prices. Each has its own price list in its
 * own currency (set by an admin, never converted). Visitors from other
 * countries see the US price list. Must match backend/src/markets/markets.ts.
 */
export const MARKETS = [
  { code: "US", country: "US", name: "United States", currency: "USD", locale: "en-US", flag: "🇺🇸", gateway: "STRIPE" },
  { code: "UK", country: "GB", name: "United Kingdom", currency: "GBP", locale: "en-GB", flag: "🇬🇧", gateway: "STRIPE" },
  { code: "AE", country: "AE", name: "United Arab Emirates", currency: "AED", locale: "en-AE", flag: "🇦🇪", gateway: "STRIPE" },
  { code: "IN", country: "IN", name: "India", currency: "INR", locale: "en-IN", flag: "🇮🇳", gateway: "RAZORPAY" },
] as const;

export type MarketCode = (typeof MARKETS)[number]["code"];
export type Market = (typeof MARKETS)[number];

export const DEFAULT_MARKET: MarketCode = "US";
/** Cookie holding the visitor's market; read by the API client and the middleware. */
export const MARKET_COOKIE = "pk_market";
/** Header the API reads the market from. */
export const MARKET_HEADER = "x-pk-market";

export function isMarketCode(value: unknown): value is MarketCode {
  return typeof value === "string" && MARKETS.some((market) => market.code === value);
}

export function getMarket(code: string | null | undefined): Market {
  return MARKETS.find((market) => market.code === code) ?? MARKETS.find((market) => market.code === DEFAULT_MARKET)!;
}

/** Market for an ISO country code; other countries use the default. */
export function marketForCountry(country: string | null | undefined): MarketCode {
  const code = (country || "").toUpperCase();
  return MARKETS.find((market) => market.country === code || market.code === code)?.code ?? DEFAULT_MARKET;
}

export function readMarketCookie(): MarketCode | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${MARKET_COOKIE}=([^;]*)`));
  const value = match ? decodeURIComponent(match[1]) : null;
  return isMarketCode(value) ? value : null;
}

export function writeMarketCookie(code: MarketCode) {
  document.cookie = `${MARKET_COOKIE}=${code}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
}

/** "$49.00", "£39.50", "AED 179.00", "₹3,999.00": formatted for the price's own currency. */
export function formatMoney(amount: string | number | null | undefined, currency: string): string {
  const value = typeof amount === "string" ? Number(amount) : amount;
  if (value === null || value === undefined || !Number.isFinite(value)) return "";
  const market = MARKETS.find((item) => item.currency === currency.toUpperCase());
  try {
    return new Intl.NumberFormat(market?.locale ?? "en-US", { style: "currency", currency: currency.toUpperCase() }).format(value);
  } catch {
    return `${currency.toUpperCase()} ${value.toFixed(2)}`;
  }
}

/** Price fields the API returns for a module in the visitor's market. */
export interface MarketPrice {
  price: string | null;
  compareAtPrice?: string | number | null;
  currency: string;
  purchasable?: boolean;
}

/** A module can be bought when it has a price in the visitor's market. */
export function isPurchasable(course: MarketPrice): boolean {
  return course.purchasable !== false && course.price !== null && Number(course.price) > 0;
}

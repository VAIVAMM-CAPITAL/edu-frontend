/**
 * Currency of the instructor course editor's single price field. That field
 * edits the UAE (AED) price; every country's price is managed under
 * Admin > Courses > Prices by country. Shown and charged prices always come
 * from the API in the visitor's country currency (see src/lib/market.ts).
 */
export const PLATFORM_CURRENCY = (process.env.NEXT_PUBLIC_PLATFORM_CURRENCY || "AED").trim().toUpperCase();

export type PaymentGateway = "RAZORPAY" | "STRIPE" | "STRIPE_US" | "STRIPE_UAE";

/** Kept for older screens; the API chooses the gateway from the buyer's country. */
export const DEFAULT_PAYMENT_GATEWAY: PaymentGateway = "STRIPE";

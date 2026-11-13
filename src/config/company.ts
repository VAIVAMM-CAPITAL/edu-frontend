import { SITE_NAME, SITE_TAGLINE } from "@/config/site";

/** Brand identity shown across the site. */
export const COMPANY = {
  brandName: SITE_NAME,
  tagline: SITE_TAGLINE,
  motto: "Master the Markets. Rule Your Future.",
} as const;

/**
 * Public support address. Set NEXT_PUBLIC_CONTACT_EMAIL per environment;
 * when it is empty the site shows no email address at all.
 */
export const CONTACT_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL || "").trim();

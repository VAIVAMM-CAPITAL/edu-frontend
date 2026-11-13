/**
 * Site identity used for metadata, canonical URLs and structured data.
 * Set NEXT_PUBLIC_SITE_URL to the public origin in each deployed environment.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "Phantom King";
export const SITE_TAGLINE = "Global Trading Intelligence";
export const SITE_DESCRIPTION =
  "Learn with purpose. Explore financial markets through structured education, transparent research and practical risk tools from Phantom King.";

import Link from "next/link";
import { BrandLogo } from "@/components/brand/brand-logo";
import { ModeToggle } from "@/components/theme-toggle";

/** Default header for dashboard layouts that do not supply their own. */
export function Navbar() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur-md sm:px-6">
      <Link href="/" className="text-foreground" aria-label="Phantom King home">
        <BrandLogo collapseOnMobile priority />
      </Link>
      <ModeToggle />
    </header>
  );
}

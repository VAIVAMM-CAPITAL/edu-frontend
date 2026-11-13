import Link from "next/link";

const LINKS = [
  { label: "About Phantom King", href: "/about" },
  { label: "Contact & Support", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Risk Disclosure", href: "/risk-disclosure" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-8 sm:px-6" role="contentinfo">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
        <span>© 2026 PHANTOM KING — Global Trading Intelligence. All Rights Reserved.</span>
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

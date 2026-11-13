export type NavItem = {
  label: string;
  href: string;
};

/** Primary marketing navigation - use `/#section` for homepage anchors. */
export const PRIMARY_NAV: NavItem[] = [
  { label: "Academy", href: "/#chapter-courses" },
  { label: "Membership", href: "/#chapter-plans" },
  { label: "About", href: "/about" },
  { label: "Contact & Support", href: "/contact" },
];

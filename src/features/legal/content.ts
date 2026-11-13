import { CRYPTO_RISK_NOTE, RISK_DISCLAIMER } from "@/config/phantom-content";
import type { LegalSection } from "@/features/legal/components/LegalPage";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Status of this notice",
    paragraphs: [
      "This page summarises how the Phantom King learning platform handles personal information today. It is not yet the complete privacy notice.",
      "A complete notice will identify the responsible legal entity, the purposes and lawful bases for processing, data categories, retention periods, processors, international transfers, your rights, cookie controls and a working privacy contact. Those details will be confirmed and published before commercial launch. This summary does not claim compliance with any specific data-protection law.",
    ],
  },
  {
    heading: "Information the platform uses",
    paragraphs: [
      "Account details: the name and email address you provide when you sign up, and a securely hashed password. We never store your password in readable form.",
      "Learning activity: the modules you enrol in, your lesson progress, quiz attempts and the contents of your cart.",
      "Purchases: records of orders and payment status. Card details are entered with our payment processor and are not stored by the platform.",
      "Technical data: information your browser sends when it requests pages, such as IP address and device type, used to operate and secure the service.",
    ],
  },
  {
    heading: "How it is used",
    paragraphs: [
      "To create and secure your account, give you access to the modules you have purchased, track your progress, process payments and send service emails such as account verification and password resets.",
      "We do not sell personal information.",
    ],
  },
  {
    heading: "Service providers",
    paragraphs: [
      "The platform relies on third-party providers for hosting, payment processing, video delivery and transactional email. They process information on our behalf under their own terms and privacy practices.",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "You can update your profile from your account, and you can ask for your account to be closed. Browser settings let you clear or restrict stored site data, which will sign you out.",
      "Do not submit sensitive personal, trading-account or payment information through contact messages.",
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Status of these terms",
    paragraphs: [
      "Final terms of service have not yet been approved or published. This page is informational and does not create contractual terms.",
      "Before publication, the responsible legal entity, governing law, services covered, country eligibility, subscription and refund rules, intellectual property, acceptable use, complaints process and service availability will be confirmed and reviewed.",
    ],
  },
  {
    heading: "Educational purpose",
    paragraphs: [
      "Phantom King provides financial-market education. Educational material and market commentary are general information. They do not constitute personal investment advice or a promise of results.",
      "Hypothetical examples and scenarios are labelled as such and are not actionable instructions.",
    ],
  },
  {
    heading: "Your account and content",
    paragraphs: [
      "Keep your sign-in details private and tell us if you believe your account has been accessed without permission.",
      "Lessons, videos and written materials are provided for your personal learning. Do not copy, redistribute or resell them.",
    ],
  },
  {
    heading: "Availability",
    paragraphs: [
      "Availability of products and services varies by jurisdiction. Nothing on this website is an offer of a regulated financial service.",
    ],
  },
];

export const RISK_SECTIONS: LegalSection[] = [
  {
    heading: "General risk disclaimer",
    paragraphs: [RISK_DISCLAIMER],
  },
  {
    heading: "Leveraged products",
    paragraphs: [
      "Trading Forex, Commodities (XAU/USD) and Cryptocurrencies carries a high level of risk and may not be suitable for all investors. Leveraged products can result in losses exceeding initial deposits.",
    ],
  },
  {
    heading: "Digital assets",
    paragraphs: [CRYPTO_RISK_NOTE],
  },
  {
    heading: "Scenarios and performance",
    paragraphs: [
      "Market scenarios are uncertain and are not personal recommendations. Hypothetical examples, backtests and simulated outcomes may differ materially from real execution. No audited live performance record is presented on this website.",
    ],
  },
  {
    heading: "Your circumstances",
    paragraphs: [
      "Product eligibility, investor protections, leverage rules and regulatory requirements differ by country and provider. Educational materials do not take account of your objectives, financial circumstances or needs. Consider obtaining independent, jurisdiction-specific advice where appropriate.",
    ],
  },
];

/**
 * Phantom King website content.
 * Source: "Phantom King — International Website Content & Digital Platform
 * Blueprint" (October 2026). Keep wording aligned with that document.
 */

export type CurriculumModule = {
  number: string;
  title: string;
  level: "Foundations" | "Core skills" | "Applied practice" | "Advanced";
  topics: string[];
};

export const FOREX_MODULES: CurriculumModule[] = [
  {
    number: "01",
    title: "Forex Foundations",
    level: "Foundations",
    topics: ["What is FX", "Market participants", "Currency pairs", "Base and quote currencies", "Pips", "Lots", "Spreads", "Bid and ask", "Leverage", "Margin", "Swap", "Trading costs"],
  },
  {
    number: "02",
    title: "Market Mechanics",
    level: "Foundations",
    topics: ["Liquidity", "Execution", "Slippage", "Market and pending orders", "Trading sessions", "Rollover", "Market structure and volatility"],
  },
  {
    number: "03",
    title: "Technical Analysis",
    level: "Core skills",
    topics: ["Candlesticks", "Support and resistance", "Trends", "Patterns", "Moving averages", "RSI", "MACD", "Fibonacci", "Multi-timeframe analysis"],
  },
  {
    number: "04",
    title: "Smart Money Concepts",
    level: "Core skills",
    topics: ["BOS", "CHoCH", "Liquidity sweeps", "Order blocks", "Fair value gaps", "Inducement", "Premium and discount zones", "Competing interpretations"],
  },
  {
    number: "05",
    title: "Macroeconomics",
    level: "Core skills",
    topics: ["Central banks", "Rates", "Inflation", "CPI", "PCE", "NFP", "GDP", "Bond yields", "DXY", "Geopolitics", "Event calendars"],
  },
  {
    number: "06",
    title: "Trading Methods",
    level: "Applied practice",
    topics: ["Scalping", "Intraday", "Swing", "Breakout", "Pullback", "Trend following", "London and New York sessions", "Backtesting"],
  },
  {
    number: "07",
    title: "Gold Masterclass",
    level: "Applied practice",
    topics: ["XAU/USD", "Real yields", "USD", "Central bank demand", "Risk sentiment", "Liquidity", "News-driven volatility"],
  },
  {
    number: "08",
    title: "Risk and Psychology",
    level: "Applied practice",
    topics: ["Position sizing", "Stops", "Expectancy", "Risk/reward", "Leverage", "Correlation", "Drawdowns", "Journaling", "Emotional discipline"],
  },
  {
    number: "09",
    title: "Systems and Automation",
    level: "Advanced",
    topics: ["TradingView", "MT5 education", "Pine Script", "Expert advisors", "Algorithmic backtesting", "Execution limitations"],
  },
  {
    number: "10",
    title: "Professional Research",
    level: "Advanced",
    topics: ["Research notes", "Scenario mapping", "Trade review", "Strategy validation", "Benchmark selection", "Performance attribution"],
  },
];

export const CRYPTO_MODULES: CurriculumModule[] = [
  {
    number: "01",
    title: "Blockchain Fundamentals",
    level: "Foundations",
    topics: ["Distributed ledgers", "Consensus", "Keys", "Wallets", "Transaction confirmation", "Network fees"],
  },
  {
    number: "02",
    title: "Bitcoin",
    level: "Foundations",
    topics: ["Supply", "Mining", "Halving", "Custody", "Adoption", "Valuation uncertainty", "Market cycles"],
  },
  {
    number: "03",
    title: "Ethereum and Smart Contracts",
    level: "Core skills",
    topics: ["EVM", "Gas", "Token standards", "Decentralized applications", "Contract risk"],
  },
  {
    number: "04",
    title: "Crypto Market Structure",
    level: "Core skills",
    topics: ["Spot", "Perpetuals", "Futures", "Order books", "Funding rates", "Open interest", "Liquidity", "Liquidation risk"],
  },
  {
    number: "05",
    title: "Decentralized Finance",
    level: "Applied practice",
    topics: ["DEXs", "Liquidity pools", "Lending", "Stablecoins", "Bridges", "Protocol vulnerabilities"],
  },
  {
    number: "06",
    title: "Security and Custody",
    level: "Applied practice",
    topics: ["Cold wallets", "Phishing", "Seed phrases", "Exchange counterparty risk", "Recovery practices"],
  },
  {
    number: "07",
    title: "Token Research",
    level: "Advanced",
    topics: ["Tokenomics", "Market cap", "FDV", "Vesting", "Governance", "On-chain metrics", "Due diligence"],
  },
  {
    number: "08",
    title: "Portfolio Risk",
    level: "Advanced",
    topics: ["Volatility", "Concentration", "Diversification", "Liquidity", "Regulation", "Taxes", "Custody"],
  },
];

export const ACADEMIES = [
  { key: "forex", label: "Forex Academy", modules: FOREX_MODULES },
  { key: "crypto", label: "Crypto Academy", modules: CRYPTO_MODULES },
] as const;

export type ServiceCard = {
  number: string;
  division: string;
  name: string;
  description: string;
};

export const SERVICE_CARDS: ServiceCard[] = [
  {
    number: "01",
    division: "Phantom Academy",
    name: "Forex Trading Academy",
    description: "Currency markets, chart analysis, macro events and trading systems.",
  },
  {
    number: "02",
    division: "Phantom Academy",
    name: "Gold & Commodities Intelligence",
    description: "XAU/USD, rates, yields, inflation and global risk sentiment.",
  },
  {
    number: "03",
    division: "Phantom Crypto",
    name: "Cryptocurrency Academy",
    description: "Blockchain, Bitcoin, Ethereum, digital-asset markets and security.",
  },
  {
    number: "04",
    division: "Phantom Research",
    name: "Market Research & Setups",
    description: "Scenario-based research, invalidation levels and disciplined planning.",
  },
  {
    number: "05",
    division: "Phantom Capital",
    name: "Portfolio Intelligence",
    description: "Allocation, diversification, drawdowns and risk-adjusted evaluation.",
  },
  {
    number: "06",
    division: "Phantom Brokers",
    name: "Broker Intelligence",
    description: "Transparent comparisons of providers and their regulatory status.",
  },
];

export type MembershipTier = {
  tier: string;
  name: string;
  features: string[];
  /** Only the free tier is open today; pricing for the others is not yet set. */
  available: boolean;
  highlighted?: boolean;
};

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    tier: "Free",
    name: "Market Explorer",
    features: ["Starter lessons", "Glossary", "Selected research", "Newsletter", "Community announcements"],
    available: true,
  },
  {
    tier: "Pro",
    name: "Phantom Trader",
    features: ["Advanced courses", "Webinars", "Technical research library", "Trading journal templates"],
    available: false,
    highlighted: true,
  },
  {
    tier: "Elite",
    name: "King’s Circle",
    features: ["Strategy workshops", "Macro research sessions", "Enhanced learning resources"],
    available: false,
  },
  {
    tier: "Institutional",
    name: "Phantom Intelligence",
    features: ["Professional research education", "Analytics training", "Custom workshops"],
    available: false,
  },
];

export const MEMBERSHIP_NOTE =
  "Membership prices, regions and benefits are still being defined. Membership does not imply assured profit, privileged execution or regulated investment advice.";

export const PRINCIPLES = ["Knowledge", "Repeatable process", "Discipline", "Risk controls", "Continuous improvement"];

export const CORE_PILLARS = [
  "Education and trader development",
  "Forex, commodities and digital-asset market intelligence",
  "Transparent research scenarios and performance methodology",
  "Portfolio analytics and risk education",
  "Broker comparison and technology tools",
  "Global community and multilingual access",
];

export const EDITORIAL_STANDARDS = [
  "Separate education from advertising.",
  "Label hypothetical examples.",
  "Identify the author and timestamp of research.",
  "Disclose material conflicts and referral arrangements.",
  "Correct errors transparently.",
  "Publish methodology and limitations for performance reporting.",
];

export const BRAND_ARCHITECTURE = [
  { name: "Phantom Academy", description: "Forex, gold and crypto education" },
  { name: "Phantom Research", description: "Market commentary and scenario library" },
  { name: "Phantom Crypto", description: "Digital asset education and analytics" },
  { name: "Phantom Capital", description: "Portfolio intelligence and conditional future regulated services" },
  { name: "Phantom Brokers", description: "Independent broker research and transparent comparisons" },
  { name: "Phantom Terminal", description: "Trading calculators, journals and analytics" },
];

export const RISK_DISCLAIMER =
  "Phantom King provides general educational information and market commentary unless a specific service is expressly identified as regulated and provided by a duly authorised legal entity. Nothing on this website is a guarantee of returns or personalised investment advice. Forex, CFDs, derivatives and digital assets involve significant risks, including the potential loss of all invested capital; leveraged products may create additional liabilities. Availability of products and services varies by jurisdiction. Past performance, simulated results and hypothetical examples do not predict future results.";

export const CRYPTO_RISK_NOTE =
  "Digital assets can be extremely volatile and may result in total capital loss.";

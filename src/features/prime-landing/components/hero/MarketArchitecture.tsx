import styles from "./MarketArchitecture.module.css";

const columns = [
  42, 60, 49, 81, 66, 104, 87, 124, 109, 142, 128, 161, 145, 179, 160, 196, 180,
  213, 194, 231, 216, 253, 235, 276,
];

/** Decorative market architecture, not a live chart or a price forecast. */
export function MarketArchitecture() {
  return (
    <div
      className={styles.scene}
      aria-hidden="true"
      data-testid="market-architecture"
    >
      <div className={styles.grid} />
      <div className={styles.light} />
      <svg
        viewBox="0 0 1440 700"
        preserveAspectRatio="xMidYMid slice"
        className={styles.chart}
      >
        <defs>
          <linearGradient id="market-gold" x1="0" y1="1" x2="0" y2="0">
            <stop stopColor="#7c5d31" stopOpacity=".1" />
            <stop offset="1" stopColor="#edcd8b" />
          </linearGradient>
        </defs>
        {columns.map((height, index) => {
          const x = 35 + index * 59;
          const y = 585 - height - index * 3;
          return (
            <g
              key={x}
              className={styles.candle}
              style={{ animationDelay: `${index * -0.37}s` }}
            >
              <line
                x1={x + 10}
                x2={x + 10}
                y1={y - 25}
                y2={y + height * 0.6 + 30}
                stroke="#d5ad69"
                strokeOpacity=".6"
              />
              <rect
                x={x}
                y={y}
                width="21"
                height={height * 0.6}
                rx="2"
                fill="url(#market-gold)"
                stroke="#edcd8b"
                strokeOpacity=".42"
              />
            </g>
          );
        })}
        <path
          className={styles.signal}
          d="M0 590 L120 550 L210 566 L340 492 L440 510 L540 428 L640 456 L760 374 L860 402 L980 300 L1090 327 L1210 235 L1320 269 L1440 160"
          fill="none"
          stroke="#f5d69c"
          strokeWidth="2"
        />
        <path
          d="M0 640 L170 600 L340 616 L510 555 L680 568 L850 496 L1020 510 L1190 423 L1440 390"
          fill="none"
          stroke="#b79556"
          strokeWidth="1"
          opacity=".3"
        />
      </svg>
      <div className={styles.shade} />
    </div>
  );
}

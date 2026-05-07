type Props = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "dark", className = "" }: Props) {
  const fill = variant === "light" ? "#F4F1EC" : "#1E3A5F";
  const accent = "#E2632F";
  return (
    <svg
      viewBox="0 0 220 28"
      className={className}
      role="img"
      aria-label="Angel Technology"
    >
      <g fill={fill}>
        <path d="M9 4 L0 24 H3 L5 19 H13 L15 24 H18 L9 4 Z M6 17 L9 9.5 L12 17 Z" />
        <text
          x="22"
          y="20"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fontWeight="600"
          fontSize="14"
          letterSpacing="0.02em"
          fill={fill}
        >
          ANGEL
        </text>
        <text
          x="68"
          y="20"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          fontWeight="500"
          fontSize="14"
          letterSpacing="0.02em"
          fill={fill}
          opacity={0.85}
        >
          TECHNOLOGY
        </text>
      </g>
      <circle cx="155" cy="14" r="2" fill={accent} />
    </svg>
  );
}

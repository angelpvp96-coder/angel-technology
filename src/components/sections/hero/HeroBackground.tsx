export function HeroBackground() {
  const lines = Array.from({ length: 24 });
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Vertical grid lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        {lines.map((_, i) => {
          const x = `${(i + 1) * (100 / (lines.length + 1))}%`;
          return (
            <line
              key={i}
              x1={x}
              x2={x}
              y1="0"
              y2="100%"
              stroke="rgba(244,241,236,0.06)"
              strokeWidth="1"
            />
          );
        })}
      </svg>
      {/* Radial gradient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 35%, rgba(74,111,142,0.18), transparent 70%)",
        }}
      />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-carbon" />
    </div>
  );
}

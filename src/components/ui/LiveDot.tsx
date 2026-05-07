type Props = {
  size?: "sm" | "md";
  className?: string;
  label?: string;
};

export function LiveDot({ size = "md", className = "", label }: Props) {
  const dim = size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2";
  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      aria-label={label ?? "indicador en vivo"}
    >
      <span className={`relative inline-flex ${dim}`}>
        <span
          aria-hidden
          className={`absolute inset-0 ${dim} animate-pulse-live rounded-full bg-signal/60`}
        />
        <span
          aria-hidden
          className={`relative inline-flex ${dim} rounded-full bg-signal`}
        />
      </span>
    </span>
  );
}

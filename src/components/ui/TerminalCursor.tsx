type Props = { className?: string };

export function TerminalCursor({ className = "" }: Props) {
  return (
    <span
      aria-hidden
      className={`animate-blink inline-block w-[0.5ch] translate-y-[1px] bg-operation align-baseline ${className}`}
      style={{ height: "1em" }}
    />
  );
}

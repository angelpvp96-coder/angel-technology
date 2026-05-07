type Props = {
  url: string;
  children: React.ReactNode;
  className?: string;
};

export function BrowserFrame({ url, children, className = "" }: Props) {
  return (
    <div
      className={[
        "overflow-hidden rounded-[1.25rem] border border-navy/15 bg-cream",
        "shadow-[0_32px_64px_rgba(0,0,0,0.3)]",
        "transition-shadow duration-300 ease-out",
        "group-hover/case:shadow-[0_40px_72px_rgba(0,0,0,0.36)]",
        className,
      ].join(" ")}
    >
      <div className="relative flex items-center gap-3 border-b border-navy/10 bg-gradient-to-b from-cream to-[#ECE7DF] px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E] shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840] shadow-[inset_0_-1px_0_rgba(0,0,0,0.1)]" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex max-w-[60%] items-center gap-2 truncate rounded-full border border-navy/10 bg-cream/80 px-3 py-1 font-mono text-[11px] text-navy/70">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-3 w-3 shrink-0 text-signal"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="truncate">{url}</span>
          </div>
        </div>
        <div aria-hidden className="w-12" />
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

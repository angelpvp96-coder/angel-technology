type Props = {
  number: string;
  eyebrow: string;
  className?: string;
};

export function FilosofiaSectionTitle({ number, eyebrow, className = "" }: Props) {
  return (
    <div
      className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-operation uppercase ${className}`}
    >
      <span>{number}</span>
      <span className="h-px w-8 bg-operation/40" />
      <span>{eyebrow}</span>
    </div>
  );
}

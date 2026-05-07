import * as React from "react";
import { MagneticWrapper } from "./MagneticWrapper";

type Variant = "primary" | "secondary" | "ghost" | "navy";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-[transform,box-shadow,background-color,color] duration-200 ease-out rounded-[1rem] focus-visible:outline-2 focus-visible:outline-operation focus-visible:outline-offset-3 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-operation text-cream shadow-[0_4px_16px_-4px_rgba(226,99,47,0.4)] hover:scale-[1.04] hover:shadow-[0_12px_36px_-8px_rgba(226,99,47,0.65)] active:scale-[0.98]",
  secondary:
    "border border-navy/30 text-navy hover:border-navy hover:bg-navy/5 hover:scale-[1.03] active:scale-[0.98]",
  navy: "bg-navy text-cream hover:bg-navy/90 hover:scale-[1.04] hover:shadow-[0_12px_36px_-8px_rgba(30,58,95,0.45)] active:scale-[0.98]",
  ghost: "text-navy hover:bg-navy/5",
};

const sizes: Record<Size, string> = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-5 py-3",
  lg: "text-base px-6 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Añade movimiento magnético sutil al cursor */
  magnetic?: boolean;
  children: React.ReactNode;
};

type AnchorProps = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & {
    as: "a";
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    as?: "button";
  };

export type ButtonComponentProps = AnchorProps | ButtonProps;

function renderChildren(children: React.ReactNode): React.ReactNode {
  // Find a trailing arrow → and wrap it in a span that translates on hover.
  if (typeof children !== "string") return children;
  const arrowMatch = children.match(/^(.*?)(\s*[→↓])\s*$/);
  if (!arrowMatch) return children;
  const [, label, arrow] = arrowMatch;
  return (
    <>
      <span>{label}</span>
      <span
        className="inline-block transition-transform duration-200 ease-out group-hover/btn:translate-x-1"
        aria-hidden
      >
        {arrow.trim()}
      </span>
    </>
  );
}

export function Button(props: ButtonComponentProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    magnetic = false,
    ...rest
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const inner = renderChildren(children);

  let element: React.ReactElement;
  if (props.as === "a") {
    const { as: _as, ...anchor } = rest as AnchorProps;
    void _as;
    element = (
      <a
        {...(anchor as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        className={classes}
      >
        {inner}
      </a>
    );
  } else {
    const { as: _as, ...btn } = rest as ButtonProps;
    void _as;
    element = (
      <button
        {...(btn as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        className={classes}
      >
        {inner}
      </button>
    );
  }

  if (magnetic) {
    return <MagneticWrapper>{element}</MagneticWrapper>;
  }
  return element;
}

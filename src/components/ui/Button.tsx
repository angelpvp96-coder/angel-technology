import * as React from "react";

type Variant = "primary" | "secondary" | "ghost" | "navy";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 ease-out rounded-[1rem] focus-visible:outline-2 focus-visible:outline-operation focus-visible:outline-offset-3 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-operation text-cream hover:scale-[1.02] hover:shadow-[0_8px_32px_-8px_rgba(226,99,47,0.5)] active:scale-[0.98]",
  secondary:
    "border border-navy/30 text-navy hover:border-navy hover:bg-navy/5 active:scale-[0.98]",
  navy:
    "bg-navy text-cream hover:bg-navy/90 hover:scale-[1.02] active:scale-[0.98]",
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

export function Button(props: ButtonComponentProps) {
  const {
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...rest
  } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.as === "a") {
    const { as: _as, ...anchor } = rest as AnchorProps;
    void _as;
    return (
      <a {...(anchor as React.AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {children}
      </a>
    );
  }
  const { as: _as, ...btn } = rest as ButtonProps;
  void _as;
  return (
    <button
      {...(btn as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={classes}
    >
      {children}
    </button>
  );
}

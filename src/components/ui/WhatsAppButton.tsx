import { Button, type ButtonComponentProps } from "./Button";
import { buildWhatsAppLink, type WhatsAppSource } from "@/lib/whatsapp";

type Props = {
  source: WhatsAppSource;
  message?: string;
  variant?: "primary" | "secondary" | "navy" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
};

export function WhatsAppButton({
  source,
  message,
  variant = "primary",
  size = "md",
  className,
  children,
}: Props) {
  const href = buildWhatsAppLink({ source, message });
  const props: ButtonComponentProps = {
    as: "a",
    href,
    target: "_blank",
    rel: "noopener noreferrer",
    variant,
    size,
    className,
    children,
  };
  return <Button {...props} />;
}

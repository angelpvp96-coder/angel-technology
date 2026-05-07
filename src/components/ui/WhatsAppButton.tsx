import { Button, type ButtonComponentProps } from "./Button";
import { buildWhatsAppLink, type WhatsAppSource } from "@/lib/whatsapp";

type Props = {
  source: WhatsAppSource;
  message?: string;
  variant?: "primary" | "secondary" | "navy" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  magnetic?: boolean;
  children: React.ReactNode;
};

export function WhatsAppButton({
  source,
  message,
  variant = "primary",
  size = "md",
  className,
  magnetic = false,
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
    magnetic,
    children,
  };
  return <Button {...props} />;
}

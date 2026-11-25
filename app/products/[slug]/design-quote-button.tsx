import { MessageCircle } from "lucide-react";
import { buildWhatsAppQuoteUrl } from "@/lib/site-config";

type DesignQuoteButtonProps = {
  sharePath: string;
  productName: string;
  designCode?: string;
  className?: string;
};

export default function DesignQuoteButton({
  sharePath,
  productName,
  designCode,
  className,
}: DesignQuoteButtonProps) {
  const whatsappUrl = buildWhatsAppQuoteUrl({
    productName,
    designCode,
    sharePath,
  });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Get a quote for ${productName} ${designCode || ""}`}
      className={className}
    >
      <MessageCircle size={12} /> Get a quote
    </a>
  );
}

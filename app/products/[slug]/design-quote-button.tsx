import { MessageCircle } from "lucide-react";

type DesignQuoteButtonProps = {
  shareUrl: string;
  message: string;
  label: string;
  className?: string;
};

export default function DesignQuoteButton({ shareUrl, message, label, className }: DesignQuoteButtonProps) {
  const whatsappMessage = `${message} Design link: ${shareUrl}`;

  return (
    <a
      href={`https://wa.me/919634776691?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Get a quote for ${label}`}
      className={className}
    >
      <MessageCircle size={12} /> Get a quote
    </a>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const WHATSAPP_URL = "https://wa.me/5538992076061";

export function DocLabel({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "dark" | "accent" | "debit";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "doc-label block",
        tone === "default" && "text-ink-soft",
        tone === "dark" && "text-cream-dim",
        tone === "accent" && "text-credit",
        tone === "debit" && "text-debit",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("wa-icon h-[1.15em] w-[1.15em] shrink-0", className)}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.23-8.23 2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.4-1.73-.14-.25-.01-.39.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.42.06-.64.31-.22.25-.85.83-.85 2.02 0 1.19.87 2.34.99 2.5.12.17 1.7 2.6 4.13 3.65.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.46-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  );
}

export function Btn({
  children,
  href,
  variant = "ink",
  full,
  className,
}: {
  children: ReactNode;
  href: string;
  variant?: "ink" | "paper";
  full?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md border px-7 py-3.5 text-[0.97rem] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0",
        variant === "ink" && "border-ink bg-ink text-paper hover:bg-ink-hover",
        variant === "paper" && "border-paper bg-paper text-ink hover:bg-paper-hover",
        full && "w-full",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function LedgerLine({
  label,
  value,
  tone = "neutral",
  dark,
}: {
  label: string;
  value: string;
  tone?: "neutral" | "debit" | "credit";
  dark?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-baseline gap-2.5 border-b py-3.5 last:border-b-0",
        dark ? "border-paper/15" : "border-rule-soft",
      )}
    >
      <span className={cn("font-medium", dark && "text-paper")}>{label}</span>
      <span className={dark ? "leader-dots-dark" : "leader-dots"} />
      <span
        className={cn(
          "font-mono text-[0.82rem] font-semibold whitespace-nowrap tracking-wide",
          tone === "neutral" && (dark ? "text-cream-dim" : "text-ink"),
          tone === "debit" && (dark ? "text-debit-on-dark" : "text-debit"),
          tone === "credit" && "text-credit",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-[6.5vw]", className)}>
      {children}
    </section>
  );
}

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1140px] px-[6vw]", className)}>{children}</div>;
}

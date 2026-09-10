import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function Soft({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-white/45" : "text-muted-foreground/70"}>{children}</span>;
}

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonBase, "border border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover", className)}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function SecondaryButton({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBase,
        tone === "dark" ? "border border-white/35 text-white hover:border-white hover:bg-white/5" : "border border-border text-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export function FinalCta() {
  const t = useTranslations("home.finalCta");
  const tActions = useTranslations("actions");

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-surface-dark py-24 text-white lg:py-[136px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:72px_72px] opacity-[0.13] [mask-image:linear-gradient(to_bottom,transparent_5%,#000_58%,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[42%] h-px w-[52%] bg-primary shadow-[0_0_90px_24px_rgba(49,92,255,0.18)]" />
      <Reveal className={cn(shell, "relative")}>
        <span className={cn(label, "text-primary-light")}>{t("eyebrow")}</span>
        <h2 id="cta-title" className={cn(displayHeading, "mt-9 max-w-[1040px] text-[38px] leading-[0.98] sm:text-[58px] lg:text-[82px]")}>
          {t("heading1")}
          <br />
          <Soft dark>{t("heading2")}</Soft>
        </h2>
        <p className="mt-8 max-w-[620px] text-[16px] leading-[1.65] text-white/60 sm:text-[18px]">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton href="/contact?type=consultation">{tActions("talkToExpert")}</PrimaryButton>
          <SecondaryButton href="/case-studies" tone="dark">
            {t("secondaryButton")}
          </SecondaryButton>
        </div>
      </Reveal>
    </section>
  );
}

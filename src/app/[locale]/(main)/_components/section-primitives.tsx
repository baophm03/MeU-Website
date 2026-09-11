import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

export { shell, displayHeading, label };

export function Section({
  id,
  variant = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  variant?: "white" | "surface" | "dark";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const variants = {
    white: "bg-background text-foreground",
    surface: "bg-muted text-foreground",
    dark: "bg-surface-dark-soft text-white",
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variants[variant], className)}>
      <Reveal className={shell}>{children}</Reveal>
    </section>
  );
}

export function SectionHead({
  id,
  index,
  eyebrow,
  title,
  summary,
  tone = "light",
  action,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  summary?: string;
  tone?: "light" | "dark";
  action?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
      <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
        {index ? <span className="text-primary">{index}</span> : null}
        <span className={dark ? "text-white/50" : "text-muted-foreground"}>{eyebrow}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
        <div className="flex flex-col items-start gap-6 lg:pt-2">
          {summary ? <p className={cn("max-w-md text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{summary}</p> : null}
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </div>
    </div>
  );
}

export function Soft({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-white/45" : "text-muted-foreground/70"}>{children}</span>;
}

export function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 border-b pb-2 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "border-white/35 text-white hover:border-primary-light focus-visible:outline-primary-light" : "border-border text-foreground hover:border-primary hover:text-primary focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

export function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonBase, "border border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover", className)}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

export function SecondaryButton({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
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

export function PageHero({
  eyebrow,
  title,
  summary,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  summary?: string;
  children?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-hero-title" className="relative overflow-hidden bg-surface-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-[length:72px_72px] opacity-[0.10] [mask-image:linear-gradient(to_bottom,transparent_5%,#000_55%,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[42%] h-px w-[48%] bg-primary shadow-[0_0_90px_24px_rgba(49,92,255,0.14)]" />
      <Reveal className={cn(shell, "relative")}>
        <div className="flex min-h-[420px] items-end pb-14 pt-32 sm:min-h-[480px] sm:pt-36 lg:min-h-[520px] lg:pb-20">
          <div className="w-full">
            <p className={cn(label, "text-primary-light")}>{eyebrow}</p>
            <h1
              id="page-hero-title"
              className={cn(displayHeading, "mt-5 max-w-[960px] text-[38px] uppercase leading-[1.02] sm:text-[52px] lg:text-[68px]")}
            >
              {title}
            </h1>
            {summary ? (
              <p className="mt-6 max-w-[620px] text-[16px] leading-[1.65] text-white/65 sm:text-[18px]">
                {summary}
              </p>
            ) : null}
            {children ? <div className="mt-9 flex flex-col gap-3 sm:flex-row">{children}</div> : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function CtaSection({
  eyebrow,
  heading1,
  heading2,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  heading1: string;
  heading2?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-surface-dark py-24 text-white lg:py-[136px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] bg-[length:72px_72px] opacity-[0.13] [mask-image:linear-gradient(to_bottom,transparent_5%,#000_58%,transparent)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[42%] h-px w-[52%] bg-primary shadow-[0_0_90px_24px_rgba(49,92,255,0.18)]" />
      <Reveal className={cn(shell, "relative")}>
        <span className={cn(label, "text-primary-light")}>{eyebrow}</span>
        <h2 id="cta-title" className={cn(displayHeading, "mt-9 max-w-[1040px] text-[38px] leading-[0.98] sm:text-[58px] lg:text-[82px]")}>
          {heading1}
          {heading2 ? (
            <>
              <br />
              <Soft dark>{heading2}</Soft>
            </>
          ) : null}
        </h2>
        <p className="mt-8 max-w-[620px] text-[16px] leading-[1.65] text-white/60 sm:text-[18px]">
          {description}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton href={primaryHref}>{primaryLabel}</PrimaryButton>
          {secondaryHref && secondaryLabel ? (
            <SecondaryButton href={secondaryHref} tone="dark">
              {secondaryLabel}
            </SecondaryButton>
          ) : null}
        </div>
      </Reveal>
    </section>
  );
}

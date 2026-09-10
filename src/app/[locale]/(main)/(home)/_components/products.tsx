import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function Section({
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

function SectionHead({
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

function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
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

export function Products() {
  const t = useTranslations("home.products");
  return (
    <Section variant="dark" id="products">
      <SectionHead
        tone="dark"
        index="05"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
        action={
          <ArrowLink href="/products" tone="dark">
            {t("viewPortfolio")}
          </ArrowLink>
        }
      />

      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <span className={cn(label, "text-primary-light")}>{t("productLabel")}</span>
          <h3 className={cn(displayHeading, "mt-6 text-[30px] leading-[1.08] text-white sm:text-[40px] lg:text-[46px]")}>{t("productHeading")}</h3>
          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-white/60">
            {t("productDesc")}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryButton href="/contact?type=demo">{t("requestDemo")}</PrimaryButton>
            <SecondaryButton href="/products/enterprise" tone="dark">
              {t("modulesIntegrations")}
            </SecondaryButton>
          </div>
        </div>

        {/* Abstract product interface — placeholder until an approved screenshot exists */}
        <div
          aria-label="Abstract representation of the MeU enterprise product interface"
          role="img"
          className="grid h-[320px] grid-cols-[60px_1fr] grid-rows-[36px_1fr] border border-white/20 bg-surface-dark-raised shadow-[24px_32px_72px_rgba(0,0,0,0.45)] sm:h-[400px] sm:grid-cols-[80px_1fr] lg:h-[440px] lg:[transform:perspective(1000px)_rotateY(-5deg)_rotateX(2deg)]"
        >
          <div aria-hidden="true" className="col-span-2 flex items-center gap-1.5 border-b border-white/15 px-4">
            <i className="size-[5px] bg-white/30" />
            <i className="size-[5px] bg-white/30" />
            <i className="size-[5px] bg-white/30" />
          </div>
          <div aria-hidden="true" className="border-r border-white/15" />
          <div aria-hidden="true" className="grid grid-cols-3 content-start gap-3.5 p-5 sm:gap-4 sm:p-6">
            <div className="h-16 border border-primary-light/20 bg-[linear-gradient(145deg,rgba(49,92,255,0.18),transparent)] sm:h-[92px]" />
            <div className="h-16 border border-primary-light/20 bg-[linear-gradient(145deg,rgba(49,92,255,0.18),transparent)] sm:h-[92px]" />
            <div className="h-16 border border-primary-light/20 bg-[linear-gradient(145deg,rgba(49,92,255,0.18),transparent)] sm:h-[92px]" />
            <div className="col-span-3 h-24 border border-white/15 bg-[repeating-linear-gradient(90deg,transparent_0_50px,rgba(49,92,255,0.16)_51px_52px)] sm:h-32" />
          </div>
        </div>
      </div>

      <p className={cn(label, "mt-14 border-t border-white/15 pt-6 normal-case tracking-[0.06em] text-white/40")}>
        {t("disclaimer")}
      </p>
    </Section>
  );
}

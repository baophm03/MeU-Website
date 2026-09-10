import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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

export function Industries() {
  const t = useTranslations("home.industries");
  const industries = [
    [t("ind1Title"), "/industries/healthcare", t("ind1Desc")],
    [t("ind2Title"), "/industries/logistics-supply-chain", t("ind2Desc")],
    [t("ind3Title"), "/industries/retail-commerce", t("ind3Desc")],
    [t("ind4Title"), "/industries/pharmaceutical-life-sciences", t("ind4Desc")],
    [t("ind5Title"), "/industries/education-training", t("ind5Desc")],
    [t("ind6Title"), "/industries/associations-organizations", t("ind6Desc")],
  ] as const;
  return (
    <Section variant="surface" id="industries">
      <SectionHead
        index="04"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
        action={<ArrowLink href="/industries">{t("allIndustries")}</ArrowLink>}
      />

      <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {industries.map(([name, href, copy], index) => (
          <Link
            key={name}
            href={href}
            className="group relative flex min-h-[280px] flex-col overflow-hidden border-b border-r border-border p-7 transition-colors duration-300 hover:bg-surface-dark focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-primary sm:min-h-[320px] lg:p-9"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-[60%] -right-[30%] left-[20%] h-[250px] -rotate-[14deg] border border-primary/25 transition-transform duration-300 group-hover:-translate-y-6 group-hover:rotate-[-8deg] group-hover:border-primary motion-reduce:transition-none"
            />
            <span className={cn(label, "relative text-primary")}>{`0${index + 1}`}</span>
            <h3 className={cn(displayHeading, "relative mt-auto pt-20 text-[24px] leading-[1.1] transition-colors group-hover:text-white sm:text-[28px]")}>{name}</h3>
            <p className="relative mt-3 max-w-[230px] text-[13px] leading-[1.55] text-muted-foreground transition-colors group-hover:text-white/60">{copy}</p>
            <ArrowUpRight
              aria-hidden="true"
              className="absolute bottom-7 right-7 h-5 w-5 text-muted-foreground/60 transition-colors group-hover:text-primary-light lg:bottom-9 lg:right-9"
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}

import type { ReactNode } from "react";
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

export function WhyMeu() {
  const t = useTranslations("home.whyMeu");

  const differentiators = [
    ["01", t("d1Title"), t("d1Desc")],
    ["02", t("d2Title"), t("d2Desc")],
    ["03", t("d3Title"), t("d3Desc")],
  ] as const;

  return (
    <Section variant="white" id="why-meu">
      <SectionHead
        index="08"
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("heading")}
          </>
        }
        summary={t("summary")}
      />

      <div className="grid border-l border-t border-border lg:grid-cols-3">
        {differentiators.map(([index, title, copy]) => (
          <article key={index} className="border-b border-r border-border p-7 sm:min-h-[280px] lg:p-9">
            <span className={cn(label, "text-primary")}>{index}</span>
            <h3 className={cn(displayHeading, "mt-8 text-[21px] leading-[1.2] sm:text-[24px] lg:mt-16")}>{title}</h3>
            <p className="mt-3.5 text-[14px] leading-[1.65] text-muted-foreground">{copy}</p>
          </article>
        ))}
      </div>

      <div className={cn(label, "mt-8 flex flex-col justify-between gap-3 border-t border-border pt-6 normal-case tracking-[0.06em] text-muted-foreground sm:flex-row sm:items-center")}>
        <span>{t("footerNote")}</span>
        <span className="uppercase tracking-[0.14em] text-primary">{t("proofNotPromises")}</span>
      </div>
    </Section>
  );
}

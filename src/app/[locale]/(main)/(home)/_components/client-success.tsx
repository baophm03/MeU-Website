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

export function ClientSuccess() {
  const t = useTranslations("home.clientSuccess");
  const caseRows = [
    [t("detail1Label"), t("detail1Desc")],
    [t("detail2Label"), t("detail2Desc")],
    [t("detail3Label"), t("detail3Desc")],
  ] as const;
  return (
    <Section variant="white" id="client-success">
      <SectionHead
        index="06"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
        action={<ArrowLink href="/case-studies">{t("allCaseStudies")}</ArrowLink>}
      />

      <article className="grid border border-border lg:grid-cols-[1.15fr_0.85fr]">
        <div className="relative min-h-[340px] overflow-hidden bg-surface-dark p-7 text-white sm:min-h-[420px] lg:min-h-[540px] lg:p-9">
          <span aria-hidden="true" className="pointer-events-none absolute -bottom-[10%] -right-[10%] left-[15%] top-[15%] -skew-y-[15deg] border border-primary/50 shadow-[-80px_0_120px_rgba(49,92,255,0.15)]">
            <span className="absolute inset-[18%] border border-white/15" />
          </span>
          <span className={cn(label, "relative text-white/45")}>{t("caseLabel")}</span>
          <strong className={cn(displayHeading, "absolute bottom-8 left-7 text-[28px] leading-[1] sm:text-[36px] lg:bottom-12 lg:left-9 lg:text-[42px]")}>
            {t("caseTitle")}
          </strong>
        </div>

        <div className="p-7 sm:p-10 lg:p-14">
          <span className={cn(label, "text-primary")}>{t("caseCategory")}</span>
          <h3 className={cn(displayHeading, "mt-6 text-[24px] leading-[1.15] sm:text-[30px]")}>{t("caseHeading")}</h3>
          <dl className="my-10 border-b border-border">
            {caseRows.map(([term, detail]) => (
              <div key={term} className="grid gap-2 border-t border-border py-5 sm:grid-cols-[92px_1fr] sm:gap-4">
                <dt className={cn(label, "pt-0.5 text-primary")}>{term}</dt>
                <dd className="text-[14px] leading-[1.6] text-muted-foreground">{detail}</dd>
              </div>
            ))}
          </dl>
          <ArrowLink href="/case-studies">{t("readClientStories")}</ArrowLink>
        </div>
      </article>
    </Section>
  );
}

import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight, Check, ChevronRight, MoveDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/shared/reveal";
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

export function BusinessSolutions() {
  const t = useTranslations("home.businessSolutions");
  const solutions = [
    [t("sol1"), "/solutions/business-process-optimization"],
    [t("sol2"), "/solutions/enterprise-management"],
    [t("sol3"), "/solutions/customer-experience"],
    [t("sol4"), "/solutions/digital-commerce"],
    [t("sol5"), "/solutions/custom-software-solutions"],
    [t("sol6"), "/solutions/cloud-devops"],
  ];
  const featuredPoints = [t("point1"), t("point2"), t("point3")];
  const blueprint = [
    [t("bp1Top"), t("bp1Bottom")],
    [t("bp2Top"), t("bp2Bottom")],
    [t("bp3Top"), t("bp3Bottom")],
  ];
  return (
    <Section variant="dark" id="solutions">
      <SectionHead
        tone="dark"
        index="02"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
        action={
          <ArrowLink href="/solutions" tone="dark">
            {t("allSolutions")}
          </ArrowLink>
        }
      />

      <div className="grid border border-white/15 lg:grid-cols-[1fr_1.3fr]">
        <div className="p-7 sm:p-10 lg:p-14">
          <span className={cn(label, "text-primary-light")}>{t("featuredLabel")}</span>
          <h3 className={cn(displayHeading, "mt-6 text-[28px] leading-[1.1] text-white sm:text-[36px] lg:text-[40px]")}>{t("cardHeading")}</h3>
          <p className="mt-5 max-w-[540px] text-[15px] leading-[1.7] text-white/60">
            {t("cardDesc")}
          </p>
          <ul className="mt-8 grid gap-3 text-[14px] text-white/85">
            {featuredPoints.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ArrowLink href="/solutions/digital-transformation" tone="dark">
              {t("exploreSolution")}
            </ArrowLink>
          </div>
        </div>

        {/* Blueprint: business priorities → operating model → working system */}
        <div
          aria-hidden="true"
          className="flex flex-col items-center justify-center gap-5 border-t border-white/15 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:36px_36px] px-6 py-14 sm:flex-row sm:gap-4 lg:border-l lg:border-t-0 lg:px-10"
        >
          {blueprint.map(([top, bottom], index, list) => (
            <div key={top} className="flex flex-col items-center gap-5 sm:flex-row sm:gap-4">
              <div
                className={cn(
                  "w-[168px] border px-5 py-6 text-center text-[10px] uppercase leading-[1.7] tracking-[0.12em] sm:w-auto sm:min-w-[132px]",
                  index === list.length - 1 ? "border-primary text-white shadow-[0_0_36px_rgba(49,92,255,0.25)]" : "border-white/25 text-white/55",
                )}
              >
                {top}
                <br />
                {bottom}
              </div>
              {index < list.length - 1 ? <MoveDownRight className="h-5 w-5 shrink-0 rotate-45 text-white/35 sm:rotate-0" /> : null}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid border-t border-white/15 sm:grid-cols-2">
        {solutions.map(([title, href], index) => (
          <Link
            key={title}
            href={href}
            className={cn(
              "group grid grid-cols-[54px_1fr_auto] items-center gap-3 border-b border-white/15 px-5 py-7 transition hover:bg-surface-dark-raised focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary-light",
              index % 2 === 0 ? "sm:border-r sm:border-white/15" : "",
            )}
          >
            <span className={cn(label, "text-white/35")}>{`0${index + 2}`}</span>
            <strong className="text-[16px] font-medium text-white sm:text-[18px]">{title}</strong>
            <ChevronRight aria-hidden="true" className="h-5 w-5 text-white/35 transition-transform group-hover:translate-x-1 group-hover:text-primary-light motion-reduce:transform-none" />
          </Link>
        ))}
      </div>
    </Section>
  );
}

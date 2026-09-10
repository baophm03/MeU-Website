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

export function AiWorkflow() {
  const t = useTranslations("home.aiWorkflow");
  const workflow = [
    [t("step1Top"), t("step1Mid"), t("step1Bottom")],
    [t("step2Top"), t("step2Mid"), t("step2Bottom")],
    [t("step3Top"), t("step3Mid"), t("step3Bottom")],
    [t("step4Top"), t("step4Mid"), t("step4Bottom")],
  ];
  const useCases = [t("tag1"), t("tag2"), t("tag3")];
  return (
    <Section variant="white" id="ai">
      <SectionHead
        index="03"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
        action={<ArrowLink href="/solutions/ai-intelligent-automation">{t("assessLink")}</ArrowLink>}
      />

      <div className="grid border-y border-border lg:grid-cols-[1fr_34px_1fr_34px_1fr_34px_1fr] lg:items-stretch">
        {workflow.map(([step, title, detail], index) => (
          <div key={step} className="contents">
            <div
              className={cn(
                "border-l-2 px-6 py-8 lg:min-h-[190px] lg:py-10",
                index === 1 ? "border-l-primary bg-accent" : "border-l-border",
              )}
            >
              <span className={cn(label, "text-primary")}>{step}</span>
              <strong className="mt-7 block text-[17px] font-medium sm:text-[19px]">{title}</strong>
              <small className="mt-3 block text-[13px] leading-[1.55] text-muted-foreground">{detail}</small>
            </div>
            {index < workflow.length - 1 ? (
              <div aria-hidden="true" className="mx-auto h-7 w-px bg-border lg:my-auto lg:h-px lg:w-full" />
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-px bg-border sm:grid-cols-3">
        {useCases.map((useCase) => (
          <span key={useCase} className="bg-background px-6 py-6 text-[14px] font-medium">
            {useCase}
          </span>
        ))}
      </div>
    </Section>
  );
}

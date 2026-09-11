import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
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

export function Insights() {
  const t = useTranslations("home.insights");

  const insights = [
    [t("card1Meta"), t("card1Title"), t("card1Desc"), "/insights/ai-automation"],
    [t("card2Meta"), t("card2Title"), t("card2Desc"), "/insights/enterprise-tech"],
    [t("card3Meta"), t("card3Title"), t("card3Desc"), "/insights/digital-transformation"],
  ] as const;

  return (
    <Section variant="surface" id="insights">
      <SectionHead
        index="09"
        eyebrow={t("eyebrow")}
        title={
          <>
            {t("heading")}
          </>
        }
        action={<ArrowLink href="/insights">{t("insightsHub")}</ArrowLink>}
      />

      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {insights.map(([meta, title, copy, href], index) => (
          <article key={title} className="group flex flex-col">
            <Link href={href} className="focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
              <span aria-hidden="true" className="relative block h-[200px] overflow-hidden bg-surface-dark-raised sm:h-[220px]">
                <span className={cn(label, "absolute left-6 top-6 z-10 text-primary-light")}>{`0${index + 1}`}</span>
                <i className="absolute -bottom-[180px] -right-[50px] size-[310px] rounded-full border border-primary shadow-[0_0_55px_rgba(49,92,255,0.25)] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              </span>
            </Link>
            <span className={cn(label, "mt-6 text-primary")}>{meta}</span>
            <h3 className={cn(displayHeading, "mt-3 text-[21px] leading-[1.25] sm:text-[23px]")}>
              <Link href={href} className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                {title}
              </Link>
            </h3>
            <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-muted-foreground">{copy}</p>
            <div className="mt-6">
              <ArrowLink href={href}>{t("readInsight")}</ArrowLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

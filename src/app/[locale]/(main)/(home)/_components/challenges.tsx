import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
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

export function Challenges() {
  const t = useTranslations("home.challenges");
  const challenges = [
    ["01", t("c1Title"), t("c1Desc")],
    ["02", t("c2Title"), t("c2Desc")],
    ["03", t("c3Title"), t("c3Desc")],
    ["04", t("c4Title"), t("c4Desc")],
    ["05", t("c5Title"), t("c5Desc")],
    ["06", t("c6Title"), t("c6Desc")],
  ];
  return (
    <Section variant="white" id="challenges">
      <SectionHead
        index="01"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
      />

      <div className="border-t border-border">
        {challenges.map(([index, title, copy]) => (
          <article
            key={index}
            className="group grid grid-cols-[40px_1fr_44px] items-center gap-4 border-b border-border py-8 transition-[padding,background-color] duration-200 hover:bg-muted sm:grid-cols-[90px_1fr_52px] sm:py-10 lg:hover:pl-4 motion-reduce:transition-none"
          >
            <span className={cn(label, "self-start pt-1.5 text-primary sm:pt-2")}>{index}</span>
            <div>
              <h3 className={cn(displayHeading, "text-[22px] leading-[1.15] sm:text-[27px] lg:text-[33px]")}>{title}</h3>
              <p className="mt-2.5 max-w-[600px] text-[14px] leading-[1.6] text-muted-foreground sm:text-[15px]">{copy}</p>
            </div>
            <Link
              href="/solutions"
              aria-label={t("explore", { title })}
              className="grid size-11 place-items-center border border-border text-foreground transition group-hover:border-primary group-hover:bg-primary group-hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:size-12"
            >
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}

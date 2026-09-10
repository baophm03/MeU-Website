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

export function Capabilities() {
  const t = useTranslations("home.capabilities");
  const capabilities = [
    ["01", t("cap1Title"), t("cap1Desc")],
    ["02", t("cap2Title"), t("cap2Desc")],
    ["03", t("cap3Title"), t("cap3Desc")],
    ["04", t("cap4Title"), t("cap4Desc")],
    ["05", t("cap5Title"), t("cap5Desc")],
  ] as const;
  return (
    <Section variant="dark" id="capabilities">
      <SectionHead
        tone="dark"
        index="07"
        eyebrow={t("eyebrow")}
        title={t("heading")}
        summary={t("summary")}
        action={
          <ArrowLink href="/solutions/technology-capabilities" tone="dark">
            {t("exploreCapabilities")}
          </ArrowLink>
        }
      />

      <ol className="grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-5 lg:border-t-0">
        {capabilities.map(([phase, name, copy]) => (
          <li key={phase} className="border-b border-white/15 px-6 py-8 sm:min-h-[230px] lg:border-b-0 lg:border-l lg:border-t lg:px-7 lg:py-9 lg:last:border-r">
            <span className={cn(label, "text-primary-light")}>{phase}</span>
            <h3 className={cn(displayHeading, "mt-8 text-[22px] text-white sm:text-[25px] lg:mt-14")}>{name}</h3>
            <p className="mt-3.5 text-[13px] leading-[1.6] text-white/55">{copy}</p>
          </li>
        ))}
      </ol>
      <div aria-hidden="true" className="mt-10 hidden h-14 justify-around border-t border-primary shadow-[0_-9px_30px_rgba(49,92,255,0.12)] lg:flex">
        {[0, 1, 2, 3, 4].map((dot) => (
          <i key={dot} className="-mt-1 size-[7px] rounded-full bg-primary shadow-[0_0_13px_#315cff]" />
        ))}
      </div>
    </Section>
  );
}

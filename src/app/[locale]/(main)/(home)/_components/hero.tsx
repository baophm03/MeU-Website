import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

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

export function Hero() {
  const t = useTranslations("home.hero");
  const tCommon = useTranslations("actions");
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-[68px] overflow-hidden bg-surface-dark text-white"
    >
      <div aria-hidden="true" className="absolute inset-x-0 -top-[12%] h-[212%]">
        <Image
          src="/meu/cinematic-partnership-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top saturate-[0.85]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,8,0.72)_0%,rgba(5,6,8,0.18)_26%,rgba(5,6,8,0.35)_48%,rgba(5,6,8,0.9)_74%,#050608_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,8,0.6),transparent_38%,transparent_70%,rgba(5,6,8,0.4))]" />

      <div className={cn(shell, "relative")}>
        <div className="flex min-h-[560px] items-end pb-14 pt-32 sm:min-h-[640px] sm:pt-40 lg:min-h-[calc(88svh-80px)] lg:pb-20">
          <div className="w-full lg:text-center">
            <h1
              id="hero-title"
              className={cn(displayHeading, "mt-5 w-full text-[40px] font-semibold uppercase leading-[1.02] drop-shadow-[0_4px_38px_rgba(0,0,0,0.7)] sm:text-[56px] lg:mx-auto lg:text-6xl")}
            >
              {t("title1")}
              <br />
              <span className="text-[#335CFF]">{t("title2")}</span>
            </h1>
            <p className="mt-6 max-w-[640px] text-[17px] leading-[1.65] text-white/75 drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)] sm:text-[19px] lg:mx-auto">
              {t("description")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row lg:justify-center">
              <PrimaryButton href="/contact">{tCommon("talkToExpert")}</PrimaryButton>
              <SecondaryButton href="/solutions" tone="dark">
                {t("secondaryButton")}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

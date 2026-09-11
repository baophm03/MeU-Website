import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "../_components/section-primitives";

const industries = [
  ["card1Title", "card1Desc", "/industries/healthcare"],
  ["card2Title", "card2Desc", "/industries/logistics-supply-chain"],
  ["card3Title", "card3Desc", "/industries/retail-commerce"],
  ["card4Title", "card4Desc", "/industries/pharmaceutical-life-sciences"],
  ["card5Title", "card5Desc", "/industries/education-training"],
  ["card6Title", "card6Desc", "/industries/associations-organizations"],
] as const;

export const dynamic = "force-static";
export const revalidate = 1800;

export default function IndustriesPage() {
  const t = useTranslations("pages.industries");
  const tActions = useTranslations("actions");
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heading")} summary={t("summary")} />
      <Section variant="white">
        <SectionHead eyebrow={t("eyebrow")} title={t("heading")} summary={t("summary")} />
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(([titleKey, descKey, href], index) => (
            <Link
              key={titleKey}
              href={href}
              className="group relative flex min-h-[280px] flex-col overflow-hidden border-b border-r border-border p-7 transition-colors duration-300 hover:bg-surface-dark focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-primary sm:min-h-[320px] lg:p-9"
            >
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-[60%] -right-[30%] left-[20%] h-[250px] -rotate-[14deg] border border-primary/25 transition-transform duration-300 group-hover:-translate-y-6 group-hover:rotate-[-8deg] group-hover:border-primary motion-reduce:transition-none" />
              <span className={cn(label, "relative text-primary")}>{`0${index + 1}`}</span>
              <h3 className={cn(displayHeading, "relative mt-auto pt-20 text-[24px] leading-[1.1] transition-colors group-hover:text-white sm:text-[28px]")}>{t(titleKey)}</h3>
              <p className="relative mt-3 max-w-[230px] text-[13px] leading-[1.55] text-muted-foreground transition-colors group-hover:text-white/60">{t(descKey)}</p>
              <ArrowUpRight aria-hidden="true" className="absolute bottom-7 right-7 h-5 w-5 text-muted-foreground/60 transition-colors group-hover:text-primary-light lg:bottom-9 lg:right-9" />
            </Link>
          ))}
        </div>
      </Section>
      <CtaSection
        eyebrow={t("ctaEyebrow")}
        heading1={t("ctaHeading1")}
        heading2={t("ctaHeading2")}
        description={t("ctaDesc")}
        primaryHref="/contact?type=consultation"
        primaryLabel={tActions("talkToExpert")}
        secondaryHref="/solutions"
        secondaryLabel={t("ctaSecondary")}
      />
    </>
  );
}

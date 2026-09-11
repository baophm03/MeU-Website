import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, label, displayHeading } from "../../_components/section-primitives";

const challenges = ["ch1", "ch2", "ch3", "ch4", "ch5", "ch6"] as const;
const solutions = ["sol1", "sol2", "sol3", "sol4", "sol5", "sol6"] as const;
const capabilities = ["cap1", "cap2", "cap3", "cap4", "cap5", "cap6"] as const;

export const dynamic = "force-static";
export const revalidate = 1800;

export default function Page() {
  const t = useTranslations("pages.industries.pharma");
  const tActions = useTranslations("actions");
  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heading")} summary={t("summary")} />
      <Section variant="white">
        <SectionHead eyebrow={t("eyebrow")} title={t("challengesTitle")} summary={t("challengesSummary")} />
        <div className="border-t border-border">
          {challenges.map((prefix, i) => (
            <article key={prefix} className="grid grid-cols-[40px_1fr] gap-4 border-b border-border py-8 sm:py-10">
              <span className={cn(label, "pt-1.5 text-primary")}>{`0${i + 1}`}</span>
              <div>
                <h3 className={cn(displayHeading, "text-[22px] leading-[1.15] sm:text-[27px]")}>{t(prefix + "Title")}</h3>
                <p className="mt-2.5 max-w-[600px] text-[14px] leading-[1.6] text-muted-foreground sm:text-[15px]">{t(prefix + "Desc")}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section variant="surface">
        <SectionHead eyebrow={t("eyebrow")} title={t("solutionsTitle")} summary={t("solutionsSummary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((prefix) => (
            <div key={prefix} className="border border-border p-7">
              <h3 className={cn(displayHeading, "text-[20px] leading-[1.2]")}>{t(prefix + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t(prefix + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="white">
        <SectionHead eyebrow={t("eyebrow")} title={t("capabilitiesTitle")} summary={t("capabilitiesSummary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((prefix, i) => (
            <div key={prefix} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t(prefix + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t(prefix + "Desc")}</p>
            </div>
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
        secondaryHref="/industries"
        secondaryLabel={t("ctaSecondary")}
      />
    </>
  );
}

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, ArrowLink, label, displayHeading } from "../../_components/section-primitives";

const items = ["card1", "card2", "card3", "card4"] as const;

export default function Page() {
  const t = useTranslations("pages.caseStudies.featured_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=consultation">{t("hero.primaryButton")}</PrimaryButton>
        <SecondaryButton href="/case-studies" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>
      <Section variant="white">
        <SectionHead eyebrow={t("list.eyebrow")} title={t("list.heading")} summary={t("list.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <article key={item} className="group flex flex-col border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <span className={cn(label, "mt-6 text-muted-foreground")}>{t("list." + item + "Meta")}</span>
              <h3 className={cn(displayHeading, "mt-3 text-[21px] leading-[1.25] sm:text-[23px]")}>{t("list." + item + "Title")}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-muted-foreground">{t("list." + item + "Desc")}</p>
            </article>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/case-studies" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

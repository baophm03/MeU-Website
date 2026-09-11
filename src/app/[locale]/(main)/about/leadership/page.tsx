import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, label, displayHeading } from "../../_components/section-primitives";

export default function Page() {
  const t = useTranslations("pages.about.leadership_sub");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=consultation">{t("hero.primaryButton")}</PrimaryButton>
        <SecondaryButton href="/about" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>
      <Section variant="white">
        <SectionHead eyebrow={t("team.eyebrow")} title={t("team.heading")} summary={t("team.summary")} />
        <p className="max-w-[720px] text-[16px] leading-[1.7] text-muted-foreground">{t("team.note")}</p>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/about" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

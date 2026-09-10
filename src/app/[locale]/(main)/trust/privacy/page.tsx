import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, label, displayHeading } from "../../_components/section-primitives";

const sec1Items = ["item1", "item2", "item3", "item4"] as const;
const sec2Items = ["item1", "item2", "item3"] as const;

export default function Page() {
  const t = useTranslations("pages.trust.privacy");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=consultation">{t("hero.primaryButton")}</PrimaryButton>
        <SecondaryButton href="/trust" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>
      <Section variant="white">
        <SectionHead eyebrow={t("principles.eyebrow")} title={t("principles.heading")} summary={t("principles.summary")} />
        <div className="grid gap-7 md:grid-cols-2">
          {sec1Items.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("principles." + item + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("principles." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="surface">
        <SectionHead eyebrow={t("rights.eyebrow")} title={t("rights.heading")} summary={t("rights.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {sec2Items.map((item, i) => (
            <div key={item} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[18px] leading-[1.2]")}>{t("rights." + item + "Title")}</h3>
              <p className="mt-3 text-[13px] leading-[1.55] text-muted-foreground">{t("rights." + item + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/trust" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

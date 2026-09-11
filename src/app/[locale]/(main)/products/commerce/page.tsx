import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, label, displayHeading } from "../../_components/section-primitives";

const items = ["plat1", "plat2", "plat3", "plat4"] as const;

export const dynamic = "force-static";
export const revalidate = 1800;

export default function Page() {
  const t = useTranslations("pages.products.commerce");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={<>{t("hero.heading1")}<br /><span className="text-primary">{t("hero.heading2")}</span></>} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=demo">{t("hero.primaryButton")}</PrimaryButton>
        <SecondaryButton href="/products" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>
      <Section variant="white">
        <SectionHead eyebrow={t("platforms.eyebrow")} title={t("platforms.heading")} summary={t("platforms.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {items.map((prefix, i) => (
            <div key={prefix} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t(prefix + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t(prefix + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section variant="surface">
        <SectionHead eyebrow={t("integration.eyebrow")} title={t("integration.heading")} summary={t("integration.summary")} />
        <p className="max-w-[640px] text-[15px] leading-[1.7] text-muted-foreground">{t("integration.body")}</p>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=demo" primaryLabel={t("cta.primaryButton")} secondaryHref="/products" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

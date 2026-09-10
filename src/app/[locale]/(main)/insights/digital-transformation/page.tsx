import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, ArrowLink, label, displayHeading } from "../../_components/section-primitives";

const featured = ["card1", "card2", "card3"] as const;
const topics = ["topic1", "topic2", "topic3", "topic4"] as const;

export default function Page() {
  const t = useTranslations("pages.insights.digitalTransformation");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=consultation">{t("hero.primaryButton")}</PrimaryButton>
        <SecondaryButton href="/insights" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>
      <Section variant="white">
        <SectionHead eyebrow={t("featured.eyebrow")} title={t("featured.heading")} summary={t("featured.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((card, i) => (
            <article key={card} className="group flex flex-col">
              <span aria-hidden="true" className="relative block h-[200px] overflow-hidden bg-surface-dark-raised sm:h-[220px]">
                <span className={cn(label, "absolute left-6 top-6 z-10 text-primary-light")}>{`0${i + 1}`}</span>
                <i className="absolute -bottom-[180px] -right-[50px] size-[310px] rounded-full border border-primary shadow-[0_0_55px_rgba(49,92,255,0.25)] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
              </span>
              <span className={cn(label, "mt-6 text-primary")}>{t(card + "Meta")}</span>
              <h3 className={cn(displayHeading, "mt-3 text-[21px] leading-[1.25] sm:text-[23px]")}>{t(card + "Title")}</h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-muted-foreground">{t(card + "Desc")}</p>
              <div className="mt-6"><ArrowLink href="#">{t("featured.readMore")}</ArrowLink></div>
            </article>
          ))}
        </div>
      </Section>
      <Section variant="surface">
        <SectionHead eyebrow={t("topics.eyebrow")} title={t("topics.heading")} summary={t("topics.summary")} />
        <div className="grid gap-7 md:grid-cols-2">
          {topics.map((topic, i) => (
            <div key={topic} className="border border-border p-7">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t(topic + "Title")}</h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t(topic + "Desc")}</p>
            </div>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/insights" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

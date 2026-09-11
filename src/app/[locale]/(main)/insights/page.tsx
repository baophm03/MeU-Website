import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, ArrowLink, label, displayHeading } from "../_components/section-primitives";

const featured = ["card1", "card2", "card3"] as const;
const categories = ["cat1", "cat2", "cat3", "cat4", "cat5", "cat6", "cat7"] as const;
const catHrefs = ["/insights/ai-automation", "/insights/digital-transformation", "/insights/enterprise-tech", "/insights/software-engineering", "/insights/industry", "/insights/reports", "/insights/news"];
const catHasDesc = [true, true, true, true, false, false, false];

export const dynamic = "force-static";
export const revalidate = 1800;

export default function InsightsPage() {
  const t = useTranslations("pages.insights");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={<>{t("hero.heading1")}<br /><span className="text-primary">{t("hero.heading2")}</span></>} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=consultation">{t("hero.primaryButton")}</PrimaryButton>
        <SecondaryButton href="/insights/reports" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>
      <Section variant="white">
        <SectionHead eyebrow={t("featured.eyebrow")} title={t("featured.heading")} summary={t("featured.summary")} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((card, i) => (
            <article key={card} className="group flex flex-col">
              <Link href="#" className="focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary">
                <span aria-hidden="true" className="relative block h-[200px] overflow-hidden bg-surface-dark-raised sm:h-[220px]">
                  <span className={cn(label, "absolute left-6 top-6 z-10 text-primary-light")}>{`0${i + 1}`}</span>
                  <i className="absolute -bottom-[180px] -right-[50px] size-[310px] rounded-full border border-primary shadow-[0_0_55px_rgba(49,92,255,0.25)] transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                </span>
              </Link>
              <span className={cn(label, "mt-6 text-primary")}>{t("featured." + card + "Meta")}</span>
              <h3 className={cn(displayHeading, "mt-3 text-[21px] leading-[1.25] sm:text-[23px]")}>
                <Link href="#" className="transition-colors hover:text-primary">{t("featured." + card + "Title")}</Link>
              </h3>
              <p className="mt-3 flex-1 text-[14px] leading-[1.6] text-muted-foreground">{t("featured." + card + "Desc")}</p>
              <div className="mt-6"><ArrowLink href="#">{t("featured.readMore")}</ArrowLink></div>
            </article>
          ))}
        </div>
      </Section>
      <Section variant="surface">
        <SectionHead eyebrow={t("categories.eyebrow")} title={t("categories.heading")} summary={t("categories.summary")} />
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <Link key={cat} href={catHrefs[i]} className="group border-b border-r border-border p-7 transition-colors hover:bg-surface-dark">
              <h3 className={cn(displayHeading, "text-[20px] transition-colors group-hover:text-white")}>{t("categories." + cat + "Title")}</h3>
              {catHasDesc[i] ? <p className="mt-2 text-[13px] leading-[1.55] text-muted-foreground transition-colors group-hover:text-white/60">{t("categories." + cat + "Desc")}</p> : null}
            </Link>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={t("cta.primaryButton")} secondaryHref="/insights" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

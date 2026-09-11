import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { PageHero, Section, SectionHead, CtaSection, PrimaryButton, SecondaryButton, label, displayHeading } from "../../_components/section-primitives";

export const dynamic = "force-static";
export const revalidate = 1800;

export default function Page() {
  const t = useTranslations("pages.solutions.businessSolutionsCategory");
  const tActions = useTranslations("actions");
  const items = t.raw("grid.items") as Array<{ title: string; href: string }>;
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.heading")} summary={t("hero.summary")}>
        <PrimaryButton href="/contact?type=consultation">{tActions("talkToExpert")}</PrimaryButton>
        <SecondaryButton href="/solutions" tone="dark">{t("hero.secondaryButton")}</SecondaryButton>
      </PageHero>
      <Section variant="white">
        <SectionHead eyebrow={t("grid.eyebrow")} title={t("grid.heading")} summary={t("grid.summary")} />
        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Link key={item.href} href={item.href} className="group relative flex min-h-[200px] flex-col border-b border-r border-border p-7 transition-colors hover:bg-surface-dark">
              <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
              <h3 className={cn(displayHeading, "mt-auto pt-12 text-[20px] leading-[1.1] transition-colors group-hover:text-white")}>{item.title}</h3>
              <ArrowUpRight aria-hidden="true" className="absolute bottom-7 right-7 h-5 w-5 text-muted-foreground/60 transition-colors group-hover:text-primary-light" />
            </Link>
          ))}
        </div>
      </Section>
      <CtaSection eyebrow={t("cta.eyebrow")} heading1={t("cta.heading1")} heading2={t("cta.heading2")} description={t("cta.description")} primaryHref="/contact?type=consultation" primaryLabel={tActions("talkToExpert")} secondaryHref="/solutions" secondaryLabel={t("cta.secondaryButton")} />
    </>
  );
}

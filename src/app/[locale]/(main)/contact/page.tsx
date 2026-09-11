import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { PageHero, Section, SectionHead, label, displayHeading } from "../_components/section-primitives";

export default function ContactPage() {
  const t = useTranslations("pages.contact");
  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={<>{t("hero.heading1")}<br /><span className="text-primary">{t("hero.heading2")}</span></>} summary={t("hero.summary")} />
      <Section variant="white">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <SectionHead eyebrow={t("form.eyebrow")} title={t("form.heading")} />
            <form className="mt-8 grid gap-5" action="#" method="POST">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className={cn(label, "text-muted-foreground")}>{t("form.nameLabel")}</span>
                  <input type="text" name="name" placeholder={t("form.namePlaceholder")} className="h-12 border border-border bg-background px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
                </label>
                <label className="grid gap-2">
                  <span className={cn(label, "text-muted-foreground")}>{t("form.emailLabel")}</span>
                  <input type="email" name="email" placeholder={t("form.emailPlaceholder")} className="h-12 border border-border bg-background px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
                </label>
              </div>
              <label className="grid gap-2">
                <span className={cn(label, "text-muted-foreground")}>{t("form.companyLabel")}</span>
                <input type="text" name="company" placeholder={t("form.companyPlaceholder")} className="h-12 border border-border bg-background px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
              </label>
              <label className="grid gap-2">
                <span className={cn(label, "text-muted-foreground")}>{t("form.messageLabel")}</span>
                <textarea name="message" rows={5} placeholder={t("form.messagePlaceholder")} className="border border-border bg-background p-4 text-[15px] focus-visible:outline-2 focus-visible:outline-primary" />
              </label>
              <button type="submit" className="inline-flex h-12 items-center justify-center border border-primary bg-primary px-8 text-[12px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                {t("form.submitButton")}
              </button>
              <p className="text-[13px] leading-[1.55] text-muted-foreground">{t("form.note")}</p>
            </form>
          </div>
          <div>
            <SectionHead eyebrow={t("offices.eyebrow")} title={t("offices.heading")} summary={t("offices.summary")} />
            <div className="mt-8 grid gap-7">
              {["item1", "item2", "item3"].map((item, i) => (
                <div key={item} className="border border-border p-7">
                  <span className={cn(label, "text-primary")}>{`0${i + 1}`}</span>
                  <h3 className={cn(displayHeading, "mt-4 text-[20px] leading-[1.2]")}>{t("offices." + item + "Title")}</h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-muted-foreground">{t("offices." + item + "Desc")}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { footerColumns } from "@/components/layout/main/nav-data";

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-surface-dark text-white">
      <div className="container w-full py-14 lg:pt-20 lg:pb-10">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1fr_3fr]">
          <div>
            <Link href="/" aria-label="MeU Solutions — home" className="flex items-center gap-2.5">
              <Image src="/logo-minimal.png" alt="" width={48} height={48} className="h-14 w-14 object-contain" />
              <span className="text-[22px] font-bold tracking-[-0.02em]">MeU Solutions</span>
            </Link>
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-slate-400">
              {t("footer.tagline")}
            </p>
            <address className="mt-5 not-italic text-[13px] leading-relaxed text-slate-400">
              {t("footer.address")}
              <br />
              <Link href="/contact" className="text-primary-light hover:text-white">
                {t("footer.contactTeam")}
              </Link>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white">{t(column.headingKey)}</h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[13px] leading-snug text-slate-400 transition hover:text-white">
                        {link.labelKey ? t(link.labelKey) : link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[12px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{t("footer.rights", { year: new Date().getFullYear() })}</span>
          <div className="flex flex-wrap gap-5">
            <Link href="/trust/privacy" className="hover:text-white">
              {t("footer.privacy")}
            </Link>
            <Link href="/trust/security" className="hover:text-white">
              {t("footer.security")}
            </Link>
            <Link href="/trust" className="hover:text-white">
              {t("footer.trustCenter")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

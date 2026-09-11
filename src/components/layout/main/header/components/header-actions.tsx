import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { type Dispatch, type SetStateAction } from "react";
import { ArrowRight, Globe, Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { routing } from "@/i18n/routing";

type HeaderActionsProps = {
  searchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
  dark: boolean;
};

export function HeaderActions({
  searchOpen,
  setSearchOpen,
  mobileOpen,
  setMobileOpen,
  dark,
}: HeaderActionsProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const nextLocale = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  const switchLocale = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setSearchOpen((value) => !value)}
        aria-expanded={searchOpen}
        aria-label={t("actions.search")}
        className={cn(
          "grid size-10 place-items-center rounded-lg transition",
          dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={switchLocale}
        aria-label={t("actions.switchLanguage", { locale: locale.toUpperCase() })}
        className={cn(
          "hidden h-10 items-center gap-1.5 rounded-lg px-2.5 text-[13px] font-semibold uppercase transition sm:flex",
          dark ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        <Globe aria-hidden="true" className="h-4 w-4" />
        {nextLocale}
      </button>
      <Link
        href="/contact"
        className={cn(
          "group hidden h-11 items-center gap-2 border px-5 text-[14px] font-semibold transition hover:bg-primary hover:border-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:inline-flex",
          dark
            ? "border-white text-white hover:bg-primary hover:text-white"
            : "border-foreground text-foreground hover:bg-primary hover:text-white",
        )}
      >
        {t("actions.talkToExpert")}
      </Link>
      <button
        type="button"
        onClick={() => setMobileOpen((value) => !value)}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? t("actions.closeMenu") : t("actions.openMenu")}
        className={cn(
          "grid h-11 w-11 place-items-center rounded-lg border lg:hidden",
          dark ? "border-white text-white" : "border-foreground text-foreground",
        )}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
}

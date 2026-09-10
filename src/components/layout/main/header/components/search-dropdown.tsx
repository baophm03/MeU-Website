import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

export function SearchDropdown({ onClose }: { onClose: () => void }) {
  const t = useTranslations();
  return (
    <div className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg">
      <div className="container flex w-full items-center gap-3 py-4">
        <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          autoFocus
          type="search"
          placeholder={t("actions.searchPlaceholder")}
          aria-label={t("actions.search")}
          className="h-11 flex-1 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted-foreground/70"
        />
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground hover:bg-muted"
        >
          Esc
        </button>
      </div>
    </div>
  );
}

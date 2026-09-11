import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function ProofStrip() {
  const t = useTranslations("home.hero");
  const proofStrip = [t("proof1"), t("proof2"), t("proof3"), t("proof4")];
  return (
    <section className="bg-[#050608] text-white">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {proofStrip.map((item, index) => (
            <span
              key={item}
              className={cn(
                "px-5 py-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 sm:text-[12px]",
                index % 2 === 0 ? "border-r border-white/10" : "",
                index < 2 ? "border-b border-white/10 lg:border-b-0" : "",
                index === 1 ? "lg:border-r lg:border-white/10" : "",
              )}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

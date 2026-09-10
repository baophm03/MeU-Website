import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Logo({ onNavigate, light = false }: { onNavigate?: () => void; light?: boolean }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      aria-label="MeU Solutions — home"
      className="flex shrink-0 items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <Image src="/logo.png" alt="" width={40} height={40} priority className="h-10 w-10 object-contain" />
      <span className="flex flex-col gap-0.5 leading-none">
        <span className={cn("text-[22px] font-bold tracking-[-0.01em]", light ? "text-white" : "text-foreground")}>MeU</span>
        <span className={cn("text-[10px] font-semibold uppercase tracking-[0.2em]", light ? "text-white/60" : "text-muted-foreground")}>Solutions</span>
      </span>
    </Link>
  );
}

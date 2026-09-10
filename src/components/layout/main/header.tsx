"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navigation = [
  ["What we do", "/solutions"],
  ["Industries", "/industries"],
  ["Products", "/products"],
  ["Client success", "/client-success"],
  ["Insights", "/insights"],
  ["About", "/about"],
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isVietnamese = pathname === "/vi" || pathname.startsWith("/vi/");
  const menu = isVietnamese
    ? [["Giải pháp", "/vi/solutions"], ["Ngành", "/vi/industries"], ["Sản phẩm", "/vi/products"], ["Khách hàng", "/vi/client-success"], ["Góc nhìn", "/vi/insights"], ["Về MeU", "/vi/about"]] as const
    : navigation;
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return <header className="sticky top-0 z-50 border-b border-white/15 bg-[#050608] text-white">
    <div className="mx-auto flex h-20 w-[calc(100%-48px)] max-w-[1280px] items-center justify-between">
      <Link href={isVietnamese ? "/vi" : "/"} className="group flex items-end gap-3 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#75a7ff]" aria-label="MeU home" data-meu-logo>
        <span className="text-[31px] leading-none font-semibold tracking-[-0.08em]">MeU</span>
        <span className="mb-0.5 hidden text-[8px] leading-tight tracking-[.2em] text-slate-400 sm:block">SOLUTIONS<br/>THAT MOVE</span>
      </Link>
      <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
        {menu.map(([label,href])=><Link key={label} href={href} className="border-b border-transparent py-2 text-[12px] font-medium tracking-[.03em] text-slate-300 transition hover:border-[#315cff] hover:text-white focus-visible:outline-2 focus-visible:outline-[#75a7ff]">{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-5 lg:flex"><div className="flex gap-2 text-[10px] tracking-[.13em]"><Link className={!isVietnamese ? "text-white" : "text-slate-500"} href="/">EN</Link><span className="text-slate-700">/</span><Link className={isVietnamese ? "text-white" : "text-slate-500"} href="/vi">VI</Link></div><Link href={isVietnamese ? "/vi/contact" : "/contact"} className="flex h-11 items-center gap-5 border border-[#315cff] bg-[#315cff] px-5 text-[10px] font-bold tracking-[.1em] transition hover:bg-[#4e73ff] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#75a7ff]">{isVietnamese ? "TRAO ĐỔI VỚI CHUYÊN GIA" : "TALK TO AN EXPERT"} <ArrowUpRight size={15}/></Link></div>
      <button type="button" onClick={()=>setOpen(value=>!value)} className="grid size-11 place-items-center border border-white/20 lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open?<X/>:<Menu/>}</button>
    </div>
    <div id="mobile-menu" className={`fixed inset-x-0 top-20 bottom-0 bg-[#050608] p-6 transition duration-300 lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`}>
      <nav className="flex flex-col border-t border-white/15" aria-label="Mobile navigation">{menu.map(([label,href],i)=><Link onClick={()=>setOpen(false)} key={label} href={href} className="flex items-center justify-between border-b border-white/15 py-6 text-2xl font-medium"><span>{label}</span><span className="text-xs text-[#7897ff]">0{i+1}</span></Link>)}</nav>
      <div className="mt-7 flex gap-5 text-xs tracking-[.14em]"><Link onClick={()=>setOpen(false)} href="/" className={!isVietnamese ? "text-white" : "text-slate-500"}>ENGLISH</Link><Link onClick={()=>setOpen(false)} href="/vi" className={isVietnamese ? "text-white" : "text-slate-500"}>TIẾNG VIỆT</Link></div>
      <Link onClick={()=>setOpen(false)} href={isVietnamese ? "/vi/contact" : "/contact"} className="mt-8 flex h-14 items-center justify-between bg-[#315cff] px-5 text-sm font-bold tracking-[.08em]">{isVietnamese ? "TRAO ĐỔI VỚI CHUYÊN GIA" : "TALK TO AN EXPERT"} <ArrowUpRight size={18}/></Link>
    </div>
  </header>;
}

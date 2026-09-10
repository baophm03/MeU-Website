import Link from "next/link";

const columns = [
  ["What we do",["Business solutions","Technology capabilities","Talent & enablement"]],
  ["Explore",["Industries","Products","Client success","Insights"]],
  ["Company",["About MeU","Careers","Contact"]],
] as const;

export default function Footer(){
  return <footer className="border-t border-white/15 bg-[#050608] text-white">
    <div className="mx-auto w-[calc(100%-48px)] max-w-[1280px] py-18">
      <div className="grid gap-14 border-b border-white/15 pb-16 md:grid-cols-[1.4fr_2fr]">
        <div><Link href="/" className="text-[45px] font-semibold tracking-[-.08em]">MeU</Link><p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Technology solutions shaped around the work your business needs to move.</p></div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">{columns.map(([title,items])=><div key={title}><h2 className="mb-5 text-[10px] tracking-[.16em] text-[#7897ff]">{title.toUpperCase()}</h2><ul className="space-y-3">{items.map(item=><li key={item}><Link href="/" className="text-sm text-slate-300 transition hover:text-white">{item}</Link></li>)}</ul></div>)}</div>
      </div>
      <div className="flex flex-col justify-between gap-5 pt-7 text-[10px] tracking-[.08em] text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} MEU SOLUTIONS. ALL RIGHTS RESERVED.</span><div className="flex gap-6"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/contact">Ho Chi Minh City, Vietnam</Link></div></div>
    </div>
  </footer>
}

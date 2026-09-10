import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Solutions — MeU Solutions",
  description:
    "Three connected practice areas — business solutions, technology capabilities, and talent & enablement — so every solution has a clear purpose and a practical route into daily work.",
};

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

const businessSolutions = [
  ["Digital Transformation", "Turn strategic ambition into a sequenced roadmap, modern platforms and measurable operating change."],
  ["Business Process Optimization", "Redesign workflows and approvals around how your teams actually operate."],
  ["Enterprise Management", "Unify operations, data and decisions across the organization on one reliable system."],
  ["Customer Experience", "Design and engineer journeys that make every interaction count."],
  ["Digital Commerce", "Build commerce platforms that scale with your business and your customers."],
  ["AI & Intelligent Automation", "Apply AI to defined business decisions with context, controls and human judgment."],
  ["Custom Software Solutions", "Design and engineer software shaped to your specific operating needs."],
] as const;

const technologyCapabilities = [
  ["Technology Consulting", "Frame the opportunity, define the architecture and chart a measurable path forward."],
  ["Software Engineering", "Design and build resilient software around real operating needs."],
  ["AI Engineering", "Build, deploy and govern models that integrate into your workflows."],
  ["Quality Engineering", "Validate quality, resilience and readiness before every launch."],
  ["System Integration", "Connect platforms, data and teams into one working system."],
  ["Cloud & DevOps", "Modernize infrastructure and automate delivery for speed and reliability."],
  ["Product & UI/UX Design", "Shape products that are useful, usable and operational by design."],
  ["Maintenance & Managed Services", "Improve the product continuously with accountable support and operations."],
] as const;

const talentEnablement = [
  ["IT Talent Solutions", "Add experienced product and engineering teams without adding complexity."],
  ["Technology Training", "Equip your teams with the skills and confidence to own what we build together."],
] as const;

/* -------------------------------------------------------------------------- */
/*  Editorial primitives (sharp corners, hairline rules, tight display type)   */
/* -------------------------------------------------------------------------- */

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";
const hairline = "border-white/15";

function Section({
  id,
  tone,
  className,
  children,
}: {
  id?: string;
  tone: "paper" | "white" | "ink";
  className?: string;
  children: ReactNode;
}) {
  const tones = {
    white: "bg-background text-foreground",
    paper: "bg-muted text-foreground",
    ink: "bg-surface-dark-soft text-white",
  } as const;
  return (
    <section id={id} className={cn("scroll-mt-24 py-16 sm:py-24 lg:py-[128px]", tones[tone], className)}>
      <div className={shell}>{children}</div>
    </section>
  );
}

function SectionHead({
  index,
  eyebrow,
  title,
  copy,
  action,
  dark = false,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  action?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
      <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
        <span className="text-primary">{index}</span>
        <span className={dark ? "text-white/50" : "text-muted-foreground"}>{eyebrow}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        <h2 className={cn(displayHeading, "text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
        <div className="flex flex-col items-start gap-6 lg:pt-2">
          {copy ? <p className={cn("max-w-md text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{copy}</p> : null}
          {action}
        </div>
      </div>
    </div>
  );
}

/** Muted counter-word inside display headings (replaces the old <em> treatment). */
function Soft({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "text-white/45" : "text-muted-foreground/70"}>{children}</span>;
}

const buttonBase =
  "group inline-flex min-h-[52px] items-center justify-between gap-8 px-6 text-[12px] font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-primary-light motion-reduce:transition-none";

function PrimaryButton({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn(buttonBase, "border border-primary bg-primary text-white hover:border-primary-hover hover:bg-primary-hover", className)}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function GhostButton({ href, children, dark = false, className }: { href: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBase,
        dark ? "border border-white/35 text-white hover:border-white hover:bg-white/5" : "border border-border text-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function CategoryHead({ letter, title, count, dark = false }: { letter: string; title: string; count: string; dark?: boolean }) {
  return (
    <div className={cn("mb-8 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b pb-4 sm:mb-10", dark ? "border-white/15" : "border-border")}>
      <span className="font-semibold text-primary tracking-[-0.04em] text-[40px] leading-none sm:text-[56px]">{letter}</span>
      <span className={cn("font-medium tracking-[-0.03em] uppercase text-[22px] leading-none sm:text-[30px]", dark ? "text-white" : "text-foreground")}>{title}</span>
      <span className={cn("ml-auto", label, dark ? "text-white/50" : "text-muted-foreground")}>{count}</span>
    </div>
  );
}

function ServiceCard({ index, title, copy, dark = false }: { index: string; title: string; copy: string; dark?: boolean }) {
  return (
    <Link
      href="/contact"
      aria-label={`${title} — talk to an expert`}
      className={cn(
        "group relative flex min-h-[200px] flex-col gap-3.5 p-7 transition duration-200 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-primary-light sm:p-9",
        dark ? "hover:bg-primary/10" : "hover:bg-primary/[0.06]",
      )}
    >
      <span className={cn(label, dark ? "text-white/50" : "text-muted-foreground")}>{index}</span>
      <h3 className={cn("text-[20px] font-medium leading-[1.2] tracking-[-0.02em]", dark ? "text-white" : "text-foreground")}>{title}</h3>
      <p className={cn("text-[14px] leading-[1.55]", dark ? "text-white/55" : "text-muted-foreground")}>{copy}</p>
      <ArrowUpRight
        aria-hidden="true"
        className={cn(
          "absolute right-7 top-7 h-[18px] w-[18px] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none",
          dark ? "text-white/40 group-hover:text-primary-light" : "text-muted-foreground group-hover:text-primary",
        )}
      />
    </Link>
  );
}

function ServiceGrid({ items, columns = 3, dark = false }: { items: ReadonlyArray<readonly [string, string]>; columns?: 2 | 3; dark?: boolean }) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 border-l border-t sm:grid-cols-2 lg:grid-cols-3",
        columns === 2 && "lg:grid-cols-2",
        dark ? hairline : "border-border",
      )}
    >
      {items.map(([title, copy], i) => (
        <div key={title} className={cn("border-b border-r", dark ? hairline : "border-border")}>
          <ServiceCard index={`0${i + 1}`} title={title} copy={copy} dark={dark} />
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function SolutionsPage() {
  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section
        aria-labelledby="hero-title"
        className="relative overflow-hidden bg-surface-dark text-white"
      >
        {/* Cinematic grid backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.13] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent_5%,#000_60%,transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_78%_38%,rgba(49,92,255,0.2),transparent_24%),linear-gradient(180deg,#07090d,#030405)]"
        />

        <div className={cn(shell, "relative")}>
          <div className="flex min-h-[560px] flex-col justify-center py-28 sm:py-32 lg:py-[120px]">
            <p className={cn(label, "mb-5 text-primary-light")}>What we do</p>
            <h1
              id="hero-title"
              className={cn(displayHeading, "max-w-[920px] text-[44px] uppercase leading-[1] sm:text-[56px] lg:text-[76px]")}
            >
              Business solutions.
              <br />
              <Soft dark>Technology that moves them.</Soft>
            </h1>
            <p className="mt-7 max-w-[610px] text-[17px] leading-[1.65] text-white/70 sm:text-[19px]">
              We partner with ambitious organizations across three connected practice areas — from business design to engineering to talent — so every solution has a clear purpose and a practical route into daily work.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton href="/contact?type=consultation">Talk to an expert</PrimaryButton>
              <GhostButton href="#business-solutions" dark>Explore capabilities</GhostButton>
            </div>
          </div>
        </div>
      </section>

      <main>
        {/* A. Business Solutions */}
        <Section id="business-solutions" tone="white">
          <SectionHead
            index="A"
            eyebrow="Business Solutions"
            title={<>Change the operation. <Soft>Not just the software.</Soft></>}
            copy="We connect business design with engineering, so every solution has a clear purpose and a practical route into daily work."
          />
          <CategoryHead letter="A" title="Business Solutions" count="07 practices" />
          <ServiceGrid items={businessSolutions} columns={3} />
        </Section>

        {/* B. Technology Capabilities */}
        <Section id="technology-capabilities" tone="ink">
          <SectionHead
            dark
            index="B"
            eyebrow="Technology Capabilities"
            title={<>Engineered to work. <Soft dark>Built to stay useful.</Soft></>}
            copy="The engineering depth to design, build, integrate, test and operate — connected end to end under one accountable team."
          />
          <CategoryHead letter="B" title="Technology Capabilities" count="08 practices" dark />
          <ServiceGrid items={technologyCapabilities} columns={3} dark />
        </Section>

        {/* C. Talent & Enablement */}
        <Section id="talent-enablement" tone="paper">
          <SectionHead
            index="C"
            eyebrow="Talent & Enablement"
            title={<>The people who make it move. <Soft>And keep it moving.</Soft></>}
            copy="Extend your delivery capacity with experienced teams, and equip your own people to own what we build together."
          />
          <CategoryHead letter="C" title="Talent & Enablement" count="02 practices" />
          <ServiceGrid items={talentEnablement} columns={2} />
        </Section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-surface-dark py-20 text-center sm:py-24 lg:py-[120px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(49,92,255,0.12),transparent_40%)]"
          />
          <div className={cn(shell, "relative")}>
            <span className={cn(label, "mb-5 block text-white/50")}>Let&apos;s build what&apos;s next.</span>
            <h2 className={cn(displayHeading, "mx-auto max-w-[760px] text-[36px] uppercase leading-[1.05] sm:text-[44px] lg:text-[56px]")}>
              Bring us the challenge.
              <br />
              <Soft dark>We&apos;ll bring a way forward.</Soft>
            </h2>
            <p className="mx-auto mt-6 max-w-[560px] text-[17px] leading-[1.6] text-white/55">
              Start a focused conversation with a senior MeU technology partner.
            </p>
            <div className="mt-9 flex justify-center">
              <PrimaryButton href="/contact?type=consultation">Talk to an expert</PrimaryButton>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

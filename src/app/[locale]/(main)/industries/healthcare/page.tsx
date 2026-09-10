import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowRight, ChevronRight, ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SolutionEcosystem } from "./components/solution-ecosystem";
import { ArchitectureDiagram } from "./components/architecture-diagram";

export const metadata: Metadata = {
  title: "Healthcare Technology Solutions | MeU Solutions",
  description:
    "Patient access, clinical operations and system integration for healthcare providers: portals, booking, workflow automation and governed data access, delivered end to end.",
};

/* -------------------------------------------------------------------------- */
/*  Inline UI primitives (cinematic editorial)                                 */
/* -------------------------------------------------------------------------- */

const shell = "container";
const displayHeading = "font-medium tracking-[-0.045em] text-balance";
const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn(shell, className)}>{children}</div>;
}

function Section({
  id,
  variant = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  variant?: "white" | "surface" | "dark";
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  const variants = {
    white: "bg-background text-foreground",
    surface: "bg-muted text-foreground",
    dark: "bg-surface-dark-soft text-white",
  } as const;
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 py-16 sm:py-24 lg:py-[128px]", variants[variant], className)}>
      <Container>{children}</Container>
    </section>
  );
}

function Eyebrow({ tone = "light", children }: { tone?: "light" | "dark"; children: ReactNode }) {
  return <span className={cn(label, tone === "dark" ? "text-primary-light" : "text-primary")}>{children}</span>;
}

function SectionHead({
  id,
  index,
  eyebrow,
  title,
  summary,
  tone = "light",
  align = "left",
  action,
}: {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  summary?: string;
  tone?: "light" | "dark";
  align?: "left" | "split";
  action?: ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className="mb-12 grid gap-6 sm:mb-16 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_2.15fr] lg:gap-12">
      <div className={cn("flex items-start gap-5 lg:pt-3", label)}>
        {index ? <span className="text-primary">{index}</span> : null}
        <span className={dark ? "text-white/50" : "text-muted-foreground"}>{eyebrow}</span>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-12">
        <h2 id={id} className={cn(displayHeading, "text-[34px] leading-[1.04] sm:text-[46px] lg:text-[62px]", dark ? "text-white" : "text-foreground")}>{title}</h2>
        <div className="flex flex-col items-start gap-6 lg:pt-2">
          {summary ? <p className={cn("max-w-md text-[15px] leading-[1.7]", dark ? "text-white/60" : "text-muted-foreground")}>{summary}</p> : null}
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
      </div>
    </div>
  );
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

function SecondaryButton({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        buttonBase,
        tone === "dark" ? "border border-white/35 text-white hover:border-white hover:bg-white/5" : "border border-border text-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function ArrowLink({ href, children, tone = "light", className }: { href: string; children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 border-b pb-2 text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-4",
        tone === "dark" ? "border-white/35 text-white hover:border-primary-light focus-visible:outline-primary-light" : "border-border text-foreground hover:border-primary hover:text-primary focus-visible:outline-primary",
        className,
      )}
    >
      {children}
      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
    </Link>
  );
}

function Pill({ tone = "light", children }: { tone?: "light" | "dark"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2.5 py-1 text-[11px] font-medium",
        tone === "dark" ? "border-white/15 bg-white/5 text-slate-300" : "border-border bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}

function IllustrativeBadge({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]",
        tone === "dark" ? "border-amber-300/40 bg-amber-300/10 text-amber-200" : "border-amber-300 bg-amber-50 text-amber-700",
        className,
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
      Illustrative data
    </span>
  );
}

function Metric({ value, label: metricLabel, footnote, tone = "light" }: { value: string; label: string; footnote?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className={cn("border-t pt-4", dark ? "border-white/15" : "border-border")}>
      <div className={cn("text-[32px] font-bold leading-none tracking-[-0.02em] sm:text-[40px]", dark ? "text-white" : "text-foreground")}>{value}</div>
      <div className={cn("mt-2 text-[13px] font-semibold", dark ? "text-slate-200" : "text-foreground")}>{metricLabel}</div>
      {footnote ? <p className={cn("mt-1 text-[12px] leading-snug", dark ? "text-slate-400" : "text-muted-foreground")}>{footnote}</p> : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

const anchors = [
  ["Challenges", "#challenges"],
  ["Solutions", "#solutions"],
  ["Capabilities", "#capabilities"],
  ["Architecture", "#architecture"],
  ["Client success", "#client-success"],
  ["Insights", "#insights"],
];

const challenges = [
  {
    index: "01",
    title: "Patients cannot self-serve the basics",
    detail: "Booking, rescheduling and document requests still arrive by phone and messaging apps, so front-desk staff absorb the load and patients wait.",
    signal: "Peak-hour call abandonment",
  },
  {
    index: "02",
    title: "Scheduling rules live in people's heads",
    detail: "Capacity depends on room, equipment and specialist availability, but the rules sit in spreadsheets and local habit rather than the system.",
    signal: "Double bookings and idle slots",
  },
  {
    index: "03",
    title: "Internal requests have no visible owner",
    detail: "Referrals, approvals and administrative requests move between departments with no timestamped trail, so escalation happens by chasing.",
    signal: "Unmeasured turnaround time",
  },
  {
    index: "04",
    title: "Systems don't reconcile",
    detail: "Clinical, administrative and finance systems each hold part of the truth, so management reporting is rebuilt manually every month.",
    signal: "Manual monthly reporting",
  },
  {
    index: "05",
    title: "Access control is all-or-nothing",
    detail: "Broad system permissions make audits difficult and make it risky to give partners or corporate clients any self-service at all.",
    signal: "Audit findings on access",
  },
  {
    index: "06",
    title: "Document work consumes clinical time",
    detail: "Referrals, insurance paperwork and lab documents are re-keyed by staff who should be handling patients.",
    signal: "Hours per week on re-keying",
  },
];

const comparison = [
  ["Patient booking", "Phone, messaging apps, manual confirmation", "Self-service portal with capacity rules and reminders"],
  ["Scheduling rules", "Spreadsheets and local knowledge", "Configured per service, resource and location"],
  ["Internal requests", "Email chains without an owner", "Routed workflow with SLA timers and escalation"],
  ["Document handling", "Manual re-keying by staff", "Automated extraction with human review queue"],
  ["Data access", "Broad system-level permissions", "Role-based access with full audit trail"],
  ["Management reporting", "Rebuilt manually each month", "One reconciled operational dataset"],
];

const capabilities = [
  { name: "Software Engineering", detail: "Portals, staff workspaces and mobile access built for shift-based, high-interruption use.", href: "/solutions/software-engineering" },
  { name: "System Integration", detail: "APIs, events and batch reconciliation between clinical, administrative and finance systems.", href: "/solutions/system-integration" },
  { name: "AI Engineering", detail: "Document extraction pipelines with confidence thresholds and reviewer workflows.", href: "/solutions/ai-engineering" },
  { name: "Quality Engineering", detail: "Functional, integration and performance testing before anything touches live operations.", href: "/solutions/quality-engineering" },
  { name: "Cloud & DevOps", detail: "Environment separation, release pipelines and monitoring appropriate to sensitive workloads.", href: "/solutions/cloud-devops" },
  { name: "Maintenance & Managed Services", detail: "L1–L3 support with agreed service windows for systems in daily clinical use.", href: "/solutions/maintenance-managed-services" },
];

const insights = [
  { meta: "Industry Insights · 7 min read", title: "What a digital front door really requires in a provider network", href: "/insights/industry" },
  { meta: "AI & Automation · 9 min read", title: "Document automation in healthcare admin: where to start safely", href: "/insights/ai-automation" },
  { meta: "Report · 24 pages", title: "Operational readiness checklist for healthcare platform projects", href: "/insights/reports" },
];

export default function HealthcareIndustryPage() {
  return (
    <>
      {/* ---------------------------------------------------------------- 01 Hero */}
      <section aria-labelledby="industry-title" className="border-b border-border bg-muted">
        <Container className="py-10 sm:py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            <Link href="/industries" className="hover:text-primary">
              Industries
            </Link>
            <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
            <span className="font-semibold text-foreground">Healthcare</span>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Eyebrow>Industries · Healthcare</Eyebrow>
              <h1 id="industry-title" className="mt-4 text-[32px] font-bold leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[42px] lg:text-[52px]">
                Patient access and clinical operations on <span className="text-primary">one connected platform</span>
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground sm:text-[19px]">
                For hospitals, clinic networks and diagnostic providers: digitise how patients reach you, how work moves internally, and how your systems share data — without
                disrupting care delivery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/contact?type=consultation&industry=healthcare">Talk to a healthcare specialist</PrimaryButton>
                <SecondaryButton href="#solutions">See the solution ecosystem</SecondaryButton>
              </div>
              <p className="mt-6 max-w-xl rounded-xl border border-border bg-background px-4 py-3 text-[13px] leading-relaxed text-muted-foreground">
                <strong className="font-semibold text-foreground">Scope note:</strong> MeU delivers administrative, operational and integration technology. We do not provide medical
                advice, and we state compliance or certification status only where it has been formally verified.
              </p>
            </div>

            <div className="lg:col-span-5">
              {/* Approved facility or product imagery, 4:3 */}
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-background text-muted-foreground">
                <ImageIcon aria-hidden="true" className="h-8 w-8" />
                <span className="px-8 text-center text-[12px] font-semibold uppercase tracking-[0.12em]">Approved facility or portal screenshot · 4:3</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  ["Providers served", "8"],
                  ["Integrated systems", "20+"],
                  ["Live since", "2019"],
                ].map(([labelValue, value]) => (
                  <div key={labelValue} className="rounded-xl border border-border bg-background p-4">
                    <div className="text-[22px] font-bold leading-none text-foreground">{value}</div>
                    <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{labelValue}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <IllustrativeBadge />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Local anchor navigation */}
      <nav aria-label="On this page" className="sticky top-[68px] z-30 border-b border-border bg-white/95 backdrop-blur">
        <Container>
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-1 py-2 sm:w-auto">
              {anchors.map(([labelValue, href]) => (
                <li key={href}>
                  <Link href={href} className="inline-flex h-10 items-center whitespace-nowrap rounded-lg px-3.5 text-[13px] font-semibold text-muted-foreground transition hover:bg-muted hover:text-primary">
                    {labelValue}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </nav>

      {/* ---------------------------------------------------- 02 Domain challenges */}
      <Section id="challenges" labelledBy="challenges-title">
        <SectionHead
          id="challenges-title"
          index="01"
          eyebrow="Domain challenges"
          title="The bottlenecks providers describe to us"
          summary="Six patterns we see repeatedly in provider operations. Each one is solvable with technology you can run without a research team."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((item) => (
            <article key={item.index} className="rounded-2xl border border-border bg-background p-6">
              <span className="text-[12px] font-bold tracking-[0.14em] text-muted-foreground/70">{item.index}</span>
              <h3 className="mt-3 text-[18px] font-semibold leading-snug text-foreground">{item.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-muted-foreground">{item.detail}</p>
              <p className="mt-4 border-t border-border pt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">Watch: {item.signal}</p>
            </article>
          ))}
        </div>

        {/* Comparison table: current state vs target operating model */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-muted px-6 py-4">
            <h3 className="text-[16px] font-semibold text-foreground">Current state vs. target operating model</h3>
            <span className="text-[12px] text-muted-foreground">Baseline confirmed during assessment</span>
          </div>

          {/* Desktop table */}
          <table className="hidden w-full border-collapse text-left md:table">
            <caption className="sr-only">Comparison of typical current-state healthcare operations against the target operating model MeU delivers</caption>
            <thead>
              <tr className="bg-background">
                <th scope="col" className="w-1/4 border-b border-border px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Operational area
                </th>
                <th scope="col" className="border-b border-border px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  Typical today
                </th>
                <th scope="col" className="border-b border-border bg-accent px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-primary">
                  With the MeU platform
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map(([area, before, after]) => (
                <tr key={area} className="bg-background">
                  <th scope="row" className="border-b border-border px-6 py-4 align-top text-[14px] font-semibold text-foreground">
                    {area}
                  </th>
                  <td className="border-b border-border px-6 py-4 align-top text-[14px] text-muted-foreground">
                    <span className="flex items-start gap-2">
                      <X aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                      {before}
                    </span>
                  </td>
                  <td className="border-b border-border bg-accent/40 px-6 py-4 align-top text-[14px] font-medium text-foreground">{after}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mobile: label–value groups instead of a squeezed table */}
          <ul className="divide-y divide-border md:hidden">
            {comparison.map(([area, before, after]) => (
              <li key={area} className="bg-background p-5">
                <p className="text-[14px] font-semibold text-foreground">{area}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold uppercase tracking-[0.08em]">Today · </span>
                  {before}
                </p>
                <p className="mt-2 rounded-lg bg-accent px-3 py-2 text-[13px] leading-relaxed text-foreground">
                  <span className="font-semibold uppercase tracking-[0.08em] text-primary">Target · </span>
                  {after}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* --------------------------------------------------- 03 Solution ecosystem */}
      <Section id="solutions" variant="surface" labelledBy="solutions-title">
        <SectionHead
          id="solutions-title"
          index="02"
          eyebrow="Solution ecosystem"
          title="Mapped to the healthcare operating journey"
          summary="Patient access, clinical operations, systems and data, and applied AI — grouped the way the work runs, not the way a service list is written."
        />
        <SolutionEcosystem />
      </Section>

      {/* ------------------------------------------------- 04 Technology capabilities */}
      <Section id="capabilities" labelledBy="capabilities-title">
        <SectionHead
          id="capabilities-title"
          index="03"
          eyebrow="Technology capabilities"
          title="The engineering behind the healthcare stack"
          summary="What we actually bring to a provider engagement, and what you receive from each capability."
          align="split"
          action={<SecondaryButton href="/solutions/technology-capabilities">All capabilities</SecondaryButton>}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability) => (
            <article key={capability.name} className="group rounded-2xl border border-border bg-background p-6 transition hover:border-primary/60">
              <h3 className="text-[17px] font-semibold leading-snug text-foreground">
                <Link href={capability.href} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                  {capability.name}
                </Link>
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{capability.detail}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                What you receive
                <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------- 05 Architecture */}
      <Section id="architecture" variant="surface" labelledBy="architecture-title">
        <SectionHead
          id="architecture-title"
          index="04"
          eyebrow="Solution architecture"
          title="How the pieces fit together"
          summary="A reference blueprint for a provider platform: channels, workflow and integration layers over the systems of record you already run."
        />
        <ArchitectureDiagram />
      </Section>

      {/* ------------------------------------------------------ 06 Client success */}
      <Section id="client-success" labelledBy="proof-title">
        <SectionHead
          id="proof-title"
          index="05"
          eyebrow="Client success"
          title="Proof points from provider engagements"
          summary="Where an engagement is under NDA we publish an anonymised case. We do not publish invented clients or unverified metrics."
          align="split"
          action={<SecondaryButton href="/case-studies?group=industry">Healthcare case studies</SecondaryButton>}
        />

        <article className="mt-10 grid gap-8 rounded-2xl border border-border bg-background p-6 sm:p-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <Pill>Clinic network · anonymised</Pill>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">12-week first release</span>
            </div>
            <h3 className="mt-4 text-[24px] font-semibold leading-snug text-foreground sm:text-[28px]">
              From phone-based booking to a governed patient access platform
            </h3>
            <dl className="mt-6 grid gap-5 sm:grid-cols-3">
              {[
                ["Challenge", "Three locations booked patients by phone with no shared view of capacity."],
                ["Solution", "Patient portal, capacity rules and an approval workflow integrated with the admin system."],
                ["Impact", "Booking moved to self-service, with reporting available without manual consolidation."],
              ].map(([term, detail]) => (
                <div key={term}>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{term}</dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7">
              <ArrowLink href="/case-studies">Read the full case study</ArrowLink>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full rounded-xl bg-surface-dark p-6">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Measured impact</span>
                <IllustrativeBadge tone="dark" />
              </div>
              <div className="mt-5 grid gap-5">
                <Metric tone="dark" value="-45%" label="Front-desk scheduling effort" footnote="Admin hours per week, 3 months after go-live" />
                <Metric tone="dark" value="72%" label="Bookings made self-service" footnote="Share of total bookings, month 3" />
              </div>
            </div>
          </div>
        </article>
      </Section>

      {/* ----------------------------------------------------- 07 Thought leadership */}
      <Section id="insights" variant="surface" labelledBy="insights-title">
        <SectionHead
          id="insights-title"
          index="06"
          eyebrow="Thought leadership"
          title="Healthcare technology, in practice"
          align="split"
          action={<SecondaryButton href="/insights/industry">All industry insights</SecondaryButton>}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {insights.map((insight) => (
            <article key={insight.title} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background transition hover:border-primary/60">
              <div className="flex aspect-[16/9] items-center justify-center border-b border-border bg-muted text-muted-foreground">
                <ImageIcon aria-hidden="true" className="h-7 w-7" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-primary">{insight.meta}</span>
                <h3 className="mt-3 flex-1 text-[17px] font-semibold leading-snug text-foreground">
                  <Link href={insight.href} className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
                    {insight.title}
                  </Link>
                </h3>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  Read
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------ 08 Final CTA */}
      <section aria-labelledby="industry-cta-title" className="bg-surface-dark">
        <Container className="py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Eyebrow tone="dark">Talk to an industry specialist</Eyebrow>
              <h2 id="industry-cta-title" className="mt-4 text-[30px] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-[40px]">
                Start with one bottleneck in your operation
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-slate-300 sm:text-[18px]">
                Bring the process that hurts most — booking, referrals, approvals or reporting. We map it, show what a first release looks like, and tell you honestly what is not
                worth building.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <PrimaryButton href="/contact?type=consultation&industry=healthcare">Book a healthcare consultation</PrimaryButton>
                <SecondaryButton href="/insights/reports" tone="dark">
                  Get the readiness checklist
                </SecondaryButton>
              </div>
            </div>
            <div className="lg:col-span-5 lg:pl-8">
              <ul className="space-y-4 border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {["A consultant with provider-side delivery experience", "NDA before any operational detail is shared", "Scope, phasing and effort range in writing"].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[15px] text-slate-200">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

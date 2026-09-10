"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const label = "text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px]";

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

/**
 * Section 03 — Solution ecosystem as grouped, tabbed C02 cards.
 * Groups mirror the healthcare operating journey, not the header service list.
 */
const groups = [
  {
    id: "access",
    tab: "Patient access",
    heading: "Digital front door for patients and partners",
    summary: "One place for patients, referrers and corporate partners to book, submit and follow up — with role-based access to what they are allowed to see.",
    modules: [
      { title: "Patient & partner portal", detail: "Registration, appointment history, documents and secure messaging." },
      { title: "Appointment & booking system", detail: "Capacity rules per service, resource and location, with reminders." },
      { title: "Pre-visit intake", detail: "Structured forms that arrive in the operational workflow, not an inbox." },
    ],
    solution: { label: "Customer Experience", href: "/solutions/customer-experience" },
  },
  {
    id: "operations",
    tab: "Clinical operations",
    heading: "Workflows that match how the facility actually runs",
    summary: "Digitise the internal steps between request and completion so ownership, timing and exceptions are visible to supervisors.",
    modules: [
      { title: "Workflow & approval automation", detail: "Requests, referrals and internal approvals with escalation rules." },
      { title: "Document management", detail: "Versioning, retention rules and audit trail per document type." },
      { title: "Operational dashboards", detail: "Queue length, turnaround time and bottlenecks by department." },
    ],
    solution: { label: "Business Process Optimization", href: "/solutions/business-process-optimization" },
  },
  {
    id: "data",
    tab: "Systems & data",
    heading: "Connected systems with governed access",
    summary: "Integrate the platforms you already run, then define who may read or change each data category — by role, not by exception.",
    modules: [
      { title: "System integration layer", detail: "APIs and middleware between clinical, admin and finance systems." },
      { title: "Role & data access model", detail: "Least-privilege roles, consent handling and access logging." },
      { title: "Reporting foundation", detail: "One reconciled operational dataset for management reporting." },
    ],
    solution: { label: "System Integration", href: "/solutions/system-integration" },
  },
  {
    id: "automation",
    tab: "Applied AI",
    heading: "Automation on the paperwork, decisions stay with clinicians",
    summary: "We only automate administrative and document-heavy steps. Clinical judgement remains with qualified staff, with every AI output reviewable.",
    modules: [
      { title: "Intelligent document processing", detail: "Classify and extract data from referrals, claims and lab reports." },
      { title: "Administrative copilots", detail: "Draft responses and summaries for staff review before sending." },
      { title: "Human-in-the-loop controls", detail: "Review queues, confidence thresholds and full traceability." },
    ],
    solution: { label: "AI & Intelligent Automation", href: "/solutions/ai-intelligent-automation" },
  },
];

export function SolutionEcosystem() {
  const [active, setActive] = useState(0);
  const current = groups[active];

  return (
    <div className="mt-10">
      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div role="tablist" aria-label="Healthcare solution groups" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {groups.map((group, index) => (
            <button
              key={group.id}
              role="tab"
              type="button"
              aria-selected={active === index}
              aria-controls={`ecosystem-panel-${group.id}`}
              onClick={() => setActive(index)}
              className={cn(
                "h-11 whitespace-nowrap rounded-xl border px-4 text-[14px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                active === index ? "border-primary bg-primary text-white" : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {group.tab}
            </button>
          ))}
        </div>
      </div>

      <div id={`ecosystem-panel-${current.id}`} role="tabpanel" className="mt-6 rounded-2xl border border-border bg-background p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Pill>{current.tab}</Pill>
            <h3 className="mt-4 text-[22px] font-semibold leading-snug text-foreground sm:text-[26px]">{current.heading}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{current.summary}</p>
            <div className="mt-6">
              <ArrowLink href={current.solution.href}>Solution: {current.solution.label}</ArrowLink>
            </div>
          </div>

          <ul className="grid gap-4 lg:col-span-8 lg:grid-cols-3">
            {current.modules.map((module) => (
              <li key={module.title} className="rounded-xl border border-border bg-muted p-5">
                <Check aria-hidden="true" className="h-5 w-5 text-primary" />
                <h4 className="mt-3 text-[16px] font-semibold leading-snug text-foreground">{module.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{module.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

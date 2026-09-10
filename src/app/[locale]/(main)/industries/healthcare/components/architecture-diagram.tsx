"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Section 05 — Enterprise blueprint.
 * Two views only (simplified / detailed) plus a text alternative, so mobile never
 * renders a shrunken desktop diagram (docs/planning §1.1 responsive rules).
 */
const layers = [
  {
    name: "Channels",
    blocks: ["Patient web & mobile", "Partner / referrer portal", "Staff workspace"],
    detail: "Authenticated sessions, consent capture, accessibility requirements per channel.",
  },
  {
    name: "Experience layer",
    blocks: ["Booking & scheduling", "Intake forms", "Notifications"],
    detail: "Service, resource and location rules; reminder and follow-up logic.",
  },
  {
    name: "Workflow & automation",
    blocks: ["Request routing", "Approvals & escalation", "Document processing"],
    detail: "Human review queues on every automated step; SLA timers per workflow.",
  },
  {
    name: "Integration layer",
    blocks: ["API gateway", "Event bus", "Batch & file transfer"],
    detail: "Synchronous APIs for booking, events for status changes, batch for reconciliation.",
  },
  {
    name: "Systems of record",
    blocks: ["Clinical system", "Administrative / finance", "Reporting store"],
    detail: "MeU integrates with the systems you operate; source-of-truth ownership stays explicit.",
  },
];

const governance = ["Role-based access", "Access logging & audit trail", "Data retention rules", "Environment separation"];

export function ArchitectureDiagram() {
  const [detailed, setDetailed] = useState(false);

  return (
    <figure className="mt-10 rounded-2xl border border-border bg-background p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">Reference blueprint · not a client topology</span>
        <div role="group" aria-label="Diagram detail level" className="flex rounded-lg border border-border p-1">
          {[
            { label: "Simplified", value: false },
            { label: "Detailed", value: true },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={detailed === option.value}
              onClick={() => setDetailed(option.value)}
              className={cn(
                "h-9 rounded-md px-3.5 text-[13px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                detailed === option.value ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {layers.map((layer, index) => (
          <div key={layer.name} className="rounded-xl border border-border bg-muted p-4 sm:p-5">
            <div className="grid gap-3 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-3">
                <span className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground/70">0{index + 1}</span>
                <p className="text-[15px] font-semibold text-foreground">{layer.name}</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 lg:col-span-9">
                {layer.blocks.map((block) => (
                  <span key={block} className="rounded-lg border border-border bg-background px-3 py-2.5 text-center text-[13px] font-medium text-foreground">
                    {block}
                  </span>
                ))}
              </div>
            </div>
            {detailed ? <p className="mt-3 border-t border-border pt-3 text-[13px] leading-relaxed text-muted-foreground">{layer.detail}</p> : null}
          </div>
        ))}

        <div className="rounded-xl border border-primary/30 bg-accent p-4 sm:p-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">Governance across every layer</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {governance.map((item) => (
              <span key={item} className="rounded-md border border-primary/25 bg-background px-2.5 py-1.5 text-[12px] font-medium text-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <figcaption className="mt-5 text-[13px] leading-relaxed text-muted-foreground">
        Illustrative healthcare platform blueprint: channels and workflow delivered by MeU, integrated with the clinical and administrative systems you already operate. Scope, data
        flows and hosting are confirmed per engagement.
      </figcaption>

      <details className="mt-4 rounded-xl bg-muted p-4">
        <summary className="cursor-pointer text-[13px] font-semibold text-foreground">Read the diagram as text</summary>
        <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
          Five layers, top to bottom: {layers.map((layer) => `${layer.name} (${layer.blocks.join(", ")})`).join("; ")}. Governance controls — {governance.join(", ")} — apply to
          every layer.
        </p>
      </details>
    </figure>
  );
}

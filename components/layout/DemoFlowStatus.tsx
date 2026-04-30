"use client";

import Link from "next/link";
import { CheckCircle2, Circle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clearDemoFlow, type DemoFlow, type DemoFlowStage } from "@/lib/demo-flow";

const steps: { key: DemoFlowStage; label: string }[] = [
  { key: "lead", label: "Demande" },
  { key: "offer", label: "Offre" },
  { key: "email", label: "Email" },
  { key: "task", label: "Tâche" },
];

const stageRank: Record<DemoFlowStage, number> = {
  lead: 0,
  offer: 1,
  email: 2,
  task: 3,
};

export function DemoFlowStatus({
  flow,
  onReset,
}: {
  flow: DemoFlow | null;
  onReset?: () => void;
}) {
  if (!flow) return null;

  const currentRank = stageRank[flow.stage];

  return (
    <Card className="border-[var(--ni-border)] bg-card/94">
      <CardContent className="flex items-center justify-between gap-5 px-5 py-4">
        <div className="min-w-0">
          <p className="ni-label">Parcours de présentation actif</p>
          <p className="mt-2 text-sm font-semibold text-foreground">
            {flow.company} · {flow.contact}
          </p>
          <p className="mt-1 line-clamp-1 max-w-2xl text-xs text-muted-foreground">
            {flow.message}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {steps.map((step, index) => {
            const done = index <= currentRank;
            return (
              <div key={step.key} className="flex items-center gap-2">
                <span
                  className={`flex h-7 items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-semibold ${
                    done
                      ? "border-primary/30 bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-white/84 text-muted-foreground dark:bg-muted/58"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                  {step.label}
                </span>
                {index < steps.length - 1 ? <span className="h-px w-4 bg-border" /> : null}
              </div>
            );
          })}
        </div>

        <div className="flex shrink-0 gap-2">
          <Link
            href="/dashboard/demo"
            className="inline-flex h-8 items-center justify-center rounded-xl border border-border/80 bg-card/88 px-3 text-[0.8rem] font-semibold text-foreground shadow-sm transition hover:-translate-y-0.5 hover:bg-card"
          >
            Voir le fil
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            title="Reinitialiser le parcours"
            onClick={() => {
              clearDemoFlow();
              onReset?.();
            }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

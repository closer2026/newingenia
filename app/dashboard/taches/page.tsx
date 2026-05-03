"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, CalendarCheck2, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoFlowStatus } from "@/components/layout/DemoFlowStatus";
import { readDemoFlow, type DemoFlow } from "@/lib/demo-flow";

const tasks = [
  {
    id: "FAC-2026-041",
    title: "Facture - postes NI'One Delta",
    description: "Vérifier les lignes de facture issues de l'offre validée.",
    due: "Aujourd'hui, 16:00",
    status: "a_faire",
    href: "/dashboard/facturation",
    iconLabel: "FACT",
  },
  {
    id: "LI-POST-129",
    title: "Post LinkedIn - poste NI'One",
    description: "Relire le brouillon de publication et valider le visuel produit.",
    due: "Demain, 10:30",
    status: "en_cours",
    href: "/dashboard/linkedin",
    iconLabel: "LI",
  },
  {
    id: "INB-REQ-771",
    title: "Répondre à une nouvelle demande projet",
    description: "Vérifier le résumé du besoin, préparer la réponse et planifier la relance.",
    due: "Demain, 14:00",
    status: "a_faire",
    href: "/dashboard/demandes-entrantes",
    iconLabel: "INB",
  },
] as const;

type TaskItem = {
  id: string;
  title: string;
  description: string;
  due: string;
  status: "a_faire" | "en_cours";
  href: string;
  iconLabel: string;
};

export default function TachesPage() {
  const [flow, setFlow] = useState<DemoFlow | null>(null);

  useEffect(() => {
    setFlow(readDemoFlow());
  }, []);

  const displayedTasks = useMemo(() => {
    if (!flow || flow.stage !== "task") return tasks;
    return [
      {
        id: `DEMO-${flow.leadId}`,
        title: `Relance commerciale - ${flow.company}`,
        description:
          "Action creee depuis l'offre et l'email de suivi : relancer le client apres validation interne.",
        due: "Aujourd'hui, 17:30",
        status: "en_cours",
        href: "/dashboard/redaction-emails",
        iconLabel: "DEMO",
      },
      ...tasks,
    ] satisfies TaskItem[];
  }, [flow]);

  return (
    <div className="space-y-7">
      <DemoFlowStatus flow={flow} onReset={() => setFlow(null)} />
      <div>
        <p className="ni-label">Actions</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Tâches</h1>
        <p className="ni-page-lead mt-2">
          Centralisez les tâches issues des demandes, emails, réunions et projets.
        </p>
      </div>

      <Card className="overflow-hidden rounded-[22px] border border-[#677991]/20 bg-white/92 shadow-[0_4px_12px_rgba(45,55,70,0.06),0_20px_50px_-28px_rgba(45,55,65,0.12)] ring-1 ring-[#677991]/10 dark:border-white/12 dark:bg-[#171d25] dark:ring-white/8">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 divide-y divide-border/55 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-white/10">
            <div className="flex items-start gap-3 p-5 sm:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#677991]/15 bg-[#677991]/08 text-[#677991] dark:border-white/10 dark:bg-white/8 dark:text-[#8fa3bb]">
                <ListTodo className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="ni-label">Tâches du jour</p>
                <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-[var(--ni-text)]">12</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 sm:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-200/80 bg-red-500/[0.07] text-red-700 dark:border-red-400/25 dark:bg-red-500/12 dark:text-red-300">
                <AlertCircle className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="ni-label">En retard</p>
                <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-red-700 dark:text-red-300">
                  2
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 sm:p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-200/80 bg-emerald-500/[0.08] text-emerald-800 dark:border-emerald-400/25 dark:bg-emerald-500/12 dark:text-emerald-200">
                <CalendarCheck2 className="h-4 w-4" aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="ni-label">Terminées semaine</p>
                <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-[var(--ni-text)]">37</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5">
        {displayedTasks.map((task) => {
          const isInProgress = task.status === "en_cours";
          return (
            <Card key={task.id} className="rounded-xl border-border bg-card shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-base tracking-tight">
                    <span className="inline-flex h-5 min-w-[2.2rem] items-center justify-center rounded border border-border bg-muted px-1 text-[10px] font-semibold text-muted-foreground">
                      {task.iconLabel}
                    </span>
                    {task.title}
                  </CardTitle>
                  <Badge className={`rounded-xl border ${isInProgress ? "border-blue-300 bg-blue-500/10 text-blue-700 dark:border-blue-300/35 dark:bg-blue-500/14 dark:text-blue-200" : "border-border bg-muted text-muted-foreground"}`}>
                    {isInProgress ? "En cours" : "A faire"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    Échéance: {task.due}
                  </p>
                  <Link
                    href={task.href}
                    className="inline-flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                  >
                    Ouvrir le module source
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

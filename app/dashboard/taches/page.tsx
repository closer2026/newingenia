"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

      <Card className="rounded-sm border-border bg-card shadow-sm">
        <CardContent className="grid grid-cols-3 gap-3 px-4 py-5 text-sm">
          <div>
            <p className="ni-label">Tâches du jour</p>
            <p className="mt-1 text-xl font-semibold text-foreground">12</p>
          </div>
          <div>
            <p className="ni-label">En retard</p>
            <p className="mt-1 text-xl font-semibold text-red-700 dark:text-red-300">2</p>
          </div>
          <div>
            <p className="ni-label">Terminees semaine</p>
            <p className="mt-1 text-xl font-semibold text-foreground">37</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5">
        {displayedTasks.map((task) => {
          const isInProgress = task.status === "en_cours";
          return (
            <Card key={task.id} className="rounded-sm border-border bg-card shadow-sm">
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
                    className="inline-flex items-center gap-1 rounded-sm border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
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

"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const tasks = [
  {
    id: "FAC-2026-041",
    title: "Facturation Q2 - Client Omega SA",
    description: "Creer la facture du lot avril et verifier les conditions de paiement.",
    due: "Aujourd'hui, 16:00",
    status: "a_faire",
    href: "/dashboard/facturation",
    iconLabel: "FACT",
  },
  {
    id: "LI-POST-129",
    title: "Post Linkedin - Etude de cas atelier",
    description: "Uploader media, definir contexte et valider la version IA avant publication.",
    due: "Demain, 10:30",
    status: "en_cours",
    href: "/dashboard/linkedin",
    iconLabel: "LI",
  },
  {
    id: "INB-REQ-771",
    title: "Repondre a une nouvelle demande projet",
    description: "Verifier la reformulation IA, generer reponse et planifier la relance.",
    due: "Demain, 14:00",
    status: "a_faire",
    href: "/dashboard/demandes-entrantes",
    iconLabel: "INB",
  },
] as const;

export default function TachesPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Execution quotidienne</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">File des taches</h1>
        <p className="ni-page-lead mt-2">
          Chaque ligne indique d&apos;ou vient l&apos;action (badge FACT / INB / LI) et renvoie vers le bon ecran. Les compteurs sont des
          valeurs demo pour le pitch.
        </p>
      </div>

      <Card className="rounded-sm border-border bg-card shadow-sm">
        <CardContent className="grid grid-cols-3 gap-3 px-4 py-5 text-sm">
          <div>
            <p className="ni-label">Taches du jour</p>
            <p className="mt-1 text-xl font-semibold text-foreground">12</p>
          </div>
          <div>
            <p className="ni-label">En retard</p>
            <p className="mt-1 text-xl font-semibold text-red-700">2</p>
          </div>
          <div>
            <p className="ni-label">Terminees semaine</p>
            <p className="mt-1 text-xl font-semibold text-foreground">37</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5">
        {tasks.map((task) => {
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
                  <Badge className={`rounded-sm border ${isInProgress ? "border-blue-300 bg-blue-500/10 text-blue-700 dark:text-blue-300" : "border-border bg-muted text-muted-foreground"}`}>
                    {isInProgress ? "En cours" : "A faire"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">{task.description}</p>
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    Echeance: {task.due}
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

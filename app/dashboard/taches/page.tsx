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
    <div className="space-y-6">
      <div>
        <p className="ni-label">Execution quotidienne</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111]">Taches</h1>
        <p className="mt-2 text-sm text-[#666666]">
          Toutes les actions prioritaires a traiter: facturation, contenus Linkedin et demandes projet.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => {
          const isInProgress = task.status === "en_cours";
          return (
            <Card key={task.id} className="rounded-sm border-[#d8d8d8]">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="flex items-center gap-2 text-base tracking-tight">
                    <span className="inline-flex h-5 min-w-[2.2rem] items-center justify-center rounded border border-[#d0d0d0] bg-white px-1 text-[10px] font-semibold text-[#4a4a4a]">
                      {task.iconLabel}
                    </span>
                    {task.title}
                  </CardTitle>
                  <Badge className={`rounded-sm border ${isInProgress ? "border-blue-200 bg-blue-50 text-blue-700" : "border-zinc-200 bg-white text-[#555555]"}`}>
                    {isInProgress ? "En cours" : "A faire"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-[#666666]">{task.description}</p>
                <div className="flex items-center justify-between">
                  <p className="inline-flex items-center gap-1 text-xs text-[#6b6b6b]">
                    Echeance: {task.due}
                  </p>
                  <Link
                    href={task.href}
                    className="inline-flex items-center gap-1 rounded-sm border border-[#cfcfcf] bg-white px-3 py-1.5 text-xs font-medium text-[#111111] transition hover:bg-[#f7f7f7]"
                  >
                    Ouvrir
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

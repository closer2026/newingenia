"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const items = [
  {
    label: "Offre envoyée · sans réponse depuis 7 j.",
    action: "Email préparé + rappel calendrier",
  },
  {
    label: "Client · attente de complément technique",
    action: "Notification équipe + tâche mise à jour",
  },
  {
    label: "Validation en attente · prix fournisseur",
    action: "Relance interne vers validation",
  },
];

export default function RelancesPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        label="Suivi commercial"
        title="Relances"
        lead="Transformez les silences en actions datées : rappels, notifications, brouillons d’email et prochaines étapes visibles pour toute l’équipe."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-[22px] border border-border/80 lg:col-span-2 dark:border-white/10 dark:bg-[#171d25]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-[var(--ni-text)]">Scénarios (maquette)</CardTitle>
            <p className="text-xs text-muted-foreground">
              Entrées : offre envoyée, client sans réponse, tâche bloquée, validation en attente.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((row) => (
              <div
                key={row.label}
                className="rounded-2xl border border-border/60 bg-muted/25 px-4 py-3 dark:border-white/10 dark:bg-[#121821]/80"
              >
                <p className="text-xs font-semibold text-foreground">{row.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{row.action}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Button size="sm" variant="outline" className="rounded-xl text-xs">
                    Préparer message
                  </Button>
                  <Button size="sm" className="rounded-xl text-xs">
                    Programmer rappel
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[22px] border border-dashed border-[#677991]/25 bg-[#677991]/04 dark:border-[#8fa3bb]/25 dark:bg-[#8fa3bb]/06">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--ni-text)]">Sorties types</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <div className="flex flex-wrap gap-2">
              {["Rappel", "Notification", "Email préparé", "Prochaine action"].map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-full text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="pt-2">
              Les relances alimentent le{" "}
              <Link href="/dashboard" className="font-medium text-primary hover:underline">
                tableau de bord
              </Link>{" "}
              et les journaux du dossier.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

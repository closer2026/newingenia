"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const queue = [
  { type: "Offre", ref: "NI'One · Horloger Delta" },
  { type: "Prix", ref: "Option convoyeur — marge mini" },
  { type: "Publication", ref: "Post LinkedIn veille salon" },
  { type: "Tâche", ref: "Relance fournisseur blindage" },
];

export default function ValidationsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        label="Décisions humaines"
        title="Validations"
        lead="Centralisez les arbitrages avant envoi client ou publication. Les sorties structurées alimentent le dossier et les relances."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-[22px] border border-border/80 lg:col-span-2 dark:border-white/10 dark:bg-[#171d25]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-[var(--ni-text)]">En attente</CardTitle>
            <p className="text-xs text-muted-foreground">
              Entrées typiques : offre préparée, prix à confirmer, contenu à publier, tâche sensible.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {queue.map((row) => (
              <div
                key={row.ref}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-muted/25 px-4 py-3 dark:border-white/10 dark:bg-[#121821]/80"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground">{row.type}</p>
                  <p className="text-xs text-muted-foreground">{row.ref}</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button size="sm" className="rounded-xl text-xs">
                    Valider
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-xl text-xs">
                    Renvoyer
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[22px] border border-dashed border-[#677991]/25 bg-[#677991]/04 dark:border-[#8fa3bb]/25 dark:bg-[#8fa3bb]/06">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[var(--ni-text)]">Sorties possibles</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs text-muted-foreground">
            <p>Validé · À corriger · Refusé · Renvoyé à une personne</p>
            <p className="pt-2">
              Chaque sortie est tracée depuis le{" "}
              <Link href="/dashboard" className="font-medium text-primary hover:underline">
                tableau de bord
              </Link>{" "}
              et les modules liés au dossier.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const folders = [
  { name: "Catalogues & fiches NI'One", count: 24, tag: "Référentiel" },
  { name: "Offres & devis archivés", count: 118, tag: "Commercial" },
  { name: "Plans & notices fournisseurs", count: 56, tag: "Technique" },
  { name: "Conformité & administratif", count: 12, tag: "Interne" },
] as const;

export default function DocumentsPage() {
  return (
    <div className="space-y-7">
      <PageHeader
        label="Bibliothèque"
        title="Documents"
        lead="Vue maquette du corpus : dossiers sources, versions et rattachements aux projets. La recherche interrogative reste dans le module Recherche technique."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {folders.map((f) => (
          <Card
            key={f.name}
            className="rounded-[22px] border border-border/80 dark:border-white/10 dark:bg-[#171d25]"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-sm font-semibold text-[var(--ni-text)]">{f.name}</CardTitle>
                <Badge variant="outline" className="shrink-0 rounded-full text-[10px]">
                  {f.tag}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-end justify-between gap-3 text-xs text-muted-foreground">
              <p className="min-w-0">{f.count} documents (illustration)</p>
              <Link
                href="/dashboard/recherche-docs"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "shrink-0 rounded-xl px-3 text-xs no-underline"
                )}
              >
                Voir
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[22px] border border-dashed border-[#677991]/25 bg-[#677991]/04 dark:border-[#8fa3bb]/25 dark:bg-[#8fa3bb]/06">
        <CardContent className="py-4 text-xs text-muted-foreground">
          <p>
            Pour poser une question et obtenir des extraits sourcés, ouvrir{" "}
            <Link href="/dashboard/recherche-docs" className="font-medium text-primary hover:underline">
              Recherche technique
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

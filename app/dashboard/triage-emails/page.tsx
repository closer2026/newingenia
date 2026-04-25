"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const buckets = [
  {
    title: "Urgent",
    count: 3,
    tone: "border-red-200 bg-red-50/80 text-red-900 dark:border-red-300/35 dark:bg-red-500/14 dark:text-red-100",
    example: "MecaPro SA — « Urgent : devis ligne complete »",
    actions: ["Creer une demande", "Rediger une reponse"],
  },
  {
    title: "A traiter",
    count: 12,
    tone: "border-amber-200 bg-amber-50/70 text-amber-950 dark:border-amber-300/35 dark:bg-amber-400/14 dark:text-amber-100",
    example: "Omega SA — « Question sur delai livraison »",
    actions: ["Generer une reponse", "Archiver"],
  },
  {
    title: "Info",
    count: 28,
    tone: "border-border bg-muted/40 text-foreground",
    example: "Bosch Rexroth — « Nouveau catalogue 2026 »",
    actions: ["Archiver", "Ajouter aux docs"],
  },
  {
    title: "Spam / hors sujet",
    count: 4,
    tone: "border-border bg-card text-muted-foreground",
    example: "Newsletter generique — aucun projet detecte",
    actions: ["Archiver tout"],
  },
] as const;

export default function TriageEmailsPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Messagerie</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Triage emails</h1>
        <p className="ni-page-lead mt-2">
          Vue demo des boites : chaque ligne resume l&apos;email, propose une action et evite de relire toute la boite.
          En production : connexion Gmail / Outlook puis tri reel par l&apos;IA.
        </p>
      </div>

      <Card className="rounded-sm border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base tracking-tight">Boite de triage (demo)</CardTitle>
            <Badge variant="outline" className="rounded-sm text-xs font-normal">
              47 emails simules · tri manuel ou « Analyser tout » plus tard
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Les boutons ci-dessous declenchent des toasts ou des ecrans lies dans une version connectee ; ici ils servent a
            montrer le flux attendu.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="rounded-sm">
              Analyser tout le lot (demo)
            </Button>
            <Button size="sm" variant="outline" className="rounded-sm border-border">
              Archiver tout le bloc Info (demo)
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {buckets.map((bucket) => (
              <div key={bucket.title} className={`rounded-2xl border p-4 shadow-sm ${bucket.tone}`}>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{bucket.title}</p>
                  <span className="rounded-xl border border-border/60 bg-background/60 px-2 py-0.5 text-xs font-medium dark:bg-white/8">
                    {bucket.count} mails
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed opacity-90">{bucket.example}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bucket.actions.map((label) => (
                    <Button key={label} size="sm" variant="outline" className="h-8 rounded-sm border-border text-xs">
                      {label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

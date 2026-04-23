"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const columns = [
  {
    title: "Conception",
    items: [
      { client: "Cartier SA", project: "3 postes ESD", amount: "CHF 24'000", status: "J+3 retard" },
      { client: "Valfleurier", project: "Flux laminaire ligne 2", amount: "CHF 17'800", status: "Validation plan" },
    ],
  },
  {
    title: "Devis",
    items: [{ client: "Omega SA", project: "2 convoyeurs", amount: "CHF 18'500", status: "OK" }],
  },
  {
    title: "En production",
    items: [{ client: "Helio Industrie", project: "Chassis sur mesure", amount: "CHF 31'200", status: "OK" }],
  },
  {
    title: "Livraison",
    items: [{ client: "Atlas SA", project: "4 postes", amount: "CHF 12'800", status: "25.04.2026" }],
  },
];

export default function SuiviProjetsPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Nouveau module direction</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Suivi de projets</h1>
        <p className="ni-page-lead mt-2 max-w-4xl">
          Kanban + KPI + fiche detaillee : meme information qu&apos;un tableau Excel, mais lisible en reunion et enrichie par un
          resume IA (donnees demo).
        </p>
      </div>

      <section className="grid grid-cols-4 gap-4">
        {[
          { label: "CA en cours", value: "CHF 86'500" },
          { label: "Projets a risque", value: "2" },
          { label: "Livraisons semaine", value: "4" },
          { label: "Retards critiques", value: "1" },
        ].map((kpi) => (
          <Card key={kpi.label} className="rounded-sm border-border bg-card shadow-sm">
            <CardContent className="px-4 py-5">
              <p className="ni-label">{kpi.label}</p>
              <p className="mt-2 text-xl font-semibold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid grid-cols-4 gap-4">
        {columns.map((column) => (
          <Card key={column.title} className="rounded-sm border-border bg-card shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm uppercase tracking-[0.14em] text-muted-foreground">{column.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {column.items.map((item) => (
                <div key={`${item.client}-${item.project}`} className="rounded-sm border border-border bg-muted/30 p-3">
                  <p className="text-sm font-medium text-foreground">{item.client}</p>
                  <p className="text-xs text-muted-foreground">{item.project}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{item.amount}</p>
                  <p className="mt-1 text-xs font-medium text-foreground">{item.status}</p>
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" className="h-7 rounded-sm border-border text-xs">
                      Ouvrir la fiche
                    </Button>
                    <Button variant="outline" size="sm" className="h-7 rounded-sm border-border text-xs">
                      Actualiser le resume IA
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-sm border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Fiche projet detaillee · Cartier SA</CardTitle>
          <p className="text-xs text-muted-foreground">Vue drill-down : jalons, alerte et actions rapides pour l&apos;equipe.</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="text-muted-foreground">
            Statut : EN CONCEPTION · Budget valide : CHF 24&apos;000 · Livraison souhaitee : fin mai 2026.
          </p>
          <div className="space-y-2 rounded-sm border border-border bg-muted/30 p-3 text-muted-foreground">
            <p>15/04 · Reunion de lancement</p>
            <p>20/04 · Budget valide</p>
            <p>25/04 · Plan d&apos;implantation en attente</p>
            <p>02/05 · Commande Bosch Rexroth</p>
          </div>
          <div className="rounded-sm border border-blue-200 bg-blue-50 p-3 text-blue-900">
            Resume IA : Projet en bonne voie. Point bloquant : validation plan par SF avant 25/04. Action
            prioritaire recommandee : relancer SF aujourd&apos;hui.
          </div>
          <div className="flex flex-wrap gap-2">
            <Button className="rounded-sm">Notifier l&apos;equipe projet</Button>
            <Button variant="outline" className="rounded-sm border-border">
              Preparer un email client
            </Button>
            <Button variant="outline" className="rounded-sm border-border">
              Ajouter une note de suivi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

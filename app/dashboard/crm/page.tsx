"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CrmPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Projets & Clients</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">CRM leger</h1>
        <p className="ni-page-lead mt-2">
          Vue demo d&apos;un compte strategique : contacts, historique chiffre, timeline d&apos;echanges et resume IA pour preparer le
          prochain rendez-vous sans relire 50 emails.
        </p>
      </div>

      <Card className="rounded-sm border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Fiche client · Omega SA</CardTitle>
          <p className="text-xs text-muted-foreground">Exemple horlogerie : montrez la continuite commerciale et la prochaine opportunite.</p>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-3 rounded-sm border border-border bg-muted/30 p-3">
            <p className="text-muted-foreground">Contact : Mme Keller · keller@omega.ch</p>
            <p className="text-muted-foreground">Secteur : Horlogerie de luxe</p>
            <p className="text-muted-foreground">Statut : Client actif</p>
            <p className="text-muted-foreground">Telephone : +41 32 xxx xx xx</p>
          </div>

          <div className="rounded-sm border border-border p-3">
            <p className="ni-label mb-2">Historique commercial</p>
            <p className="text-muted-foreground">2026 : 2 projets · CHF 34&apos;500 · 1 en cours</p>
            <p className="text-muted-foreground">2025 : 3 projets · CHF 52&apos;000 · tous livres</p>
          </div>

          <div className="rounded-sm border border-border p-3">
            <p className="ni-label mb-2">Interactions</p>
            <p className="text-muted-foreground">20/04 · Reunion (projet postes ESD)</p>
            <p className="text-muted-foreground">18/04 · Email envoye (offre 2026-042)</p>
            <p className="text-muted-foreground">10/04 · Appel telephonique</p>
          </div>

          <div className="rounded-sm border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
            Resume IA : Client fidele depuis 2019. Decisionnaire : Mme Keller. Paiements ponctuels.
            Opportunite detectee : flux laminaires ligne 3.
          </div>

          <div className="flex flex-wrap gap-2">
            <Button className="rounded-sm">Rediger une nouvelle offre</Button>
            <Button variant="outline" className="rounded-sm border-border">
              Preparer un email client
            </Button>
            <Button variant="outline" className="rounded-sm border-border">
              Logger un appel
            </Button>
            <Button variant="outline" className="rounded-sm border-border">
              Ajouter une note interne
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

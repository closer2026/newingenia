"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VeillePage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Infos utiles</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Veille</h1>
        <p className="ni-page-lead mt-2 max-w-4xl">
          Regroupez les nouveautés fournisseurs, salons, tendances ou opportunités à surveiller.
        </p>
      </div>

      <Card className="rounded-xl border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Brief du 21 avril 2026</CardTitle>
          <p className="text-xs text-muted-foreground">Lecture rapide : trois blocs prioritaires, du plus tactique au plus macro.</p>
        </CardHeader>
        <CardContent className="space-y-5 text-sm">
          <div className="rounded-xl border border-border bg-muted/52 p-4 shadow-sm">
            <p className="font-medium text-foreground">SIAMS 2026 en cours — Forum de l&apos;Arc, Moutier</p>
            <p className="mt-1 text-muted-foreground">
              Du 21 au 24 avril. Vos clients sont probablement presents. Opportunite de rencontres terrain.
            </p>
            <Button variant="outline" size="sm" className="mt-3 rounded-xl border-border">
              Ouvrir la liste des exposants
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-muted/52 p-4 shadow-sm">
            <p className="font-medium text-foreground">Bosch Rexroth</p>
            <p className="mt-1 text-muted-foreground">Nouveau catalogue profiles aluminium Q2 2026.</p>
            <Button variant="outline" size="sm" className="mt-3 rounded-xl border-border">
              Envoyer le PDF vers les documents
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-muted/52 p-4 shadow-sm">
            <p className="font-medium text-foreground">Secteur</p>
            <p className="mt-1 text-muted-foreground">
              Ralentissement horlogerie confirme : -8% T1 2026. Impact potentiel sur les commandes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VeillePage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="ni-label">Intelligence</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Veille</h1>
        <p className="mt-2 max-w-4xl text-sm text-muted-foreground">
          Veille hebdomadaire automatique : SIAMS, Bosch Rexroth, secteur microtechnique et concurrence.
        </p>
      </div>

      <Card className="rounded-sm border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base tracking-tight">Veille hebdomadaire · 21 avril 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="rounded-sm border border-border bg-muted/30 p-3">
            <p className="font-medium text-foreground">SIAMS 2026 en cours — Forum de l&apos;Arc, Moutier</p>
            <p className="mt-1 text-muted-foreground">
              Du 21 au 24 avril. Vos clients sont probablement presents. Opportunite de rencontres terrain.
            </p>
            <Button variant="outline" size="sm" className="mt-3 rounded-sm border-border">
              Voir exposants
            </Button>
          </div>

          <div className="rounded-sm border border-border bg-muted/30 p-3">
            <p className="font-medium text-foreground">Bosch Rexroth</p>
            <p className="mt-1 text-muted-foreground">Nouveau catalogue profiles aluminium Q2 2026.</p>
            <Button variant="outline" size="sm" className="mt-3 rounded-sm border-border">
              Ajouter a Recherche docs
            </Button>
          </div>

          <div className="rounded-sm border border-border bg-muted/30 p-3">
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

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TriageEmailsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="ni-label">Messagerie</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Triage emails</h1>
      </div>

      <Card className="rounded-sm border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base tracking-tight">Boite de triage</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Module actif pour les administrateurs. Prochaine etape: brancher la liste des emails et les actions de tri.
        </CardContent>
      </Card>
    </div>
  );
}

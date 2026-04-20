"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ParametresPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="ni-label">Configuration</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111]">Parametres</h1>
      </div>

      <Card className="rounded-sm border-[#d8d8d8]">
        <CardHeader>
          <CardTitle className="text-base tracking-tight">Preferences du compte</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-[#666666]">
          Cette section est prete pour brancher les options utilisateur (profil, langue, notifications).
        </CardContent>
      </Card>
    </div>
  );
}

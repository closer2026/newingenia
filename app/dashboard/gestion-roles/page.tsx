"use client";

import { useRole } from "@/contexts/RoleContext";
import { RolesMatrix } from "@/components/modules/RolesMatrix";
import { Card, CardContent } from "@/components/ui/card";

export default function GestionRolesPage() {
  const { role } = useRole();

  if (role !== "admin") {
    return (
      <Card className="ni-surface rounded-sm shadow-sm">
        <CardContent className="space-y-2 py-10 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Accès restreint</p>
          <p>La matrice des droits est visible uniquement avec le rôle Admin.</p>
          <p className="text-xs">Basculez le rôle dans Paramètres pour montrer les différences d&apos;accès.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="ni-label">Accès</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Accès & rôles</h1>
        <p className="ni-page-lead mt-2">
          Définissez qui peut voir ou modifier les informations selon son rôle.
        </p>
      </div>
      <RolesMatrix />
    </div>
  );
}

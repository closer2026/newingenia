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
          <p className="font-medium text-foreground">Acces restreint</p>
          <p>La matrice des droits est visible uniquement avec le role Admin (maquette).</p>
          <p className="text-xs">Basculez le role dans Parametres pour rejouer la demo.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="ni-label">Administration</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Gestion des roles</h1>
        <p className="ni-page-lead mt-2">
          Tableau des permissions par module et liste des comptes demo. Aucune modification n&apos;est persistee : objectif
          uniquement pedagogique.
        </p>
      </div>
      <RolesMatrix />
    </div>
  );
}

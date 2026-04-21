"use client";

import { useRole } from "@/contexts/RoleContext";
import { RolesMatrix } from "@/components/modules/RolesMatrix";
import { Card, CardContent } from "@/components/ui/card";

export default function GestionRolesPage() {
  const { role } = useRole();

  if (role !== "admin") {
    return (
      <Card className="ni-surface rounded-sm">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          Cette section est reservee au role Admin.
        </CardContent>
      </Card>
    );
  }

  return <RolesMatrix />;
}

import { users } from "@/lib/mock-data";
import { ROLE_BADGE_CLASSES, ROLE_LABELS } from "@/lib/roles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

const matrix: [string, boolean, boolean, boolean, boolean][] = [
  ["Recherche docs", true, true, true, false],
  ["Redaction offres", true, true, false, false],
  ["Réunion IA", true, true, false, false],
  ["Redaction emails", true, true, true, false],
  ["Triage emails", true, false, false, false],
  ["Gestion des roles", true, false, false, false],
];

export function RolesMatrix() {
  return (
    <div className="space-y-5">
      <Card className="ni-surface rounded-sm shadow-sm">
        <CardHeader className="pb-2">
          <p className="ni-label">Administration</p>
          <CardTitle className="text-base tracking-tight">Matrice des permissions</CardTitle>
          <p className="text-xs text-muted-foreground">
            Chaque point vert indique un acces lecture/ecriture ; gris = pas d&apos;acces pour ce role (donnees demo).
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Module</TableHead><TableHead>Admin</TableHead><TableHead>Manager</TableHead><TableHead>Technicien</TableHead><TableHead>Viewer</TableHead></TableRow></TableHeader>
            <TableBody>
              {matrix.map(([name, a, m, t, v]) => (
                <TableRow key={name}>
                  <TableCell>{name}</TableCell>
                  {[a, m, t, v].map((value, idx) => (
                    <TableCell key={idx}><span className={`inline-block h-2.5 w-2.5 rounded-full ${value ? "bg-emerald-500" : "bg-zinc-300"}`} /></TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="ni-surface rounded-sm shadow-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-base tracking-tight">Utilisateurs actifs</CardTitle>
            <p className="text-xs text-muted-foreground">Comptes fictifs pour illustrer les roles Admin / Manager / Technicien.</p>
          </div>
          <Button size="sm" className="rounded-sm bg-[#252525] hover:bg-[#1e1e1e]">
            Inviter un collaborateur (demo)
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Role</TableHead><TableHead>Email</TableHead><TableHead>Derniere connexion</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell><Badge className={cn("rounded-sm border", ROLE_BADGE_CLASSES[user.role as keyof typeof ROLE_LABELS])}>{ROLE_LABELS[user.role as keyof typeof ROLE_LABELS]}</Badge></TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" className="rounded-sm">
                      Modifier les droits
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-sm">
                      Suspendre le compte
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

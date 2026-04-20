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
  ["Réunion", true, true, false, false],
  ["Redaction emails", true, true, true, false],
  ["Triage emails", true, false, false, false],
  ["Gestion des roles", true, false, false, false],
];

export function RolesMatrix() {
  return (
    <div className="space-y-4">
      <Card className="ni-surface rounded-sm">
        <CardHeader>
          <p className="ni-label">Administration</p>
          <CardTitle className="text-base tracking-tight">Matrice des permissions</CardTitle>
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
      <Card className="ni-surface rounded-sm">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base tracking-tight">Utilisateurs actifs</CardTitle>
          <Button size="sm" className="rounded-sm bg-[#1f1f1f] hover:bg-black">Ajouter un utilisateur</Button>
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
                  <TableCell className="space-x-2"><Button variant="outline" size="sm" className="rounded-sm">Modifier</Button><Button variant="outline" size="sm" className="rounded-sm">Desactiver</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

import { RecordButton } from "@/components/modules/RecordButton";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ReunionIaPage() {
  return (
    <div className="space-y-5">
      <div>
        <p className="ni-label">Reunion intelligente</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Réunion IA</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enregistrement simule, resume automatique, decisions extraites puis creation de taches.
        </p>
      </div>
      <RecordButton />
      <div className="grid grid-cols-3 gap-4">
        <Card className="ni-surface rounded-lg">
          <CardHeader><CardTitle className="text-base tracking-tight">Resume automatique</CardTitle></CardHeader>
          <CardContent className="text-sm text-foreground">
            Reunion du 20 avril 2026 — Projet ligne de production Cartier SA. Decision d&apos;integrer 3 postes NI&apos;One avec surface ESD. Budget valide a CHF 24 000. Livraison souhaitee fin mai 2026. Point ouvert: validation plan d&apos;implantation avant le 25 avril.
          </CardContent>
        </Card>
        <Card className="ni-surface rounded-lg">
          <CardHeader><CardTitle className="text-base tracking-tight">Taches par personne</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm text-foreground">
            <p>ML · Preparer devis postes ESD · avant 25 avril</p>
            <p>SF · Valider plan d&apos;implantation client · avant 28 avril</p>
            <p>JD · Confirmer delai fournisseur Bosch Rexroth · avant 22 avril</p>
          </CardContent>
        </Card>
        <Card className="ni-surface rounded-lg">
          <CardHeader><CardTitle className="text-base tracking-tight">Transcription</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-28 text-sm text-muted-foreground">
              Oui, on valide les 3 postes NI&apos;One... Il faut ajouter la surface ESD... Le client souhaite une livraison avant fin mai... On attend la validation finale du plan...
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/dashboard/taches"
          className="rounded-sm border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          Creer taches (simulation)
        </Link>
        <Link
          href="/dashboard/redaction-emails"
          className="rounded-sm border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted"
        >
          Envoyer compte-rendu
        </Link>
      </div>
    </div>
  );
}

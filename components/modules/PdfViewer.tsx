import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PdfViewer() {
  return (
    <Card className="ni-surface h-[680px] rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base tracking-tight">Document source</CardTitle>
        <p className="text-xs text-muted-foreground">
          Extrait à vérifier avant de reprendre la référence dans une offre ou une réponse client.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="ni-label">Référence active</p>
        <p className="text-sm font-medium text-foreground">Catalogue Structure Bosch Rexroth 2024 + fiche NI&apos;One ESD</p>
        <p className="text-xs text-muted-foreground">Page 47 sur 312</p>
        <div className="rounded-md border border-border bg-muted p-4 text-sm leading-relaxed text-foreground">
          Extrait technique - Profilés de structure série 45x45
          <br />
          Charge statique recommandee jusqu&apos;a 80 kg sur 1.2 m.
          <br />
          <span className="rounded-sm bg-[#f0a500] px-1.5 py-0.5 text-[#252525]">Référence 3 842 990 026, section renforcée.</span>
        </div>
        <Button variant="outline" className="w-full rounded-sm">
          Ouvrir le document source
        </Button>
        <div className="space-y-2">
          <p className="text-sm font-medium">Autres references suggerees</p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-sm">Catalogue Profiles BR 2024</Badge>
            <Badge variant="outline" className="rounded-sm">NI&apos;One fiche technique</Badge>
            <Badge variant="outline" className="rounded-sm">Manuel montage profiles</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

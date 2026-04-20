import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PdfViewer() {
  return (
    <Card className="ni-surface h-[680px] rounded-sm border-[#d8d8d8]">
      <CardHeader>
        <CardTitle className="text-base tracking-tight">Document source</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="ni-label">Reference active</p>
        <p className="text-sm font-medium text-[#111111]">Catalogue Structure Bosch Rexroth 2024</p>
        <p className="text-xs text-[#666666]">Page 47 sur 312</p>
        <div className="rounded-sm border border-[#dddddd] bg-[#f8f8f8] p-4 text-sm leading-relaxed text-[#1A1A1A]">
          Extrait technique - Profiles de structure serie 45x45
          <br />
          Charge statique recommandee jusqu&apos;a 80kg sur 1.2m.
          <br />
          <span className="rounded-sm bg-[#f0a500] px-1.5 py-0.5 text-black">Reference 3 842 990 026, section renforcee.</span>
        </div>
        <Button variant="outline" className="w-full rounded-sm">
          Ouvrir le document complet
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

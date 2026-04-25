"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function OffreForm({
  onGenerated,
  demoCompany,
  demoContact,
}: {
  onGenerated: () => void;
  demoCompany?: string;
  demoContact?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(5);
  const [client, setClient] = useState(demoCompany || "Manufacture Horlogere Delta");
  const [contact, setContact] = useState(demoContact || "Claire Martin");

  useEffect(() => {
    if (demoCompany) setClient(demoCompany);
    if (demoContact) setContact(demoContact);
  }, [demoCompany, demoContact]);

  const generate = () => {
    setLoading(true);
    setProgress(10);
    const interval = setInterval(() => setProgress((p) => Math.min(95, p + 12)), 250);
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoading(false);
      onGenerated();
      toast.success("Base d'offre preparee");
    }, 2000);
  };

  return (
    <Card className="ni-surface rounded-sm">
      <CardHeader className="pb-2">
        <p className="ni-label">Offre client</p>
        <CardTitle className="text-base tracking-tight">Base d&apos;offre</CardTitle>
        <p className="text-xs text-muted-foreground">
          Renseignez le projet : l&apos;outil prépare une base d&apos;offre visible à droite, à relire avant envoi.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="ni-field"><Label>Client</Label><Input value={client} onChange={(event) => setClient(event.target.value)} /></div>
        <div className="ni-field"><Label>Contact</Label><Input value={contact} onChange={(event) => setContact(event.target.value)} /></div>
        <div className="ni-field">
          <Label>Type de projet</Label>
          <Select defaultValue="poste"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="poste">Poste de travail</SelectItem><SelectItem value="flux">Flux laminaire</SelectItem><SelectItem value="chariot">Chariot</SelectItem><SelectItem value="mesure">Sur mesure</SelectItem>
          </SelectContent></Select>
        </div>
        <div className="ni-field"><Label>Dimensions L × l × H</Label><Input placeholder="1800 x 800 x 900 mm" /></div>
        <div className="ni-field"><Label>Charge maximale</Label><Input placeholder="120 kg" /></div>
        <div className="space-y-3">
          <Label>Options speciales</Label>
          <div className="space-y-2">
            {["Surface ESD", "Flux laminaire", "Roulettes", "Eclairage LED"].map((opt) => (
              <div key={opt} className="flex items-center gap-2"><Checkbox id={opt} /><Label htmlFor={opt}>{opt}</Label></div>
            ))}
          </div>
        </div>
        <div className="ni-field"><Label>Contraintes specifiques</Label><Textarea /></div>
        <div className="ni-field"><Label>Délai souhaité</Label><Input type="date" /></div>
        <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-4 text-center text-sm leading-relaxed text-muted-foreground">
          Piece jointe possible : plan, photo de ligne ou cahier des charges client.
        </div>
        {loading ? <Progress value={progress} /> : null}
        <Button onClick={generate} className="w-full rounded-sm bg-[#252525] hover:bg-[#1e1e1e]">
          Préparer la base d&apos;offre
        </Button>
        <Button variant="outline" className="w-full rounded-sm">
          Sauvegarder le brouillon localement
        </Button>
      </CardContent>
    </Card>
  );
}

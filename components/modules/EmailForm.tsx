"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function EmailForm({ onGenerate }: { onGenerate: () => void }) {
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGenerate();
      toast.success("Email genere");
    }, 1500);
  };

  return (
    <Card className="ni-surface rounded-lg">
      <CardHeader>
        <p className="ni-label">Assistant redaction</p>
        <CardTitle className="text-base tracking-tight">Nouvel email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div><Label>Destinataire</Label><Input defaultValue="Marc Leroy · Cartier SA" /></div>
        <div><Label>Email destinataire</Label><Input defaultValue="marc.leroy@cartier.com" /></div>
        <div><Label>Objet</Label><Input defaultValue="Confirmation commande postes de travail" /></div>
        <div><Label>Ce que vous voulez dire</Label><Textarea defaultValue="Confirmer le planning, les quantites et la date d'installation." /></div>
        <div><Label>Ton</Label><div className="mt-2 flex gap-2 text-xs"><span className="rounded-sm bg-primary px-3 py-1 text-primary-foreground">Professionnel</span><span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground">Cordial</span><span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground">Formel</span><span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground">Bref</span></div></div>
        <div><Label>Langue</Label><Select defaultValue="fr"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="fr">Francais</SelectItem><SelectItem value="de">Allemand</SelectItem><SelectItem value="en">Anglais</SelectItem><SelectItem value="it">Italien</SelectItem></SelectContent></Select></div>
        <div><Label>Signature</Label><Select defaultValue="arnaud"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="arnaud">Arnaud Dupont</SelectItem><SelectItem value="marc">Marc Lambert</SelectItem><SelectItem value="sophie">Sophie Favre</SelectItem></SelectContent></Select></div>
        <Button onClick={generate} className="w-full rounded-sm">{loading ? "Generation..." : "Generer l'email"}</Button>
      </CardContent>
    </Card>
  );
}

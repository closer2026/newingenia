"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function OffreForm({ onGenerated }: { onGenerated: () => void }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(5);

  const generate = () => {
    setLoading(true);
    setProgress(10);
    const interval = setInterval(() => setProgress((p) => Math.min(95, p + 12)), 250);
    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setLoading(false);
      onGenerated();
      toast.success("Offre generee !");
    }, 2000);
  };

  return (
    <Card className="ni-surface rounded-sm">
      <CardHeader>
        <p className="ni-label">Assistant commercial</p>
        <CardTitle className="text-base tracking-tight">Nouvelle offre</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div><Label>Client</Label><Input defaultValue="Omega SA" /></div>
        <div><Label>Contact</Label><Input defaultValue="M. Jean-Pierre Martin" /></div>
        <div>
          <Label>Type de projet</Label>
          <Select defaultValue="poste"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
            <SelectItem value="poste">Poste de travail</SelectItem><SelectItem value="flux">Flux laminaire</SelectItem><SelectItem value="chariot">Chariot</SelectItem><SelectItem value="mesure">Sur mesure</SelectItem>
          </SelectContent></Select>
        </div>
        <div><Label>Dimensions L × l × H</Label><Input placeholder="2400 x 900 x 780 mm" /></div>
        <div><Label>Charge maximale</Label><Input placeholder="80kg" /></div>
        <div className="space-y-2">
          <Label>Options speciales</Label>
          {["Surface ESD", "Flux laminaire", "Roulettes", "Eclairage LED"].map((opt) => (
            <div key={opt} className="flex items-center gap-2"><Checkbox id={opt} /><Label htmlFor={opt}>{opt}</Label></div>
          ))}
        </div>
        <div><Label>Contraintes specifiques</Label><Textarea /></div>
        <div><Label>Delai souhaite</Label><Input type="date" /></div>
        <div className="rounded-sm border border-dashed border-[#bbbbbb] p-4 text-center text-sm text-[#666666]">
          Joindre des fichiers (drag & drop)
        </div>
        {loading ? <Progress value={progress} /> : null}
        <Button onClick={generate} className="w-full rounded-sm bg-[#1f1f1f] hover:bg-black">Generer l&apos;offre avec l&apos;IA</Button>
        <Button variant="outline" className="w-full rounded-sm">Sauvegarder le brouillon</Button>
      </CardContent>
    </Card>
  );
}

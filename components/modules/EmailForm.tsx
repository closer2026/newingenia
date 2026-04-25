"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function EmailForm({
  onGenerate,
  demoContact,
  demoCompany,
  demoMessage,
}: {
  onGenerate: () => void;
  demoContact?: string;
  demoCompany?: string;
  demoMessage?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [recipient, setRecipient] = useState("Claire Martin · Manufacture Horlogère Delta");
  const [email, setEmail] = useState("claire.martin@delta-horlogerie.ch");
  const [subject, setSubject] = useState("Votre offre pour 3 postes NI'One ESD");
  const [message, setMessage] = useState("Envoyer l'offre, rappeler les options ESD et proposer un point de validation.");

  useEffect(() => {
    if (!demoCompany && !demoContact) return;
    setRecipient(`${demoContact ?? "Contact"} · ${demoCompany ?? "Entreprise"}`);
    setEmail("contact@client.ch");
    setSubject(`Suite à votre demande - ${demoCompany ?? "projet"}`);
    setMessage(
      demoMessage
        ? `Reprendre le contexte du lead, confirmer la proposition commerciale et proposer un point de validation. Message initial : ${demoMessage}`
        : "Reprendre le contexte du lead, confirmer la proposition commerciale et proposer un point de validation."
    );
  }, [demoCompany, demoContact, demoMessage]);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onGenerate();
      toast.success("Brouillon email préparé");
    }, 1500);
  };

  return (
    <Card className="ni-surface rounded-lg">
      <CardHeader className="pb-2">
        <p className="ni-label">Email client</p>
        <CardTitle className="text-base tracking-tight">Brouillon à préparer</CardTitle>
        <p className="text-xs text-muted-foreground">
          Indiquez le destinataire et l&apos;intention : l&apos;aperçu à droite se met à jour après préparation.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="ni-field"><Label>Destinataire</Label><Input value={recipient} onChange={(event) => setRecipient(event.target.value)} /></div>
        <div className="ni-field"><Label>Email destinataire</Label><Input value={email} onChange={(event) => setEmail(event.target.value)} /></div>
        <div className="ni-field"><Label>Objet</Label><Input value={subject} onChange={(event) => setSubject(event.target.value)} /></div>
        <div className="ni-field">
          <Label>Message clé à transmettre</Label>
          <Textarea value={message} onChange={(event) => setMessage(event.target.value)} />
        </div>
        <div className="ni-field"><Label>Ton</Label><div className="flex gap-2 text-xs"><span className="rounded-sm bg-primary px-3 py-1 text-primary-foreground">Professionnel</span><span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground">Cordial</span><span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground">Formel</span><span className="rounded-sm border border-border bg-card px-3 py-1 text-foreground">Bref</span></div></div>
        <div className="ni-field"><Label>Langue</Label><Select defaultValue="fr"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="fr">Français</SelectItem><SelectItem value="de">Allemand</SelectItem><SelectItem value="en">Anglais</SelectItem><SelectItem value="it">Italien</SelectItem></SelectContent></Select></div>
        <div className="ni-field"><Label>Signature</Label><Select defaultValue="arnaud"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="arnaud">Arnaud Dupont</SelectItem><SelectItem value="marc">Marc Lambert</SelectItem><SelectItem value="sophie">Sophie Favre</SelectItem></SelectContent></Select></div>
        <Button onClick={generate} className="w-full rounded-sm">
          {loading ? "Préparation en cours..." : "Préparer le brouillon email"}
        </Button>
      </CardContent>
    </Card>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LinkedinPage() {
  const [mediaName, setMediaName] = useState("");
  const [context, setContext] = useState("");
  const [goal, setGoal] = useState("");
  const [generatedPost, setGeneratedPost] = useState("");
  const [validated, setValidated] = useState(false);
  const [published, setPublished] = useState(false);

  const canGenerate = context.trim().length > 10 && goal.trim().length > 10;

  const previewHashtags = useMemo(() => {
    return ["#Industrie", "#Innovation", "#Automatisation", "#NewIngenia"];
  }, []);

  function generatePost() {
    const draft = [
      "Nouvelle etape pour notre equipe 🚀",
      "",
      `Contexte: ${context.trim()}`,
      "",
      `Objectif du post: ${goal.trim()}`,
      "",
      "Notre equipe accompagne les industriels avec une approche pragmatique: audit, proposition cible et execution rapide.",
      "",
      "Si vous voulez accelerer un projet similaire, ecrivez-nous en message prive.",
      "",
      previewHashtags.join(" "),
    ].join("\n");
    setGeneratedPost(draft);
    setValidated(false);
    setPublished(false);
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Social selling</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">LinkedIn entreprise</h1>
        <p className="ni-page-lead mt-2">
          Remplissez le brief : l&apos;IA propose un brouillon aligne ton NI (B2B, sans jargon vide). Validez, puis simulez la
          publication sur la page entreprise — aucune API LinkedIn dans cette maquette.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card className="rounded-sm border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Brief de publication</CardTitle>
            <p className="text-xs text-muted-foreground">
              Conseil demo : citez un client, un livrable concret et l&apos;angle (salon, etude de cas, produit).
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label>Fichier media (optionnel)</Label>
              <Input
                placeholder="Ex. : livraison-postes-omega.jpg"
                value={mediaName}
                onChange={(e) => setMediaName(e.target.value)}
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Indiquez un nom de fichier : en demo, seul le libelle est conserve (pas d&apos;upload reel).
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Contexte metier</Label>
              <Textarea
                rows={4}
                placeholder="Ex. : livraison de 3 postes NI'One ESD chez Cartier, integration en fin de ligne, delai tenu."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Objectif du post</Label>
              <Textarea
                rows={3}
                placeholder="Ex. : annoncer notre presence SIAMS + inviter les partenaires a prendre rendez-vous sur le stand."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            <Button disabled={!canGenerate} onClick={generatePost} className="w-full rounded-sm">
              Generer le brouillon avec l&apos;IA
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base tracking-tight">Brouillon genere</CardTitle>
              {generatedPost ? (
                <Badge className="rounded-sm border border-border bg-muted text-muted-foreground">
                  Brouillon pret
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Relisez, coupez les phrases trop longues, puis validez. Les hashtags restent modifiables jusqu&apos;a la publication
              simulee.
            </p>
            <Textarea
              rows={14}
              placeholder="Le texte propose par l&apos;IA apparait ici. Vous pouvez l&apos;editer librement."
              value={generatedPost}
              onChange={(e) => setGeneratedPost(e.target.value)}
            />

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                disabled={!generatedPost.trim()}
                onClick={() => {
                  setValidated(true);
                  setPublished(false);
                }}
                className="rounded-sm"
              >
                Marquer comme valide
              </Button>
              <Button
                disabled={!validated}
                onClick={() => setPublished(true)}
                className="rounded-sm"
              >
                Publier sur la page (demo)
              </Button>
            </div>

            {published ? (
              <p className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Publication simulee : en production, cette etape appellerait l&apos;API LinkedIn avec vos droits entreprise.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

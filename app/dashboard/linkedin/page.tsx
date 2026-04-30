"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LinkedinPage() {
  const [mediaName, setMediaName] = useState("poste-ni-one-atelier-horloger.jpg");
  const [context, setContext] = useState("Livraison de 3 postes NI'One ESD pour une ligne d'assemblage horlogère, avec éclairage intégré et rangements outils.");
  const [goal, setGoal] = useState("Valoriser une solution concrète pour les environnements de précision et inviter les industriels à échanger avec New Ingenia.");
  const [generatedPost, setGeneratedPost] = useState("");
  const [validated, setValidated] = useState(false);
  const [published, setPublished] = useState(false);

  const canGenerate = context.trim().length > 10 && goal.trim().length > 10;

  const previewHashtags = useMemo(() => {
    return ["#Industrie", "#Innovation", "#Automatisation", "#NewIngenia"];
  }, []);

  function generatePost() {
    const draft = [
      "Un nouvel exemple concret de solution industrielle New Ingenia.",
      "",
      `Contexte: ${context.trim()}`,
      "",
      `Objectif du post: ${goal.trim()}`,
      "",
      "Notre équipe accompagne les industriels avec des postes de travail adaptés aux contraintes de précision, d'ergonomie et de production.",
      "",
      "Pour échanger sur un besoin similaire, notre équipe se tient à disposition.",
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
        <p className="ni-label">Communication</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Communication LinkedIn</h1>
        <p className="ni-page-lead mt-2">
          Transformez une idée, un projet ou une photo en brouillon de publication professionnelle.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Brief de publication</CardTitle>
            <p className="text-xs text-muted-foreground">
              Exemple : publication sur un poste NI&apos;One livré pour un environnement de précision.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <Label>Fichier media (optionnel)</Label>
              <Input
                placeholder="Ex. : poste-ni-one-atelier-horloger.jpg"
                value={mediaName}
                onChange={(e) => setMediaName(e.target.value)}
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Indiquez le visuel à utiliser ou à préparer pour accompagner la publication.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Contexte métier</Label>
              <Textarea
                rows={4}
                placeholder="Ex. : livraison de 3 postes NI'One ESD pour une ligne horlogère, délai tenu."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Objectif du post</Label>
              <Textarea
                rows={3}
                placeholder="Ex. : montrer une réalisation concrète et inviter les industriels à échanger."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            <Button disabled={!canGenerate} onClick={generatePost} className="w-full rounded-xl">
              Préparer le brouillon
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base tracking-tight">Brouillon genere</CardTitle>
              {generatedPost ? (
                <Badge className="rounded-xl border border-border bg-muted text-muted-foreground">
                  Brouillon prêt
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-muted-foreground">
              Relisez, coupez les phrases trop longues, puis validez. Les hashtags restent modifiables.
            </p>
            <Textarea
              rows={14}
              placeholder="Le brouillon de publication apparait ici. Vous pouvez l'editer librement."
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
                className="rounded-xl"
              >
                Marquer comme valide
              </Button>
              <Button
                disabled={!validated}
                onClick={() => setPublished(true)}
                className="rounded-xl"
              >
                Marquer comme prêt à publier
              </Button>
            </div>

            {published ? (
              <p className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                Publication prête : l&apos;équipe peut encore relire le texte, le visuel et les noms cités.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

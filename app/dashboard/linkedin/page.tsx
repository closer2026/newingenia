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
    <div className="space-y-6">
      <div>
        <p className="ni-label">Social selling</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Linkedin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Simule une connexion Linkedin entreprise: l&apos;agent IA redige le post, tu valides, puis tu publies.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <Card className="rounded-sm border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">Brief de publication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label>Media (photo/video)</Label>
              <Input
                placeholder="Ex: atelier-client-omega.mp4"
                value={mediaName}
                onChange={(e) => setMediaName(e.target.value)}
              />
              <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                Piece jointe simulee frontend
              </p>
            </div>

            <div className="space-y-1.5">
              <Label>Contexte</Label>
              <Textarea
                rows={4}
                placeholder="Explique la situation, le projet et ce qui a ete realise."
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label>But du post</Label>
              <Textarea
                rows={3}
                placeholder="Ex: generer des leads PME industrielles en Suisse romande."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>

            <Button disabled={!canGenerate} onClick={generatePost} className="w-full rounded-sm">
              Generer le post IA
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-border bg-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base tracking-tight">Proposition IA</CardTitle>
              {generatedPost ? (
                <Badge className="rounded-sm border border-border bg-muted text-muted-foreground">
                  Brouillon pret
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              rows={14}
              placeholder="Le post genere apparaitra ici..."
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
                Valider
              </Button>
              <Button
                disabled={!validated}
                onClick={() => setPublished(true)}
                className="rounded-sm"
              >
                Valider et publier
              </Button>
            </div>

            {published ? (
              <p className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                Post publie sur la page Linkedin entreprise (simulation frontend).
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

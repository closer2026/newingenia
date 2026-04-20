"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type IncomingRequest = {
  id: string;
  contact: string;
  company: string;
  message: string;
};

const requests: IncomingRequest[] = [
  {
    id: "REQ-1209",
    contact: "Claire Martin",
    company: "Atelier Delta",
    message:
      "Bonjour, nous voulons moderniser notre ligne de production et connecter nos equipements a un suivi centralise. Pouvez-vous proposer une approche et un budget indicatif ?",
  },
  {
    id: "REQ-1210",
    contact: "Julien Favre",
    company: "MecaPro SA",
    message:
      "Nous cherchons un accompagnement pour fiabiliser nos process qualite et accelerer nos delais de mise en service.",
  },
];

export default function DemandesEntrantesPage() {
  const [selectedId, setSelectedId] = useState(requests[0].id);
  const [reformulation, setReformulation] = useState("");
  const [responseContext, setResponseContext] = useState("");
  const [responseDraft, setResponseDraft] = useState("");
  const [followUpDraft, setFollowUpDraft] = useState("");
  const [sent, setSent] = useState(false);

  const selected = useMemo(
    () => requests.find((r) => r.id === selectedId) ?? requests[0],
    [selectedId]
  );

  function generateReformulation() {
    const text = [
      `Demande ${selected.id} - ${selected.company}`,
      "",
      "Le prospect souhaite cadrer un projet de transformation operationnelle avec:",
      "- une phase d'audit terrain",
      "- une proposition de solution pragmatique",
      "- une estimation budget et planning.",
      "",
      "Niveau d'urgence estime: eleve (demande explicite de cadrage rapide).",
    ].join("\n");
    setReformulation(text);
    setSent(false);
  }

  function generateResponse() {
    const response = [
      `Bonjour ${selected.contact},`,
      "",
      "Merci pour votre message et pour la confiance accordee.",
      "Nous pouvons vous proposer un cadrage en 3 etapes: diagnostic, recommandation et plan d'execution.",
      "",
      `Contexte integre: ${responseContext.trim() || "Aucun contexte supplementaire fourni."}`,
      "",
      "Si cela vous convient, nous pouvons organiser un point de 30 minutes cette semaine pour aligner priorites et contraintes.",
      "",
      "Bien cordialement,",
      "Equipe New Ingenia",
    ].join("\n");

    const followUp = [
      `Bonjour ${selected.contact},`,
      "",
      "Je me permets une courte relance suite a notre proposition de cadrage.",
      "Souhaitez-vous que nous reservions un créneau pour lancer l'analyse initiale ?",
      "",
      "Bien a vous,",
      "Equipe New Ingenia",
    ].join("\n");

    setResponseDraft(response);
    setFollowUpDraft(followUp);
    setSent(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="ni-label">Leads formulaire</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111]">Demandes entrantes</h1>
        <p className="mt-2 text-sm text-[#666666]">
          Les nouvelles demandes projet sont captees, reformulees par l&apos;IA, puis traitees avec reponse et relance.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="rounded-sm border-[#d8d8d8]">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">Nouvelles demandes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {requests.map((req) => (
              <button
                key={req.id}
                onClick={() => {
                  setSelectedId(req.id);
                  setSent(false);
                }}
                className={`w-full rounded-sm border px-3 py-2 text-left text-xs transition ${
                  req.id === selectedId
                    ? "border-[#202020] bg-[#202020] text-white"
                    : "border-[#d8d8d8] bg-white text-[#333333] hover:bg-[#f5f5f5]"
                }`}
              >
                <p className="font-semibold">{req.company}</p>
                <p className="mt-1 opacity-80">{req.id}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-2 rounded-sm border-[#d8d8d8]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base tracking-tight">Traitement IA - {selected.company}</CardTitle>
              <Badge className="rounded-sm border border-zinc-200 bg-white text-[#555555]">{selected.id}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Message client</Label>
              <Textarea rows={4} value={selected.message} readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Button onClick={generateReformulation} variant="outline" className="w-full rounded-sm">
                  Reformuler la demande
                </Button>
                <Textarea
                  rows={8}
                  placeholder="La reformulation IA apparait ici..."
                  value={reformulation}
                  onChange={(e) => setReformulation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Contexte pour la reponse</Label>
                <Textarea
                  rows={4}
                  placeholder="Ajoute contraintes, angle commercial, proposition..."
                  value={responseContext}
                  onChange={(e) => setResponseContext(e.target.value)}
                />
                <Button onClick={generateResponse} className="w-full rounded-sm bg-[#1f1f1f] hover:bg-black">
                  Generer reponse + relance
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Reponse proposee</Label>
                <Textarea
                  rows={8}
                  value={responseDraft}
                  onChange={(e) => setResponseDraft(e.target.value)}
                  placeholder="La reponse IA apparait ici..."
                />
              </div>
              <div>
                <Label>Relance proposee</Label>
                <Textarea
                  rows={8}
                  value={followUpDraft}
                  onChange={(e) => setFollowUpDraft(e.target.value)}
                  placeholder="La relance IA apparait ici..."
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                disabled={!responseDraft.trim()}
                onClick={() => setSent(true)}
                className="rounded-sm bg-[#1f1f1f] hover:bg-black"
              >
                Envoyer au client
              </Button>
              {sent ? (
                <p className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                  Reponse envoyee au client (simulation frontend).
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

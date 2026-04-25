"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { upsertDemoFlow } from "@/lib/demo-flow";

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
  const [flowStarted, setFlowStarted] = useState(false);

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

  function startOfferFlow() {
    upsertDemoFlow({
      leadId: selected.id,
      company: selected.company,
      contact: selected.contact,
      message: selected.message,
      responseDraft,
      followUpDraft,
      stage: "offer",
    });
    setFlowStarted(true);
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Leads formulaire</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Demandes entrantes</h1>
        <p className="ni-page-lead mt-2">
          Selectionnez un lead a gauche : a droite, l&apos;IA propose reformulation, email de reponse et relance J+3. Ajustez le texte
          puis simulez l&apos;envoi — ideal pour montrer le gain de temps commercial.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <Card className="rounded-sm border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Liste des demandes</CardTitle>
            <p className="text-xs text-muted-foreground">Cliquez une ligne pour charger sa fiche detaillee.</p>
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
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                <p className="font-semibold">{req.company}</p>
                <p className="mt-1 opacity-80">{req.id}</p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-2 rounded-sm border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base tracking-tight">Fiche demande · {selected.company}</CardTitle>
              <Badge className="rounded-sm border border-border bg-muted text-muted-foreground">{selected.id}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-4 gap-2">
              <div className="rounded-sm border border-border bg-muted/30 p-2 text-xs">
                <p className="ni-label">Statut</p>
                <p className="mt-1 font-medium text-foreground">Nouveau</p>
              </div>
              <div className="rounded-sm border border-border bg-muted/30 p-2 text-xs">
                <p className="ni-label">Score IA</p>
                <p className="mt-1 font-medium text-foreground">7 / 10</p>
              </div>
              <div className="rounded-sm border border-border bg-muted/30 p-2 text-xs">
                <p className="ni-label">Urgence</p>
                <p className="mt-1 font-medium text-foreground">Normale</p>
              </div>
              <div className="rounded-2xl border border-red-200 bg-red-50 p-2 text-xs dark:border-red-300/35 dark:bg-red-500/14">
                <p className="ni-label text-red-700 dark:text-red-200">A traiter</p>
                <p className="mt-1 font-medium text-red-700 dark:text-red-100">+4h</p>
              </div>
            </div>

            <div>
              <Label>Message client</Label>
              <Textarea rows={4} value={selected.message} readOnly />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Button onClick={generateReformulation} variant="outline" className="w-full rounded-sm">
                  Generer la reformulation IA
                </Button>
                <Textarea
                  rows={8}
                  placeholder="La reformulation IA apparait ici..."
                  value={reformulation}
                  onChange={(e) => setReformulation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Consignes pour l&apos;email</Label>
                <Textarea
                  rows={4}
                  placeholder="Ex. : proposer un call 30 min jeudi, mentionner delai 6 semaines, rappeler garantie 2 ans."
                  value={responseContext}
                  onChange={(e) => setResponseContext(e.target.value)}
                />
                <Button onClick={generateResponse} className="w-full rounded-sm">
                  Generer reponse + relance J+3
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
                className="rounded-sm"
              >
                Simuler l&apos;envoi au client
              </Button>
              <Link
                href="/dashboard/redaction-offres?from=lead"
                onClick={startOfferFlow}
                className="rounded-2xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-muted"
              >
                Créer l&apos;offre depuis ce lead
              </Link>
              {sent ? (
                <p className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                  Envoi simule : le commercial verrait ici la confirmation d&apos;envoi et l&apos;horodatage.
                </p>
              ) : null}
              {flowStarted ? (
                <p className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                  Parcours demo initialisé : l&apos;offre reprend ce lead.
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

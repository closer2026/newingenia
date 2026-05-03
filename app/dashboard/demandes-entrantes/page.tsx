"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Check, FileText, Mail, PenLine, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { upsertDemoFlow } from "@/lib/demo-flow";
import { cn } from "@/lib/utils";

type ClientEmailMeta = {
  fromLine: string;
  toLine: string;
  ccLine?: string;
  subject: string;
  dateLine: string;
  signature: string;
};

type IncomingRequest = {
  id: string;
  contact: string;
  company: string;
  /** Corps du message (sans signature), utilisé pour les brouillons / flux démo */
  message: string;
  email: ClientEmailMeta;
};

const requests: IncomingRequest[] = [
  {
    id: "REQ-1209",
    contact: "Claire Martin",
    company: "Manufacture Horlogere Delta",
    message: [
      "Bonjour,",
      "",
      "Nous recherchons une solution pour équiper notre nouvelle ligne d’assemblage horloger. Il nous faudrait 3 postes de travail modulaires, avec une surface ESD, un éclairage intégré et des rangements pour outillage et petites pièces.",
      "",
      "Pourriez-vous nous proposer une configuration type (gammes NI'One ou équivalent) ainsi qu’une fourchette budgétaire indicative, sachant que nous visons une mise en service au 3e trimestre 2026 ?",
      "",
      "Je reste disponible pour un court échange téléphonique si nécessaire.",
      "",
      "Merci d’avance pour votre retour.",
    ].join("\n"),
    email: {
      fromLine: "Claire Martin <c.martin@manufacture-delta.ch>",
      toLine: "Commercial New Ingenia <commercial@newingenia.ch>",
      ccLine: "Achats MHD <achats@manufacture-delta.ch>",
      subject: "Demande de proposition – postes modulaires ligne horlogère",
      dateLine: "30 avril 2026 à 09:14 (UTC+2 · heure de Paris)",
      signature: [
        "Cordialement,",
        "",
        "Claire Martin",
        "Directrice industrielle",
        "",
        "Manufacture Horlogère Delta SA",
        "Route de l’Abbaye 14 · 2300 La Chaux-de-Fonds",
        "T +41 32 555 01 20  ·  M +41 79 555 01 21",
        "",
        "c.martin@manufacture-delta.ch",
        "https://www.manufacture-delta.ch",
      ].join("\n"),
    },
  },
  {
    id: "REQ-1210",
    contact: "Julien Favre",
    company: "MecaPro SA",
    message: [
      "Bonjour,",
      "",
      "Suite à notre échange téléphonique de la semaine dernière, nous souhaitons creuser un accompagnement pour fiabiliser nos process qualité et réduire les délais de mise en service sur deux cellules d’usinage.",
      "",
      "Pouvez-vous nous confirmer votre disponibilité pour un diagnostic d’une demi-journée et m’indiquer l’interlocuteur métier côté New Ingenia ?",
      "",
      "Merci et bonne journée,",
    ].join("\n"),
    email: {
      fromLine: "Julien Favre <j.favre@mecapro.ch>",
      toLine: "Projets New Ingenia <projets@newingenia.ch>",
      subject: "Accompagnement qualité / mise en service – MecaPro SA",
      dateLine: "2 mai 2026 à 16:42 (UTC+2 · heure de Paris)",
      signature: [
        "Bien à vous,",
        "",
        "Julien Favre",
        "Responsable méthodes & industrialisation",
        "",
        "MecaPro SA",
        "Zone industrielle Nord · 1400 Yverdon-les-Bains",
        "T +41 24 555 88 00",
        "",
        "j.favre@mecapro.ch",
        "https://www.mecapro.ch",
      ].join("\n"),
    },
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

  useEffect(() => {
    setReformulation("");
    setResponseContext("");
    setResponseDraft("");
    setFollowUpDraft("");
    setSent(false);
    setFlowStarted(false);
  }, [selectedId]);

  const workflowSteps = useMemo(() => {
    const hasSummary = reformulation.trim().length > 0;
    const hasDrafts =
      responseDraft.trim().length > 0 && followUpDraft.trim().length > 0;
    return [
      {
        id: "read",
        title: "Demande reçue",
        caption: "Lecture du message",
        done: true,
      },
      {
        id: "summary",
        title: "Besoin structuré",
        caption: "Synthèse interne",
        done: hasSummary,
      },
      {
        id: "drafts",
        title: "Brouillons",
        caption: "Réponse & relance",
        done: hasDrafts,
      },
      {
        id: "ship",
        title: "Prochaine action",
        caption: "Envoi ou offre",
        done: sent,
      },
    ] as const;
  }, [reformulation, responseDraft, followUpDraft, sent]);

  const activeStepIndex = useMemo(() => {
    const i = workflowSteps.findIndex((s) => !s.done);
    return i === -1 ? workflowSteps.length - 1 : i;
  }, [workflowSteps]);

  function generateReformulation() {
    const text =
      selected.id === "REQ-1210"
        ? [
            `Demande ${selected.id} - ${selected.company}`,
            "",
            "Le client souhaite un accompagnement pour :",
            "- fiabiliser les process qualité sur deux cellules d'usinage",
            "- réduire les délais de mise en service.",
            "",
            "À clarifier : périmètre diagnostic, durée, interlocuteur métier côté prestataire, contraintes planning.",
          ].join("\n")
        : [
            `Demande ${selected.id} - ${selected.company}`,
            "",
            "Le client souhaite préparer un projet de postes de travail modulaires avec :",
            "- 3 postes pour une ligne horlogère",
            "- surface ESD",
            "- éclairage intégré",
            "- rangements outils.",
            "",
            "Informations à vérifier : dimensions, charge maximale, délai souhaité et contraintes d'installation.",
          ].join("\n");
    setReformulation(text);
    setSent(false);
  }

  function generateResponse() {
    const isMeca = selected.id === "REQ-1210";
    const response = [
      `Bonjour ${selected.contact},`,
      "",
      "Merci pour votre message et pour la confiance accordée.",
      isMeca
        ? "Nous pouvons vous proposer un premier créneau de diagnostic et vous confirmer l’interlocuteur projet d’ici 24 h."
        : "Nous pouvons vous proposer une première configuration NI'One avec surface ESD, éclairage et rangements adaptés à votre ligne.",
      "",
      `Contexte intégré : ${responseContext.trim() || "Aucun contexte supplémentaire fourni."}`,
      "",
      isMeca
        ? "Souhaitez-vous que je vous envoie deux propositions de dates pour la demi-journée sur site ?"
        : "Si cela vous convient, nous pouvons organiser un point de 30 minutes cette semaine pour valider les dimensions, les charges et le délai attendu.",
      "",
      "Bien cordialement,",
      "Équipe New Ingenia",
    ].join("\n");

    const followUp = [
      `Bonjour ${selected.contact},`,
      "",
      isMeca
        ? "Je me permets une courte relance concernant l’accompagnement qualité / mise en service discuté."
        : "Je me permets une courte relance au sujet de votre besoin en postes de travail modulaires.",
      isMeca
        ? "Avez-vous pu valider un créneau pour le diagnostic ou souhaitez-vous un nouvel envoi de disponibilités ?"
        : "Souhaitez-vous que nous réservions un créneau pour valider les dimensions et préparer une première offre ?",
      "",
      "Bien à vous,",
      "Équipe New Ingenia",
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
        <p className="ni-label">Demande client</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Demandes entrantes</h1>
        <p className="ni-page-lead mt-2">
          Collez ou ouvrez une demande client. L&apos;outil résume le besoin, repère ce qu&apos;il manque et prépare la prochaine étape.
        </p>
      </div>

      <div className="rounded-[22px] border border-border/80 bg-card/90 p-4 shadow-[var(--ni-shadow-soft)] dark:border-white/10 dark:bg-[#10161e]/90">
        <p className="ni-label mb-3">Parcours de traitement</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map((step, index) => {
            const isCurrent = index === activeStepIndex;
            return (
              <div
                key={step.id}
                className={cn(
                  "relative flex gap-3 rounded-2xl border px-3 py-3 transition-colors",
                  step.done &&
                    "border-primary/35 bg-primary/[0.06] dark:border-primary/40 dark:bg-primary/10",
                  !step.done &&
                    !isCurrent &&
                    "border-border/70 bg-muted/25 dark:border-white/10",
                  isCurrent &&
                    !step.done &&
                    "border-primary/50 bg-background shadow-sm ring-1 ring-primary/20 dark:bg-[#121821]"
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                    step.done &&
                      "border-primary bg-primary text-primary-foreground shadow-sm",
                    !step.done &&
                      isCurrent &&
                      "border-primary text-primary",
                    !step.done &&
                      !isCurrent &&
                      "border-border text-muted-foreground dark:border-white/15"
                  )}
                >
                  {step.done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : index + 1}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Étape {index + 1}
                  </p>
                  <p className="mt-0.5 font-semibold leading-snug text-foreground">{step.title}</p>
                  <p className="mt-1 text-xs leading-snug text-muted-foreground">{step.caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(260px,300px)_1fr] lg:items-start">
        <Card className="sticky top-24 rounded-[22px] border border-border/80 bg-card shadow-[var(--ni-shadow-soft)] dark:border-white/10 lg:top-28">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold tracking-tight text-[var(--ni-text)]">
              Demandes à traiter
            </CardTitle>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Sélectionnez une entrée pour afficher le message et préparer la réponse.
            </p>
          </CardHeader>
          <CardContent className="space-y-2">
            {requests.map((req) => (
              <button
                key={req.id}
                type="button"
                onClick={() => setSelectedId(req.id)}
                className={`w-full rounded-xl border px-3.5 py-3 text-left text-xs transition ${
                  req.id === selectedId
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-card text-foreground hover:border-border/80 hover:bg-muted/50"
                }`}
              >
                <p className="font-semibold leading-snug">{req.company}</p>
                <p
                  className={`mt-1 text-[11px] leading-snug ${
                    req.id === selectedId ? "text-primary-foreground/90" : "text-muted-foreground"
                  }`}
                >
                  {req.contact}
                </p>
                <p
                  className={`mt-1.5 font-mono text-[10px] uppercase tracking-wider ${
                    req.id === selectedId ? "text-primary-foreground/85" : "text-muted-foreground"
                  }`}
                >
                  {req.id}
                </p>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[22px] border border-border/80 bg-card shadow-[0_4px_24px_-12px_rgba(45,55,65,0.12)] dark:border-white/10 dark:bg-[#10161e]/90">
          <CardHeader className="border-b border-border/60 pb-4 dark:border-white/10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold tracking-tight text-[var(--ni-text)]">
                  Fiche demande
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">{selected.company}</p>
              </div>
              <Badge className="w-fit shrink-0 rounded-xl border border-border/80 bg-muted/60 px-2.5 py-1 font-mono text-xs text-foreground dark:border-white/10">
                {selected.id}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <div>
              <p className="ni-label mb-3">Synthèse dossier</p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                <div className="rounded-xl border border-border/70 bg-muted/40 p-3 text-xs dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="ni-label">Statut</p>
                  <p className="mt-1.5 font-semibold text-foreground">Nouveau</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-muted/40 p-3 text-xs dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="ni-label">Besoin clair</p>
                  <p className="mt-1.5 font-semibold text-foreground">À compléter</p>
                </div>
                <div className="rounded-xl border border-border/70 bg-muted/40 p-3 text-xs dark:border-white/10 dark:bg-white/[0.04]">
                  <p className="ni-label">Urgence</p>
                  <p className="mt-1.5 font-semibold text-foreground">Normale</p>
                </div>
                <div className="rounded-xl border border-red-200/90 bg-red-50/95 p-3 text-xs dark:border-red-400/30 dark:bg-red-500/12">
                  <p className="ni-label text-red-800 dark:text-red-200">À traiter</p>
                  <p className="mt-1.5 font-semibold tabular-nums text-red-800 dark:text-red-100">+4 h</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/70 bg-muted/[0.35] p-4 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background shadow-sm dark:bg-[#0f141a]">
                  <Mail className="h-4 w-4 text-primary" aria-hidden />
                </div>
                <div>
                  <Label className="text-[var(--ni-text)]">Message reçu</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    E-mail tel que reçu (en-têtes, corps et signature).
                  </p>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm dark:border-white/10 dark:bg-[#121821]/85">
                <div className="border-b border-border/70 bg-muted/45 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]">
                  <dl className="space-y-2 text-xs">
                    <div className="grid gap-1 sm:grid-cols-[4rem_1fr] sm:items-baseline">
                      <dt className="font-semibold uppercase tracking-wide text-muted-foreground">De</dt>
                      <dd className="break-words text-foreground">{selected.email.fromLine}</dd>
                    </div>
                    <div className="grid gap-1 sm:grid-cols-[4rem_1fr] sm:items-baseline">
                      <dt className="font-semibold uppercase tracking-wide text-muted-foreground">À</dt>
                      <dd className="break-words text-foreground">{selected.email.toLine}</dd>
                    </div>
                    {selected.email.ccLine ? (
                      <div className="grid gap-1 sm:grid-cols-[4rem_1fr] sm:items-baseline">
                        <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Cc</dt>
                        <dd className="break-words text-foreground">{selected.email.ccLine}</dd>
                      </div>
                    ) : null}
                    <div className="grid gap-1 sm:grid-cols-[4rem_1fr] sm:items-baseline">
                      <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Objet</dt>
                      <dd className="break-words font-medium text-foreground">{selected.email.subject}</dd>
                    </div>
                    <div className="grid gap-1 sm:grid-cols-[4rem_1fr] sm:items-baseline">
                      <dt className="font-semibold uppercase tracking-wide text-muted-foreground">Date</dt>
                      <dd className="text-muted-foreground">{selected.email.dateLine}</dd>
                    </div>
                  </dl>
                </div>
                <div className="max-h-[min(320px,48vh)] overflow-y-auto border-b border-border/50 bg-white px-4 py-4 text-sm leading-relaxed whitespace-pre-wrap text-foreground dark:border-white/10 dark:bg-[#0f141a]/90">
                  {selected.message}
                </div>
                <div className="bg-muted/30 px-4 py-4 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap dark:bg-white/[0.03]">
                  {selected.email.signature}
                </div>
              </div>
            </div>

            <Separator className="bg-border/70 dark:bg-white/10" />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 dark:bg-primary/15">
                  <Sparkles className="h-4 w-4 text-primary" aria-hidden />
                </div>
                <div>
                  <p className="ni-label">Traitement assisté</p>
                  <p className="text-xs text-muted-foreground">
                    Enchaînez les étapes : synthèse interne, consignes, puis brouillons à relire.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <section
                  className={cn(
                    "rounded-2xl border bg-card p-4 shadow-sm transition-shadow dark:bg-[#121821]/90",
                    activeStepIndex === 1 && !workflowSteps[1]?.done
                      ? "border-primary/40 ring-1 ring-primary/15"
                      : "border-border/70 dark:border-white/10"
                  )}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted dark:bg-white/[0.06]">
                        <FileText className="h-4 w-4 text-foreground/80" aria-hidden />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Étape 1</p>
                        <Label className="text-base font-semibold text-foreground">Synthèse du besoin</Label>
                        <p className="mt-1 max-w-prose text-xs text-muted-foreground">
                          Notes internes avant contact client : attendus, trous d&apos;information, prochaine question clé.
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={generateReformulation}
                      variant="outline"
                      className="w-full shrink-0 rounded-xl sm:w-auto"
                    >
                      Résumer le besoin
                    </Button>
                  </div>
                  <Textarea
                    className="mt-4 min-h-[176px] rounded-xl border-border/80 bg-background text-sm dark:border-white/10"
                    placeholder="Le résumé du besoin apparaît ici…"
                    value={reformulation}
                    onChange={(e) => setReformulation(e.target.value)}
                  />
                </section>

                <section
                  className={cn(
                    "rounded-2xl border bg-card p-4 shadow-sm dark:bg-[#121821]/90",
                    activeStepIndex === 2 && !workflowSteps[2]?.done && workflowSteps[1]?.done
                      ? "border-primary/40 ring-1 ring-primary/15"
                      : "border-border/70 dark:border-white/10"
                  )}
                >
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted dark:bg-white/[0.06]">
                      <PenLine className="h-4 w-4 text-foreground/80" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1 space-y-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Étape 2</p>
                        <Label className="text-base font-semibold text-foreground">Consignes pour l&apos;email</Label>
                        <p className="mt-1 max-w-prose text-xs text-muted-foreground">
                          Ce que la réponse doit traiter (technique, délais, ton, pièces jointes). Utilisé pour générer les
                          brouillons.
                        </p>
                      </div>
                      <Textarea
                        className="min-h-[100px] rounded-xl border-border/80 bg-background dark:border-white/10"
                        placeholder="Ex. : demander dimensions utiles, charge max. table, délai cible, contraintes d'installation."
                        value={responseContext}
                        onChange={(e) => setResponseContext(e.target.value)}
                      />
                      <Button
                        type="button"
                        onClick={generateResponse}
                        className="w-full rounded-xl sm:w-auto sm:min-w-[260px]"
                      >
                        Préparer réponse + relance
                      </Button>
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-border/70 bg-card p-4 pb-3 shadow-sm dark:border-white/10 dark:bg-[#121821]/90">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-primary">Étape 3</p>
                      <Label className="text-base font-semibold text-foreground">Brouillons à valider</Label>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Un onglet par message — plus lisible que deux grands blocs empilés.
                      </p>
                    </div>
                  </div>
                  <Tabs key={selectedId} defaultValue="response" className="w-full">
                    <TabsList className="mb-3 h-9 w-full justify-start gap-1 rounded-xl bg-muted/80 p-1 sm:w-auto dark:bg-white/[0.06]">
                      <TabsTrigger value="response" className="rounded-lg px-4">
                        Réponse client
                      </TabsTrigger>
                      <TabsTrigger value="followup" className="rounded-lg px-4">
                        Relance
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="response" className="mt-0 space-y-2">
                      <Textarea
                        className="min-h-[260px] rounded-xl border-border/70 bg-background text-sm dark:border-white/10"
                        value={responseDraft}
                        onChange={(e) => setResponseDraft(e.target.value)}
                        placeholder="Le brouillon de réponse apparaît ici…"
                      />
                    </TabsContent>
                    <TabsContent value="followup" className="mt-0 space-y-2">
                      <Textarea
                        className="min-h-[260px] rounded-xl border-border/70 bg-background text-sm dark:border-white/10"
                        value={followUpDraft}
                        onChange={(e) => setFollowUpDraft(e.target.value)}
                        placeholder="Le brouillon de relance apparaît ici…"
                      />
                    </TabsContent>
                  </Tabs>
                </section>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-muted/30 p-4 dark:border-white/10 dark:bg-white/[0.04] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  type="button"
                  disabled={!responseDraft.trim()}
                  onClick={() => setSent(true)}
                  className="rounded-xl"
                >
                  Marquer comme prêt à envoyer
                </Button>
                <Link
                  href="/dashboard/redaction-offres?from=lead"
                  onClick={startOfferFlow}
                  className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2.5 text-center text-xs font-semibold text-foreground transition hover:bg-background dark:border-white/10"
                >
                  Créer l&apos;offre depuis cette demande
                </Link>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                {sent ? (
                  <p className="font-medium text-emerald-700 dark:text-emerald-300">
                    Message prêt : le commercial peut encore relire et ajuster avant envoi.
                  </p>
                ) : null}
                {flowStarted ? (
                  <p className="font-medium text-foreground">Offre préparée : la page suivante reprend cette demande.</p>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

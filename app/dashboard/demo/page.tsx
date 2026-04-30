"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Inbox, Mail, Mic, Sparkles, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoFlowStatus } from "@/components/layout/DemoFlowStatus";
import { HeroPanel } from "@/components/layout/HeroPanel";
import { ModularSketch } from "@/components/decorative/technical-decorations";
import { readDemoFlow, type DemoFlow, type DemoFlowStage } from "@/lib/demo-flow";

const journey = [
  {
    step: "01",
    title: "Une demande client arrive",
    module: "Demandes entrantes",
    href: "/dashboard/demandes-entrantes",
    icon: Inbox,
    pitch: "L'outil lit le message, résume le besoin et repère les informations manquantes.",
    output: "Demande résumée, questions à poser, réponse proposée.",
    result: "La demande devient plus claire avant de préparer une réponse ou une offre.",
  },
  {
    step: "02",
    title: "L'offre est structurée",
    module: "Offres clients",
    href: "/dashboard/redaction-offres",
    icon: FileText,
    pitch: "Le brief devient une offre claire, lisible et plus rapide à valider.",
    output: "Brouillon d'offre + aperçu PDF + arguments commerciaux.",
    result: "L'équipe part d'une base structurée au lieu de repartir d'une page blanche.",
  },
  {
    step: "03",
    title: "La relation est entretenue",
    module: "Emails clients",
    href: "/dashboard/redaction-emails",
    icon: Mail,
    pitch: "Les emails de suivi gardent le bon ton et transforment les intentions en prochaines étapes.",
    output: "Email client prêt à relire, adapter et envoyer.",
    result: "Le message client reste clair, professionnel et prêt à être ajusté.",
  },
  {
    step: "04",
    title: "La réunion devient action",
    module: "Réunion",
    href: "/dashboard/reunion-ia",
    icon: Mic,
    pitch: "Le compte-rendu extrait les décisions et reconnecte les actions à la file des tâches.",
    output: "Résumé, décisions, tâches et email de compte-rendu.",
    result: "Les décisions et actions importantes ne restent pas perdues dans des notes.",
  },
  {
    step: "05",
    title: "Les livrables deviennent visuels",
    module: "Studio 3D",
    href: "/dashboard/studio-visuel",
    icon: Sparkles,
    pitch: "Le client visualise plus vite le produit, ce qui rend la proposition plus concrète.",
    output: "Viewer 3D + fiche produit + support de présentation.",
    result: "Le client comprend plus facilement l'idée proposée.",
  },
] as const;

const readingSteps = [
  "Lire le problème de départ.",
  "Ouvrir la page liée.",
  "Observer le livrable préparé.",
  "Vérifier ce que l'équipe garde ou ajuste.",
] as const;

const proofPoints = [
  "Moins de ressaisie entre les modules",
  "Des livrables visibles à chaque étape",
  "Une histoire facile à présenter",
  "Un support clair pour valider la pertinence de chaque outil",
] as const;

const stageRank: Record<DemoFlowStage, number> = {
  lead: 0,
  offer: 1,
  email: 2,
  task: 3,
};

export default function DemoPage() {
  const [flow, setFlow] = useState<DemoFlow | null>(null);

  useEffect(() => {
    setFlow(readDemoFlow());
  }, []);

  const currentIndex = flow ? Math.min(stageRank[flow.stage] + 1, journey.length - 1) : 0;
  const currentStep = journey[currentIndex];

  return (
    <div className="space-y-8">
      <DemoFlowStatus flow={flow} onReset={() => setFlow(null)} />
      <section className="ni-surface relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-6 right-0 w-40 opacity-50">
          <ModularSketch className="h-24 w-full" />
        </div>
        <HeroPanel
          gridClassName="grid-cols-[1.4fr_0.8fr]"
          mainSpanClass=""
          asideSpanClass=""
          eyebrow="Parcours de compréhension"
          title="Un parcours de présentation qui montre la valeur de bout en bout."
          description={
            <>
              Cette page montre comment une situation client peut passer d&apos;une demande initiale à un livrable concret.
            </>
          }
          aside={
            <>
              <p className="ni-label">Objectif</p>
              <div className="mt-5 space-y-3">
                {proofPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </>
          }
        />
      </section>

      <section className="ni-surface overflow-hidden p-0">
        <div className="border-b border-border/60 px-5 py-4 sm:px-7 sm:py-5">
          <p className="ni-label">Lecture guidée</p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            Commencer par cette étape
          </h2>
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Comment lire le parcours
          </p>
          <ol className="mt-3 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch lg:gap-2">
            {readingSteps.map((item, i) => (
              <li
                key={item}
                className="flex h-full w-full items-center justify-center rounded-lg border border-border/60 bg-background/72 px-2.5 py-2 sm:px-3 dark:bg-background/40"
              >
                <div className="flex max-w-full items-center justify-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-bold tabular-nums text-primary-foreground">
                    {i + 1}
                  </span>
                  <span className="max-w-[12.5rem] text-balance text-center text-xs leading-5 text-muted-foreground">
                    {item}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-7 sm:py-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-border/70 bg-muted/45 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5 dark:bg-muted/35">
            <div className="flex min-w-0 items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-primary-foreground shadow-[0_12px_28px_-16px_rgba(45,75,110,0.45)]">
                {currentStep.step}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{currentStep.module}</p>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{currentStep.title}</p>
              </div>
            </div>
            <Link
              href={currentStep.href}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[0_18px_40px_-28px_rgba(45,75,110,0.5)] transition hover:-translate-y-0.5 hover:bg-primary/92 sm:w-auto"
            >
              Ouvrir cette étape
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background/78 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Ce que la page montre</p>
              <p className="mt-2 leading-6 text-foreground">{currentStep.pitch}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/78 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Livrable visible</p>
              <p className="mt-2 leading-6 text-foreground">{currentStep.output}</p>
            </div>
            <div className="rounded-2xl border border-border bg-background/78 p-4 text-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Résultat attendu</p>
              <p className="mt-2 leading-6 text-foreground">{currentStep.result}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5">
        {journey.map((item, index) => {
          const Icon = item.icon;
          const isDone = flow ? index <= stageRank[flow.stage] : false;
          const isCurrent = flow ? index === Math.min(stageRank[flow.stage] + 1, journey.length - 1) : index === 0;
          return (
            <Card
              key={item.step}
              className={`overflow-hidden transition ${
                isDone
                  ? "border-emerald-200/60 dark:border-emerald-500/25"
                  : isCurrent
                    ? "border-[color-mix(in_srgb,var(--ni-accent)_28%,transparent)] shadow-[var(--ni-shadow-soft)]"
                    : ""
              }`}
            >
              <CardContent className="grid grid-cols-[0.2fr_1fr_0.7fr_0.34fr] items-center gap-5 px-6 py-5">
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-semibold shadow-sm ${
                      isDone ? "bg-emerald-600 text-white" : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : item.step}
                  </span>
                  {index < journey.length - 1 ? <div className="hidden h-px flex-1 bg-border/80 xl:block" /> : null}
                </div>
                <div>
                  <Badge className="rounded-xl border border-border bg-muted/60 text-muted-foreground">
                    {isDone ? "Terminé · " : isCurrent ? "Prochaine étape · " : ""}
                    {item.module}
                  </Badge>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{item.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.pitch}</p>
                </div>
                <div className="ni-soft-panel flex items-start gap-3 p-4">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-foreground" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Livrable</p>
                    <p className="mt-2 text-sm leading-6 text-foreground">{item.output}</p>
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-[0_20px_48px_-32px_rgba(45,75,110,0.45)] transition hover:-translate-y-0.5 hover:bg-primary/92"
                >
                  Ouvrir
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-5 lg:grid-cols-3">
        {[
          {
            title: "Comprendre le chemin",
            text: "Chaque étape part d'une situation réelle : demande client, offre, email, réunion ou visuel produit.",
          },
          {
            title: "Voir le résultat",
            text: "La page indique le livrable obtenu à chaque moment : résumé, brouillon, aperçu, tâche ou support visuel.",
          },
          {
            title: "Garder le contrôle",
            text: "L'équipe garde toujours la validation finale : elle relit, ajuste et décide de la suite.",
          },
        ].map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-7 text-muted-foreground">{card.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}

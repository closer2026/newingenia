"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CircleHelp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolHelpDialog } from "@/components/layout/ToolHelpDialog";
import { useRole } from "@/contexts/RoleContext";
import { getToolHelp, type ToolHelp } from "@/lib/tool-help";
import { roleSubtitle, ROLE_LABELS } from "@/lib/roles";

const modules = [
  {
    key: "taches",
    title: "Taches",
    href: "/dashboard/taches",
    description: "File unique des prochaines actions : chaque ligne ouvre le module source (facture, demande, post, etc.).",
  },
  {
    key: "facturation",
    title: "Creation facture",
    href: "/dashboard/facturation",
    description: "Brief texte ou vocal simule, lignes HT/TVA, apercu PDF : ideal pour montrer le flux facture Omega.",
  },
  {
    key: "linkedin",
    title: "Linkedin",
    href: "/dashboard/linkedin",
    description: "Rediger un post B2B a partir d'un contexte, valider le brouillon puis simuler la publication page entreprise.",
  },
  {
    key: "demandes-entrantes",
    title: "Demandes entrantes",
    href: "/dashboard/demandes-entrantes",
    description: "Leads du site : message brut, analyse IA, reponse + relance J+3 pretes a envoyer ou a ajuster.",
  },
  {
    key: "recherche-docs",
    title: "Recherche docs",
    href: "/dashboard/recherche-docs",
    description: "Chat sur catalogues Bosch Rexroth / NI : reponse avec reference produit et extrait de page (demo conversationnelle).",
  },
  {
    key: "redaction-offres",
    title: "Redaction offres",
    href: "/dashboard/redaction-offres",
    description: "Formulaire projet + apercu PDF 3 pages : montrez une offre type poste NI'One / options ESD en quelques clics.",
  },
  {
    key: "reunion-ia",
    title: "Réunion IA",
    href: "/dashboard/reunion-ia",
    description: "Enregistrement simule, resume, decisions et liens vers taches / email de compte-rendu.",
  },
  {
    key: "redaction-emails",
    title: "Redaction emails",
    href: "/dashboard/redaction-emails",
    description: "Emails metier (offre, relance, confirmation) avec ton NI et signature predefinie.",
  },
  {
    key: "studio-visuel",
    title: "Studio 3D",
    href: "/dashboard/studio-visuel",
    description: "Viewer 3D des modeles demo (GLB) + parcours generation simulee pour illustrer Tripo / integration future.",
  },
  {
    key: "studio-marketing",
    title: "Studio marketing",
    href: "/dashboard/studio-marketing",
    description: "Visuels 2D type catalogue : brief, variantes et actions vers devis ou LinkedIn (maquette).",
  },
  {
    key: "veille",
    title: "Veille",
    href: "/dashboard/veille",
    description: "Synthese SIAMS / Bosch Rexroth / secteur : ce que la direction lit chaque lundi (contenu demo).",
  },
] as const;

export default function DashboardPage() {
  const { role } = useRole();
  const [moduleHelp, setModuleHelp] = useState<ToolHelp | undefined>();
  const demoScenarios = [
    {
      title: "Scenario 1 · Demande vers offre",
      description: "Montrer le fil commercial : qualification du lead, reponse prete, puis creation d'offre.",
      steps: ["Demandes entrantes", "Generer reponse + relance", "Creer l'offre"],
      links: ["/dashboard/demandes-entrantes", "/dashboard/redaction-offres"],
    },
    {
      title: "Scenario 2 · Reunion vers taches",
      description: "Illustrer la prise de notes automatique : resume, decisions, puis suivi dans la file des taches.",
      steps: ["Reunion IA", "Lecture resume / decisions", "Module Taches"],
      links: ["/dashboard/reunion-ia", "/dashboard/taches"],
    },
  ] as const;

  return (
    <div className="space-y-10">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="ni-surface overflow-hidden"
      >
        <div className="grid grid-cols-5">
          <div className="relative col-span-3 overflow-hidden bg-[#252525] px-9 py-11 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.10),transparent_28%)]" />
            <div className="relative">
              <p className="ni-label text-white/62">NI · Workspace IA</p>
              <h1 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.035em]">
                Votre cockpit operations : une seule interface pour tout le cycle commercial et technique.
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">
                Bonjour Arnaud. Chaque tuile ouvre un module concret (demande web, offre, facture, docs, 3D, veille).
                Les chiffres ci-dessous sont des donnees de demonstration pour le pitch client.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  href="/dashboard/demo"
                  className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[#252525] shadow-[0_18px_42px_-24px_rgba(255,255,255,0.75)] transition hover:-translate-y-0.5"
                >
                  Lancer le parcours demo
                </Link>
                <button
                  type="button"
                  onClick={() => setModuleHelp(getToolHelp("/dashboard"))}
                  className="rounded-2xl border border-white/16 bg-white/8 px-4 py-2.5 text-sm font-medium text-white/80 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
                >
                  Comprendre la plateforme
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-card/72 px-8 py-10 backdrop-blur">
            <p className="ni-label">Session active</p>
            <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">21 avril</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{roleSubtitle(role)}</p>
            <Badge className="mt-7 rounded-2xl border border-border/80 bg-card/70 px-3 py-1.5 text-foreground shadow-sm">
              Role actif: {ROLE_LABELS[role]}
            </Badge>
          </div>
        </div>
      </motion.section>

      <section className="grid grid-cols-4 gap-4">
        {[
          { label: "Demandes traitees", value: "128", trend: "+14% vs mois precedent", hint: "Formulaire site + qualification" },
          { label: "Docs analyses", value: "2 480", trend: "+8% vs mois precedent", hint: "Pages catalogue interrogees" },
          { label: "Actions automatisees", value: "946", trend: "+22% vs mois precedent", hint: "Relances, resumes, brouillons" },
          { label: "Temps economise", value: "186 h", trend: "Estime ce mois", hint: "Base sur le volume d'actions IA" },
        ].map((kpi) => (
          <Card key={kpi.label} className="hover:-translate-y-1 hover:shadow-[0_28px_70px_-50px_rgba(37,37,37,0.48)]">
            <CardContent className="px-4 py-4">
              <p className="ni-label">{kpi.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{kpi.value}</p>
              <p className="mt-1 text-xs font-medium text-foreground">{kpi.trend}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{kpi.hint}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border-amber-200/80 bg-amber-50/70 shadow-[0_22px_55px_-45px_rgba(180,83,9,0.65)] dark:border-amber-300/35 dark:bg-amber-400/12">
        <CardContent className="px-4 py-3 text-sm leading-relaxed text-amber-900 dark:text-amber-100">
          <span className="font-semibold">Action requise :</span> 2 demandes web non traitees depuis plus de 4 h. Ouvrez le module
          Demandes entrantes pour qualifier et envoyer la reponse proposee.
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Resume IA du jour</CardTitle>
          <p className="text-xs text-muted-foreground">Synthese automatique du matin (demo) : ce que le comite lit en 20 secondes.</p>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Hier : 3 nouvelles demandes web qualifiees. Offre Helio Industrie bloquee en validation interne depuis 2 jours.
          Reunion Cartier SA : 2 actions assignees encore ouvertes dans le module Taches.
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Parcours demo guide</CardTitle>
          <p className="text-xs text-muted-foreground">Trois histoires courtes a presenter en reunion sans improviser.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {demoScenarios.map((scenario) => (
            <div key={scenario.title} className="ni-soft-panel p-4 transition hover:-translate-y-0.5 hover:bg-muted/55">
              <p className="text-sm font-semibold text-foreground">{scenario.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{scenario.description}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {scenario.steps.join("  →  ")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={scenario.links[0]}
                  className="rounded-xl border border-border bg-card/70 px-3 py-2 text-xs font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-card"
                >
                  Commencer ici
                </Link>
                <Link
                  href={scenario.links[scenario.links.length - 1]}
                  className="rounded-xl border border-dashed border-border bg-card/70 px-3 py-2 text-xs text-muted-foreground transition hover:-translate-y-0.5 hover:bg-card"
                >
                  Aller au resultat
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div>
        <p className="ni-label">Modules IA</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Acces direct aux assistants</h2>
        <p className="ni-page-lead mt-2">
          Chaque carte ouvre un ecran autonome. Survolez la description pour savoir quoi dire au client en une phrase.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {modules.map((module, index) => {
          return (
            <motion.div
              key={module.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <Card className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:bg-card/86 hover:shadow-[0_30px_80px_-52px_rgba(37,37,37,0.55)]">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-start justify-between gap-3 text-base tracking-tight">
                    <span>{module.title}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      aria-label={`Comprendre ${module.title}`}
                      onClick={() => setModuleHelp(getToolHelp(module.href))}
                      className="text-muted-foreground"
                    >
                      <CircleHelp className="h-3.5 w-3.5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                  <Link
                    href={module.href}
                    className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-border/80 bg-card/70 px-3 py-2 text-xs font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-card"
                  >
                    Ouvrir le module
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Activite recente</CardTitle>
          <p className="text-xs text-muted-foreground">Fil demo des dernieres actions IA (ordre chronologique inverse).</p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Recherche docs</span> · convoyeur inox ligne 3 · reference catalogue citee · il y a 35 min
          </p>
          <p>
            <span className="font-medium text-foreground">Triage emails</span> · 42 messages classes (urgent / a traiter / info) · il y a 1 h
          </p>
          <p>
            <span className="font-medium text-foreground">Offre commerciale</span> · Helio Industrie · brouillon PDF genere · il y a 2 h
          </p>
          <p>
            <span className="font-medium text-foreground">Reunion IA</span> · atelier production · resume + 3 taches extraites · il y a 3 h
          </p>
          <p>
            <span className="font-medium text-foreground">Veille</span> · SIAMS 2026 · brief secteur mis a jour · il y a 4 h
          </p>
        </CardContent>
      </Card>

      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Agents automatises</CardTitle>
            <p className="text-xs text-muted-foreground">Etat des workflows qui tournent en arriere-plan (donnees de demonstration).</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Qualification demandes entrantes", status: "Actif", progress: 82, detail: "Score + resume + tache « repondre »" },
              { name: "Extraction actions depuis reunions", status: "Actif", progress: 64, detail: "Resume, decisions, taches assignees" },
              { name: "Preparation des offres standard", status: "En attente", progress: 31, detail: "Gabarits NI en file d'attente" },
            ].map((flow) => (
              <div key={flow.name} className="ni-soft-panel p-4">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <p className="font-medium text-foreground">{flow.name}</p>
                  <span className="text-xs font-medium text-muted-foreground">{flow.status}</span>
                </div>
                <p className="mb-2 text-xs text-muted-foreground">{flow.detail}</p>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${flow.progress}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Raccourcis utiles en demo</CardTitle>
            <p className="text-xs text-muted-foreground">Un clic = module cible. Meme libelles que dans la navigation.</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { href: "/dashboard/taches", label: "Voir la file des taches" },
              { href: "/dashboard/triage-emails", label: "Ouvrir le triage emails" },
              { href: "/dashboard/redaction-offres", label: "Rediger une nouvelle offre" },
              { href: "/dashboard/studio-visuel", label: "Ouvrir le Studio 3D" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="block w-full rounded-2xl border border-border bg-card/70 px-4 py-3 text-left text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-card"
              >
                {action.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
      <ToolHelpDialog help={moduleHelp} open={Boolean(moduleHelp)} onClose={() => setModuleHelp(undefined)} />
    </div>
  );
}

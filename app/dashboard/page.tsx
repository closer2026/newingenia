"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/contexts/RoleContext";
import { roleSubtitle, ROLE_LABELS } from "@/lib/roles";

const modules = [
  {
    key: "taches",
    title: "Taches",
    href: "/dashboard/taches",
    description: "File unique des prochaines actions : chaque ligne ouvre le module source (facture, demande, post, etc.).",
  },
  {
    key: "suivi-projets",
    title: "Suivi de projets",
    href: "/dashboard/suivi-projets",
    description: "Kanban + fiche projet : budget, jalons, risque et resume IA pour remplacer le suivi Excel du patron.",
  },
  {
    key: "crm",
    title: "CRM",
    href: "/dashboard/crm",
    description: "Fiche client avec historique, timeline des echanges et resume IA de la relation commerciale.",
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
    {
      title: "Scenario 3 · CRM vers email",
      description: "Partir d'une fiche client riche (historique + resume IA) puis rediger l'email de suivi.",
      steps: ["CRM Omega SA", "Resume IA relation", "Redaction emails"],
      links: ["/dashboard/crm", "/dashboard/redaction-emails"],
    },
  ] as const;

  return (
    <div className="space-y-9">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="ni-surface overflow-hidden"
      >
        <div className="grid grid-cols-5">
          <div className="col-span-3 bg-[#161822] px-8 py-10 text-white">
            <p className="ni-label text-slate-300">NI · Workspace IA</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight">
              Votre cockpit operations : une seule interface pour tout le cycle commercial et technique.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-200">
              Bonjour Arnaud. Chaque tuile ouvre un module concret (demande web, offre, facture, docs, 3D, veille).
              Les chiffres ci-dessous sont des donnees de demonstration pour le pitch client.
            </p>
          </div>
          <div className="col-span-2 bg-card px-8 py-10">
            <p className="ni-label">Session active</p>
            <p className="mt-3 text-sm text-muted-foreground">21 avril 2026</p>
            <p className="mt-2 text-sm text-muted-foreground">{roleSubtitle(role)}</p>
            <Badge className="mt-6 rounded-md border border-border bg-card text-foreground">
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
          <Card key={kpi.label} className="rounded-lg border-border bg-card shadow-sm">
            <CardContent className="px-4 py-4">
              <p className="ni-label">{kpi.label}</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{kpi.value}</p>
              <p className="mt-1 text-xs font-medium text-foreground">{kpi.trend}</p>
              <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">{kpi.hint}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-lg border-amber-200 bg-amber-50/60 shadow-sm">
        <CardContent className="px-4 py-3 text-sm leading-relaxed text-amber-900">
          <span className="font-semibold">Action requise :</span> 2 demandes web non traitees depuis plus de 4 h. Ouvrez le module
          Demandes entrantes pour qualifier et envoyer la reponse proposee.
        </CardContent>
      </Card>

      <Card className="rounded-lg border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Resume IA du jour</CardTitle>
          <p className="text-xs text-muted-foreground">Synthese automatique du matin (demo) : ce que le comite lit en 20 secondes.</p>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Hier : 3 nouvelles demandes web qualifiees. Offre Helio Industrie bloquee en validation interne depuis 2 jours.
          Reunion Cartier SA : 2 actions assignees encore ouvertes dans le module Taches.
        </CardContent>
      </Card>

      <Card className="rounded-lg border-border bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Parcours demo guide</CardTitle>
          <p className="text-xs text-muted-foreground">Trois histoires courtes a presenter en reunion sans improviser.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {demoScenarios.map((scenario) => (
            <div key={scenario.title} className="rounded-md border border-border bg-muted/30 p-4 shadow-sm">
              <p className="text-sm font-semibold text-foreground">{scenario.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{scenario.description}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {scenario.steps.join("  →  ")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href={scenario.links[0]}
                  className="rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
                >
                  Commencer ici
                </Link>
                <Link
                  href={scenario.links[scenario.links.length - 1]}
                  className="rounded-md border border-dashed border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-muted"
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
              <Link href={module.href}>
                <Card
                  className="overflow-hidden rounded-lg border-border bg-card transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.5)]"
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base tracking-tight">
                      {module.title}
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm leading-relaxed text-muted-foreground">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <Card className="rounded-lg border-border shadow-sm">
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
        <Card className="rounded-lg border-border shadow-sm lg:col-span-2">
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
              <div key={flow.name} className="rounded-md border border-border bg-card p-4 shadow-sm">
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

        <Card className="rounded-lg border-border shadow-sm">
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
                className="block w-full rounded-md border border-border bg-card px-3 py-2.5 text-left text-sm font-medium text-foreground transition hover:bg-muted"
              >
                {action.label}
              </Link>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

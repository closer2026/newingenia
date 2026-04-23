"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/contexts/RoleContext";
import { roleSubtitle, ROLE_LABELS } from "@/lib/roles";

const modules = [
  { key: "taches", title: "Taches", href: "/dashboard/taches", description: "Centraliser les actions a faire: facturation, suivi client et operations" },
  { key: "suivi-projets", title: "Suivi de projets", href: "/dashboard/suivi-projets", description: "Piloter les projets en kanban, timeline et alertes de retard" },
  { key: "crm", title: "CRM", href: "/dashboard/crm", description: "Suivre les relations clients, interactions et prochaines actions" },
  { key: "facturation", title: "Creation facture", href: "/dashboard/facturation", description: "Creer une facture, verifier la TVA et generer un apercu avant emission" },
  { key: "linkedin", title: "Linkedin", href: "/dashboard/linkedin", description: "Generer un post avec l'IA et valider la publication entreprise" },
  { key: "demandes-entrantes", title: "Demandes entrantes", href: "/dashboard/demandes-entrantes", description: "Traiter les demandes projet du formulaire vitrine et repondre vite" },
  { key: "recherche-docs", title: "Recherche docs", href: "/dashboard/recherche-docs", description: "Interroger les catalogues Bosch Rexroth et NI" },
  { key: "redaction-offres", title: "Redaction offres", href: "/dashboard/redaction-offres", description: "Generer une offre commerciale structuree" },
  { key: "reunion-ia", title: "Réunion IA", href: "/dashboard/reunion-ia", description: "Enregistrer, transcrire et extraire des actions" },
  { key: "redaction-emails", title: "Redaction emails", href: "/dashboard/redaction-emails", description: "Creer des emails professionnels au format NI" },
  { key: "studio-visuel", title: "Studio 3D", href: "/dashboard/studio-visuel", description: "Viewer 3D interactif et generation simulee de modeles produits" },
  { key: "studio-marketing", title: "Studio marketing", href: "/dashboard/studio-marketing", description: "Visuels marketing, photos produit et variantes IA pour vos campagnes" },
  { key: "veille", title: "Veille", href: "/dashboard/veille", description: "Surveiller SIAMS, Bosch Rexroth et tendances du secteur chaque semaine" },
] as const;

export default function DashboardPage() {
  const { role } = useRole();
  const demoScenarios = [
    {
      title: "Scenario 1 · Demande > Offre",
      description: "Traiter une demande entrante, generer la reponse puis ouvrir la redaction d'offre.",
      steps: ["Ouvrir Demandes entrantes", "Generer reponse", "Cliquer Creer offre"],
      links: ["/dashboard/demandes-entrantes", "/dashboard/redaction-offres"],
    },
    {
      title: "Scenario 2 · Reunion > Taches",
      description: "Lancer une reunion simulee puis convertir les decisions en plan d'action equipe.",
      steps: ["Ouvrir Reunion IA", "Verifier resume", "Suivre dans Taches"],
      links: ["/dashboard/reunion-ia", "/dashboard/taches"],
    },
    {
      title: "Scenario 3 · CRM > Email",
      description: "Consulter un compte client, identifier la prochaine action puis rediger l'email.",
      steps: ["Ouvrir CRM", "Verifier resume IA", "Generer email de suivi"],
      links: ["/dashboard/crm", "/dashboard/redaction-emails"],
    },
  ] as const;

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="ni-surface overflow-hidden"
      >
        <div className="grid grid-cols-5">
          <div className="col-span-3 bg-[#161822] px-8 py-10 text-white">
            <p className="ni-label text-slate-300">NI · Workspace IA</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight">
              Plateforme interne IA pour les operations, documents et flux metier.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-slate-200">
              Bonjour, Arnaud. Accedez a tous les assistants metier depuis un espace unique pour accelerer
              les process internes et standardiser les livrables.
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
          { label: "Demandes traitees", value: "128", trend: "+14% semaine" },
          { label: "Docs analyses", value: "2 480", trend: "+8% semaine" },
          { label: "Actions automatisees", value: "946", trend: "+22% semaine" },
          { label: "Temps economise", value: "186 h", trend: "mois en cours" },
        ].map((kpi) => (
          <Card key={kpi.label} className="rounded-lg border-border bg-card">
            <CardContent className="px-4 py-4">
              <p className="ni-label">{kpi.label}</p>
              <p className="mt-2 text-2xl font-semibold text-foreground">{kpi.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.trend}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-lg border-amber-200 bg-amber-50/60">
        <CardContent className="px-4 py-3 text-sm text-amber-900">
          ⚠ ALERTE : 2 demandes entrantes non traitees depuis plus de 4 heures.
        </CardContent>
      </Card>

      <Card className="rounded-lg border-border">
        <CardHeader>
          <CardTitle className="text-base tracking-tight">Resume IA du jour</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          3 demandes recues hier. Offre Helio Industrie en attente de validation depuis 2 jours.
          Reunion Cartier SA : 2 taches non completees.
        </CardContent>
      </Card>

      <Card className="rounded-lg border-border bg-card">
        <CardHeader>
          <CardTitle className="text-base tracking-tight">Parcours demo guide</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          {demoScenarios.map((scenario) => (
            <div key={scenario.title} className="rounded-md border border-border bg-muted/30 p-3">
              <p className="text-sm font-semibold text-foreground">{scenario.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{scenario.description}</p>
              <p className="mt-3 text-[11px] text-muted-foreground">
                {scenario.steps.join("  →  ")}
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  href={scenario.links[0]}
                  className="rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-foreground transition hover:bg-muted"
                >
                  Lancer
                </Link>
                <Link
                  href={scenario.links[scenario.links.length - 1]}
                  className="rounded-md border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground transition hover:bg-muted"
                >
                  Etape finale
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div>
        <p className="ni-label">Modules IA</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Vos espaces de travail</h2>
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
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <Card className="rounded-lg border-border">
        <CardHeader>
          <CardTitle className="text-base tracking-tight">Activite recente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>Recherche docs · Convoyeur inox ligne 3 · il y a 35 min</p>
          <p>Triage emails · 42 messages classes · il y a 1h</p>
          <p>Offre commerciale · Helio Industrie · il y a 2h</p>
          <p>Compte rendu reunion · Atelier production · il y a 3h</p>
          <p>Veille hebdomadaire · SIAMS 2026 en cours · il y a 4h</p>
        </CardContent>
      </Card>

      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="rounded-lg border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">Centre d&apos;automatisation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: "Qualification demandes entrantes", status: "Actif", progress: 82 },
              { name: "Extraction actions depuis reunions", status: "Actif", progress: 64 },
              { name: "Preparation des offres standard", status: "En attente", progress: 31 },
            ].map((flow) => (
              <div key={flow.name} className="rounded-md border border-border bg-card p-3">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <p className="font-medium text-foreground">{flow.name}</p>
                  <span className="text-xs text-muted-foreground">{flow.status}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${flow.progress}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-lg border-border">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              "Creer une tache prioritaire",
              "Lancer triage emails",
              "Generer offre commerciale",
              "Ouvrir Studio 3D",
            ].map((action) => (
              <button
                key={action}
                className="w-full rounded-md border border-border bg-card px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted"
              >
                {action}
              </button>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

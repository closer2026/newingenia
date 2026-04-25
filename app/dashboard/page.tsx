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
    title: "Tâches",
    href: "/dashboard/taches",
    description: "Centraliser les relances, validations et actions issues des demandes, emails, réunions et projets.",
  },
  {
    key: "facturation",
    title: "Facturation",
    href: "/dashboard/facturation",
    description: "Reprendre une offre ou un projet terminé, vérifier les lignes et préparer un aperçu de facture.",
  },
  {
    key: "linkedin",
    title: "Communication LinkedIn",
    href: "/dashboard/linkedin",
    description: "Transformer une livraison, une photo ou une actualité New Ingenia en brouillon de publication.",
  },
  {
    key: "demandes-entrantes",
    title: "Demandes entrantes",
    href: "/dashboard/demandes-entrantes",
    description: "Résumer une demande, voir ce qu'il manque et préparer une réponse ou une offre.",
  },
  {
    key: "recherche-docs",
    title: "Recherche technique",
    href: "/dashboard/recherche-docs",
    description: "Chercher dans les documents techniques, catalogues, anciennes offres ou procédures.",
  },
  {
    key: "redaction-offres",
    title: "Offres clients",
    href: "/dashboard/redaction-offres",
    description: "Structurer le besoin, ajouter les options techniques et préparer une base d'offre à relire.",
  },
  {
    key: "reunion-ia",
    title: "Réunion IA",
    href: "/dashboard/reunion-ia",
    description: "Transformer des notes de réunion en décisions, tâches et email de compte-rendu.",
  },
  {
    key: "redaction-emails",
    title: "Emails clients",
    href: "/dashboard/redaction-emails",
    description: "Préparer un brouillon professionnel pour envoyer une offre, relancer ou confirmer une décision.",
  },
  {
    key: "fiches-clients",
    title: "Fiches clients",
    href: "/dashboard/fiches-clients",
    description: "Retrouver les contacts, offres, projets et dernières interactions d'un client.",
  },
  {
    key: "studio-visuel",
    title: "Studio 3D",
    href: "/dashboard/studio-visuel",
    description: "Afficher un premier aperçu visuel pour aider un client à se projeter.",
  },
  {
    key: "studio-marketing",
    title: "Studio Marketing",
    href: "/dashboard/studio-marketing",
    description: "Préparer une image ou une idée de visuel pour une offre, LinkedIn ou une présentation client.",
  },
  {
    key: "veille",
    title: "Veille",
    href: "/dashboard/veille",
    description: "Regrouper les nouveautés fournisseurs, salons, tendances ou opportunités à surveiller.",
  },
] as const;

export default function DashboardPage() {
  const { role } = useRole();
  const [moduleHelp, setModuleHelp] = useState<ToolHelp | undefined>();
  const demoScenarios = [
    {
      title: "Un client demande un poste de travail",
      description: "Montrer comment une demande client est resumee, completee puis transformee en prochaine action.",
      steps: ["Demande reçue", "Besoin résumé", "Infos manquantes", "Offre possible"],
      links: ["/dashboard/demandes-entrantes", "/dashboard/redaction-offres"],
    },
    {
      title: "L'équipe prépare une offre",
      description: "Partir du besoin client, choisir les options NI'One puis afficher une base d'offre claire.",
      steps: ["Besoin client", "Options techniques", "Aperçu offre", "Email d'envoi"],
      links: ["/dashboard/redaction-offres", "/dashboard/redaction-emails"],
    },
    {
      title: "La relance client est suivie",
      description: "Retrouver l'historique client, préparer l'action suivante et garder une trace claire.",
      steps: ["Historique", "Point ouvert", "Action", "Relance"],
      links: ["/dashboard/fiches-clients", "/dashboard/taches"],
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
          <div className="relative col-span-3 overflow-hidden bg-[#696969] px-9 py-11 text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.10),transparent_28%)]" />
            <div className="relative">
              <p className="ni-label text-white/62">NI · Workspace IA</p>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.035em]">
                Une maquette pour montrer comment l&apos;IA peut simplifier le quotidien de New Ingenia
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/72">
                Demandes clients, offres, documents techniques, emails, projets et visuels : chaque page montre un exemple
                concret que l&apos;on pourrait adapter à vos vrais processus.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  href="/dashboard/demo"
                  className="rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-[#696969] shadow-[0_18px_42px_-24px_rgba(255,255,255,0.75)] transition hover:-translate-y-0.5"
                >
                  Voir les exemples
                </Link>
                <button
                  type="button"
                  onClick={() => setModuleHelp(getToolHelp("/dashboard"))}
                  className="rounded-2xl border border-white/16 bg-white/8 px-4 py-2.5 text-sm font-medium text-white/80 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
                >
                  Comprendre cette maquette
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-card/72 px-8 py-10 backdrop-blur">
            <p className="ni-label">Session active</p>
            <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">21 avril</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{roleSubtitle(role)}</p>
            <Badge className="mt-7 rounded-2xl border border-border/80 bg-card/70 px-3 py-1.5 text-foreground shadow-sm">
              Rôle actif: {ROLE_LABELS[role]}
            </Badge>
          </div>
        </div>
      </motion.section>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Comment lire cette maquette ?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-7 text-muted-foreground">
          Le but n&apos;est pas de présenter un logiciel finalisé, mais de montrer des idées concrètes. Chaque exemple part d&apos;une
          situation réelle : un client écrit, une offre doit être préparée, une information technique est recherchée, un projet
          doit être suivi ou un visuel produit doit être créé.
        </CardContent>
      </Card>

      <section className="grid grid-cols-4 gap-4">
        {[
          {
            title: "Répondre plus vite aux clients",
            text: "Résumer une demande, voir ce qu'il manque et préparer une réponse ou une offre.",
          },
          {
            title: "Préparer les offres plus facilement",
            text: "Structurer le besoin, ajouter les options techniques et préparer une base d'offre à relire.",
          },
          {
            title: "Retrouver les bonnes informations",
            text: "Chercher dans les documents techniques, catalogues, anciennes offres ou procédures.",
          },
          {
            title: "Suivre les clients et les relances",
            text: "Voir l'historique client, les actions à faire et les prochaines relances.",
          },
        ].map((item) => (
          <Card key={item.title} className="hover:-translate-y-1 hover:shadow-[0_28px_70px_-50px_rgba(105,105,105,0.48)]">
            <CardContent className="px-4 py-4">
              <p className="text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="border-amber-200/80 bg-amber-50/70 shadow-[0_22px_55px_-45px_rgba(180,83,9,0.65)] dark:border-amber-300/35 dark:bg-amber-400/12">
        <CardContent className="px-4 py-3 text-sm leading-relaxed text-amber-900 dark:text-amber-100">
          <span className="font-semibold">Action à vérifier :</span> 2 demandes clients attendent une réponse. Ouvrez
          “Demandes entrantes” pour résumer le besoin et préparer la suite.
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Résumé du jour</CardTitle>
          <p className="text-xs text-muted-foreground">Une lecture courte pour savoir ce qui demande une décision.</p>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Hier : 3 nouvelles demandes clients à qualifier. Une offre pour postes NI&apos;One attend une validation interne.
          Réunion client horloger : 2 actions restent ouvertes avant relance.
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">3 exemples à montrer pendant le rendez-vous</CardTitle>
          <p className="text-xs text-muted-foreground">Trois histoires simples, basées sur des situations crédibles New Ingenia.</p>
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
        <p className="ni-label">Pages à explorer</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Exemples concrets à explorer</h2>
        <p className="ni-page-lead mt-2">
          Chaque carte part d&apos;un cas métier simple : demande client, offre, document technique, projet, email ou visuel.
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
              <Card className="overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-foreground/15 hover:bg-card/86 hover:shadow-[0_30px_80px_-52px_rgba(105,105,105,0.55)]">
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
          <CardTitle className="text-base tracking-tight">Activité récente</CardTitle>
          <p className="text-xs text-muted-foreground">Exemples d&apos;actions que la maquette pourrait aider à préparer.</p>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Info technique</span> · poste NI&apos;One ESD · référence catalogue citée · il y a 35 min
          </p>
          <p>
            <span className="font-medium text-foreground">Emails importants</span> · demandes clients et messages à traiter · il y a 1 h
          </p>
          <p>
            <span className="font-medium text-foreground">Offre client</span> · postes modulaires NI&apos;One · brouillon préparé · il y a 2 h
          </p>
          <p>
            <span className="font-medium text-foreground">Réunion client</span> · configuration validée · 3 tâches à suivre · il y a 3 h
          </p>
          <p>
            <span className="font-medium text-foreground">Infos utiles</span> · salon industriel · opportunité commerciale · il y a 4 h
          </p>
        </CardContent>
      </Card>

      <section className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Chemins visibles</CardTitle>
            <p className="text-xs text-muted-foreground">Chaque ligne montre une situation, l&apos;aide proposée et le résultat attendu.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Demande client", status: "À vérifier", progress: 82, detail: "Résumé du besoin, infos manquantes, prochaine action" },
              { name: "Réunion client", status: "À suivre", progress: 64, detail: "Décisions, tâches, email de compte-rendu" },
              { name: "Offre NI'One", status: "À relire", progress: 31, detail: "Options techniques, délais, conditions" },
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
            <CardTitle className="text-base tracking-tight">Raccourcis utiles</CardTitle>
            <p className="text-xs text-muted-foreground">Ouvrir rapidement les exemples les plus parlants en rendez-vous.</p>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { href: "/dashboard/demandes-entrantes", label: "Demandes entrantes" },
              { href: "/dashboard/redaction-offres", label: "Offres clients" },
              { href: "/dashboard/fiches-clients", label: "Fiches clients" },
              { href: "/dashboard/studio-visuel", label: "Studio 3D" },
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

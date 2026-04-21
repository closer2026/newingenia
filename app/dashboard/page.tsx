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
  { key: "facturation", title: "Creation facture", href: "/dashboard/facturation", description: "Creer une facture, verifier la TVA et generer un apercu avant emission" },
  { key: "linkedin", title: "Linkedin", href: "/dashboard/linkedin", description: "Generer un post avec l'IA et valider la publication entreprise" },
  { key: "demandes-entrantes", title: "Demandes entrantes", href: "/dashboard/demandes-entrantes", description: "Traiter les demandes projet du formulaire vitrine et repondre vite" },
  { key: "recherche-docs", title: "Recherche docs", href: "/dashboard/recherche-docs", description: "Interroger les catalogues Bosch Rexroth et NI" },
  { key: "redaction-offres", title: "Redaction offres", href: "/dashboard/redaction-offres", description: "Generer une offre commerciale structuree" },
  { key: "reunion-ia", title: "Réunion", href: "/dashboard/reunion-ia", description: "Enregistrer, transcrire et extraire des actions" },
  { key: "redaction-emails", title: "Redaction emails", href: "/dashboard/redaction-emails", description: "Creer des emails professionnels au format NI" },
  { key: "studio-visuel", title: "Studio visuel intelligent", href: "/dashboard/studio-visuel", description: "Simuler la generation de visuels 3D produits avec viewer interactif" },
] as const;

export default function DashboardPage() {
  const { role } = useRole();

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
              "Ouvrir Studio visuel",
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

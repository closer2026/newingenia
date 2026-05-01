"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  FileText,
  Inbox,
  Mail,
  Mic,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ToolHelpDialog } from "@/components/layout/ToolHelpDialog";
import { getToolHelp, type ToolHelp } from "@/lib/tool-help";

/** 6 cartes stats — maquette */
const kpis = [
  { label: "Demandes entrantes", value: "7", hint: "+2 aujourd'hui", href: "/dashboard/demandes-entrantes" },
  { label: "Offres en préparation", value: "3", hint: "En cours", href: "/dashboard/redaction-offres" },
  { label: "Offres envoyées", value: "12", hint: "Ce mois-ci", href: "/dashboard/redaction-offres" },
  { label: "Tâches à faire", value: "5", hint: "À planifier", href: "/dashboard/taches" },
  { label: "Emails à traiter", value: "4", hint: "Priorisés", href: "/dashboard/triage-emails" },
  { label: "À valider", value: "3", hint: "En attente", href: "/dashboard/validations" },
  { label: "Points de suivi", value: "2", hint: "Cette semaine", href: "/dashboard/reunion-ia" },
] as const;

const aReprendre = [
  {
    title: "Demande client",
    subtitle: "Manufacture Horlogère Delta",
    time: "Reçue il y a 2 h",
    href: "/dashboard/demandes-entrantes",
  },
  {
    title: "Relance offre NI'One",
    subtitle: "Client industrie horlogère",
    time: "Il y a 5 h",
    href: "/dashboard/redaction-offres",
  },
] as const;

const aValider = [
  {
    title: "Offre NI'One · prix fournisseur",
    subtitle: "Horloger Delta · marge mini à confirmer",
    time: "Il y a 1 h",
    href: "/dashboard/validations",
  },
  {
    title: "Publication veille salon",
    subtitle: "Brouillon LinkedIn — relecture métier",
    time: "Il y a 3 h",
    href: "/dashboard/validations",
  },
  {
    title: "Complément technique offre",
    subtitle: "Client industrie — notice ESD manquante",
    time: "Hier",
    href: "/dashboard/validations",
  },
] as const;

const activiteDroite = [
  { title: "Catalogue consulté", detail: "Profilés BR 2024 · passage en revue", time: "Il y a 45 min" },
  { title: "Email prioritaire", detail: "Relance planning atelier", time: "Il y a 1 h" },
  { title: "Veille salon", detail: "Nouvelle fiche fournisseur", time: "Hier" },
] as const;

const parcoursRecommande = [
  { label: "Demandes entrantes", icon: FileText, done: true },
  { label: "Offres clients", icon: FileText, done: false },
  { label: "Emails clients", icon: Mail, done: false },
  { label: "Réunion", icon: Mic, done: false },
] as const;

export default function DashboardPage() {
  const [moduleHelp, setModuleHelp] = useState<ToolHelp | undefined>();

  return (
    <div className="space-y-8 pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="ni-label">Tableau de bord</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--ni-text)] sm:text-[2rem]">Bonjour Claire,</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Voici l&apos;essentiel de votre activité aujourd&apos;hui.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          onClick={() => setModuleHelp(getToolHelp("/dashboard"))}
          className="ni-module-help h-9 self-start sm:self-auto"
        >
          <CircleHelp className="h-3.5 w-3.5" />
          Comprendre ce module
        </Button>
      </div>

      <section className="space-y-6 rounded-[28px] border border-[#677991]/25 bg-white/88 p-6 shadow-[0_4px_12px_rgba(45,55,70,0.06),0_28px_70px_-30px_rgba(45,55,65,0.18)] ring-1 ring-[#677991]/12 backdrop-blur-xl dark:border-white/15 dark:bg-[#10161e]/90 dark:ring-white/10 sm:p-7">
      {/* KPI — cartes blanches ; 7 entrées sur grands écrans */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {kpis.map((k) => (
          <Link key={k.label} href={k.href} className="group block">
            <div className="flex h-full min-h-[104px] flex-col justify-between rounded-2xl border border-zinc-300/70 bg-white p-4 shadow-[0_1px_2px_rgba(45,55,70,0.05),0_12px_28px_-16px_rgba(45,55,65,0.10)] ring-1 ring-zinc-200/60 transition hover:-translate-y-0.5 hover:border-zinc-400/70 hover:shadow-[0_12px_32px_-18px_rgba(45,55,65,0.18)] dark:border-white/15 dark:bg-[#171d25] dark:ring-white/10 dark:hover:border-white/25">
              <p className="text-[11px] font-medium leading-tight text-muted-foreground">{k.label}</p>
              <p className="text-2xl font-semibold tabular-nums tracking-tight text-[var(--ni-text)]">{k.value}</p>
              <p className="text-[11px] text-muted-foreground">{k.hint}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Deux blocs en haut, puis parcours recommandé en pleine largeur */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden rounded-[22px] border border-white/90 bg-white shadow-[var(--ni-shadow-soft)] dark:border-white/10 dark:bg-[#171d25]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[var(--ni-text)]">À reprendre</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border/40 p-0">
            {aReprendre.map((row) => (
              <Link
                key={row.title}
                href={row.href}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-muted/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/70 text-primary">
                  <Inbox className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{row.title}</p>
                  <p className="text-xs text-muted-foreground">{row.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{row.time}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="overflow-hidden rounded-[22px] border border-white/90 bg-white shadow-[var(--ni-shadow-soft)] dark:border-white/10 dark:bg-[#171d25]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[var(--ni-text)]">À valider</CardTitle>
            <p className="text-xs text-muted-foreground">Décisions avant envoi ou publication.</p>
          </CardHeader>
          <CardContent className="divide-y divide-border/40 p-0">
            {aValider.map((row) => (
              <Link
                key={row.title}
                href={row.href}
                className="flex items-center gap-3 px-5 py-4 transition hover:bg-muted/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted/70 text-primary">
                  <BadgeCheck className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{row.title}</p>
                  <p className="text-xs text-muted-foreground">{row.subtitle}</p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{row.time}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[22px] border border-white/90 bg-white shadow-[var(--ni-shadow-soft)] dark:border-white/10 dark:bg-[#171d25]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-[var(--ni-text)]">Activité récente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activiteDroite.map((a) => (
              <div key={a.title} className="flex items-start justify-between gap-3 text-sm">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2d3748]/70 dark:text-[#8fa3bb]" />
                  <div>
                    <p className="font-medium text-foreground">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.detail}</p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card className="overflow-hidden rounded-[22px] border border-[#2d3748]/10 bg-gradient-to-b from-white to-[#f4f6f8] shadow-[var(--ni-shadow-soft)] dark:border-white/10 dark:from-[#171d25] dark:to-[#121821]">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-[var(--ni-text)]">Parcours recommandé</CardTitle>
            <p className="text-xs text-muted-foreground">Reprenez la présentation en 4 étapes clés.</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <div
                className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[22px] z-0 h-px bg-border"
                aria-hidden
              />
              <div className="relative z-[1] grid grid-cols-4">
                {parcoursRecommande.map((p, index) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.label} className="flex flex-col items-center">
                      <div
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-full border-2 shadow-sm transition",
                          p.done
                            ? "border-[#677991] bg-[#677991] text-white dark:border-[#8fa3bb] dark:bg-[#8fa3bb] dark:text-[#0f141b]"
                            : "border-border bg-white text-muted-foreground dark:bg-[#121821]"
                        )}
                      >
                        <Icon className="h-4 w-4 text-current" />
                      </div>
                      <span
                        className={cn(
                          "mt-3 text-center text-xs leading-tight",
                          p.done
                            ? "font-semibold text-foreground"
                            : "font-medium text-muted-foreground"
                        )}
                      >
                        {index + 1}. {p.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end">
              <Link
                href="/dashboard/demo"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                Parcours complet
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      </section>

      <ToolHelpDialog help={moduleHelp} open={Boolean(moduleHelp)} onClose={() => setModuleHelp(undefined)} />
    </div>
  );
}

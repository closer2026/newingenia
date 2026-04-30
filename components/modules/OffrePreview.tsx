"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NiLogo } from "@/components/layout/NiLogo";
import { TechnicalBlueprint } from "@/components/decorative/technical-decorations";

const lignes = [
  ["3 postes NI'One · structure 45x45 renforcée", "3", "14'700"],
  ["Surface ESD + éclairage intégré", "3", "4'200"],
  ["Rangements outils + installation sur site", "1", "2'650"],
] as const;

export function OffrePreview({ generated }: { generated: boolean }) {
  return (
    <Card className="ni-surface relative h-full overflow-hidden rounded-[1.25rem]">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base tracking-tight">Aperçu de l&apos;offre</CardTitle>
          <p className="text-xs text-muted-foreground">
            Document complet au format A4 : présentation, détail technique, conditions.
          </p>
        </div>
        <Badge className="rounded-full border border-emerald-200/80 bg-emerald-50/90 px-3 py-1 text-emerald-800 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/15 dark:text-emerald-100">
          Base à relire
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          key={generated ? "on" : "off"}
          initial={{ opacity: 0.2, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl border border-border/70 bg-[color-mix(in_srgb,var(--ni-accent-soft)_55%,white)] p-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:bg-muted/42"
        >
          <div className="pointer-events-none absolute -right-6 bottom-0 w-32 opacity-[0.12]">
            <TechnicalBlueprint className="h-24 w-full" />
          </div>

          <article className="relative mx-auto flex w-full max-w-[720px] flex-col gap-6 rounded-xl border border-zinc-200/90 bg-white p-10 text-foreground shadow-[0_24px_60px_-40px_rgba(45,55,70,0.35)] ring-1 ring-black/[0.04]">
            {/* En-tête */}
            <header className="flex items-start justify-between border-b border-zinc-200 pb-4">
              <div className="flex items-center gap-3">
                <NiLogo compact />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    New Ingenia SA
                  </p>
                  <p className="mt-1 text-xs text-zinc-600">
                    Rue St-Randoald 2A · 2800 Delémont
                  </p>
                </div>
              </div>
              <div className="text-right text-xs text-zinc-600">
                <p className="font-semibold text-zinc-800">Offre N° 2026-041</p>
                <p>Date : 20 avril 2026</p>
                <p>Validité : 30 jours</p>
              </div>
            </header>

            {/* Section 1 — Présentation */}
            <section className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Section 1 · Présentation
              </p>
              <p className="font-medium text-zinc-900">Destinataire : Manufacture Horlogère Delta</p>
              <p className="text-xs leading-relaxed text-zinc-700">
                Madame, Monsieur, suite à votre demande, nous vous transmettons notre proposition
                pour la fourniture et l&apos;intégration de 3 postes NI&apos;One avec surface ESD,
                éclairage intégré et rangements outils.
              </p>
              <div className="space-y-1.5 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-800">
                <p className="font-semibold">Périmètre proposé</p>
                <p>• 3 postes de travail NI&apos;One avec profilé 45x45 renforcé</p>
                <p>• Surface ESD et support outils intégré</p>
                <p>• Installation sur site et mise en service</p>
              </div>
            </section>

            <div className="border-t border-dashed border-zinc-200" aria-hidden />

            {/* Section 2 — Détail technique & budget */}
            <section className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Section 2 · Détail technique &amp; budget
              </p>
              <p className="text-sm font-semibold text-zinc-900">Détail des lignes</p>
              <div className="overflow-hidden rounded-md border border-zinc-200">
                <div className="grid grid-cols-[2fr_0.6fr_1fr] bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700">
                  <p>Désignation</p>
                  <p className="text-right">Qt</p>
                  <p className="text-right">Montant CHF</p>
                </div>
                {lignes.map((line) => (
                  <div
                    key={line[0]}
                    className="grid grid-cols-[2fr_0.6fr_1fr] border-t border-zinc-200 px-3 py-2 text-xs text-zinc-800"
                  >
                    <p>{line[0]}</p>
                    <p className="text-right">{line[1]}</p>
                    <p className="text-right font-semibold">{line[2]}</p>
                  </div>
                ))}
              </div>
              <div className="ml-auto w-56 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-600">Sous-total</span>
                  <span>21&apos;550 CHF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600">TVA 8.1%</span>
                  <span>1&apos;745.55 CHF</span>
                </div>
                <div className="flex justify-between border-t border-zinc-300 pt-1 font-semibold">
                  <span>Total TTC</span>
                  <span>23&apos;295.55 CHF</span>
                </div>
              </div>
              <p className="text-xs text-zinc-600">
                Délai estimé : 6 semaines après validation · Garantie : 24 mois
              </p>
            </section>

            <div className="border-t border-dashed border-zinc-200" aria-hidden />

            {/* Section 3 — Conditions & signature */}
            <section className="space-y-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-400">
                Section 3 · Conditions &amp; signature
              </p>
              <p className="text-sm font-semibold text-zinc-900">Conditions commerciales</p>
              <div className="space-y-1.5 text-xs text-zinc-700">
                <p>• Paiement à 30 jours fin de mois.</p>
                <p>• Offre valable 30 jours dès la date d&apos;émission.</p>
                <p>• Démarrage après validation écrite de la commande.</p>
                <p>• Installation incluse sur site client (Suisse romande).</p>
              </div>
              <div className="rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-700">
                <p className="font-semibold text-zinc-800">Prochaine étape</p>
                <p className="mt-1">
                  Validation client puis planification atelier, contrôle technique et installation.
                </p>
              </div>
              <div className="mt-6 flex items-end justify-between text-xs text-zinc-700">
                <div>
                  <p className="font-semibold text-zinc-800">Arnaud Dupont</p>
                  <p>Direction · New Ingenia SA</p>
                </div>
                <p>Signature client</p>
              </div>
            </section>
          </article>
        </motion.div>

        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="rounded-xl">
            Télécharger le PDF
          </Button>
          <Button size="sm" variant="outline" className="rounded-xl border-border/70 bg-white/86">
            Préparer l&apos;email
          </Button>
          <Button size="sm" variant="outline" className="rounded-xl border-border/70 bg-white/86">
            Revoir le contenu
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {generated
            ? "Aperçu prêt à relire avec les informations du projet."
            : "Cliquez sur « Préparer la base d'offre » dans le formulaire de gauche pour remplir cette zone."}
        </p>
      </CardContent>
    </Card>
  );
}

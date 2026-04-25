"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NiLogo } from "@/components/layout/NiLogo";

export function OffrePreview({ generated }: { generated: boolean }) {
  const pages = useMemo(
    () => [
      {
        title: "Page 1 · Presentation de l'offre",
        content: (
          <>
            <div className="mb-4 flex items-start justify-between border-b border-zinc-200 pb-3">
              <div>
                <NiLogo />
                <p className="mt-2 text-xs text-zinc-600">New Ingenia SA · Rue St-Randoald 2A · 2800 Delemont</p>
              </div>
              <div className="text-right text-xs text-zinc-600">
                <p className="font-semibold text-zinc-800">Offre N° 2026-041</p>
                <p>Date: 20 avril 2026</p>
                <p>Validite: 30 jours</p>
              </div>
            </div>
            <p className="font-medium text-[#252525]">Destinataire : Manufacture Horlogere Delta</p>
            <p className="mt-2 text-xs text-zinc-700">
              Madame, Monsieur, suite à votre demande, nous vous transmettons notre proposition pour la fourniture
              et l&apos;intégration de 3 postes NI&apos;One avec surface ESD, éclairage intégré et rangements outils.
            </p>
            <div className="mt-4 space-y-2 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-800">
              <p className="font-semibold">Perimetre propose</p>
              <p>• 3 postes de travail NI&apos;One avec profile 45x45 renforce</p>
              <p>• Surface ESD et support outils intégré</p>
              <p>• Installation sur site et mise en service</p>
            </div>
          </>
        ),
      },
      {
        title: "Page 2 · Detail technique & budget",
        content: (
          <>
            <p className="mb-3 text-sm font-semibold text-[#252525]">Detail des lignes</p>
            <div className="overflow-hidden rounded-md border border-zinc-200">
              <div className="grid grid-cols-[2fr_0.6fr_1fr] bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700">
                <p>Designation</p>
                <p className="text-right">Qt</p>
                <p className="text-right">Montant CHF</p>
              </div>
              {[
                ["3 postes NI'One · structure 45x45 renforcee", "3", "14'700"],
                ["Surface ESD + éclairage intégré", "3", "4'200"],
                ["Rangements outils + installation sur site", "1", "2'650"],
              ].map((line) => (
                <div key={line[0]} className="grid grid-cols-[2fr_0.6fr_1fr] border-t border-zinc-200 px-3 py-2 text-xs text-zinc-800">
                  <p>{line[0]}</p>
                  <p className="text-right">{line[1]}</p>
                  <p className="text-right font-semibold">{line[2]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 ml-auto w-56 space-y-1 text-xs">
              <div className="flex justify-between"><span className="text-zinc-600">Sous-total</span><span>21&apos;550 CHF</span></div>
              <div className="flex justify-between"><span className="text-zinc-600">TVA 8.1%</span><span>1&apos;745.55 CHF</span></div>
              <div className="flex justify-between border-t border-zinc-300 pt-1 font-semibold"><span>Total TTC</span><span>23&apos;295.55 CHF</span></div>
            </div>
            <p className="mt-4 text-xs text-zinc-600">Délai estimé : 6 semaines après validation · Garantie : 24 mois</p>
          </>
        ),
      },
      {
        title: "Page 3 · Conditions & signature",
        content: (
          <>
            <p className="mb-3 text-sm font-semibold text-[#252525]">Conditions commerciales</p>
            <div className="space-y-2 text-xs text-zinc-700">
              <p>• Paiement à 30 jours fin de mois.</p>
              <p>• Offre valable 30 jours des la date d&apos;emission.</p>
              <p>• Demarrage apres validation ecrite de la commande.</p>
              <p>• Installation incluse sur site client (Suisse romande).</p>
            </div>
            <div className="mt-6 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-xs text-zinc-700">
              <p className="font-semibold text-zinc-800">Prochaine étape</p>
              <p className="mt-1">Validation client puis planification atelier, controle technique et installation.</p>
            </div>
            <div className="mt-10 flex items-end justify-between text-xs text-zinc-700">
              <div>
                <p className="font-semibold text-zinc-800">Arnaud Dupont</p>
                <p>Direction · New Ingenia SA</p>
              </div>
              <p>Signature client</p>
            </div>
          </>
        ),
      },
    ],
    []
  );

  const [activePage, setActivePage] = useState(0);
  const totalPages = pages.length;

  return (
    <Card className="ni-surface h-full rounded-xl">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base tracking-tight">Aperçu de l&apos;offre</CardTitle>
          <p className="text-xs text-muted-foreground">
            Parcourez les 3 pages comme un PDF : intro client, detail technique, conditions.
          </p>
        </div>
        <Badge className="rounded-xl border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-500/14 dark:text-emerald-200">Base à relire</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          key={`${generated ? "on" : "off"}-${activePage}`}
          initial={{ opacity: 0.2, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-border bg-muted/30 p-3 text-sm"
        >
          <div className="mx-auto w-full max-w-[720px] rounded-md border border-zinc-200 bg-white p-7 text-[#252525] shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">{pages[activePage]?.title}</p>
              <p className="text-xs text-zinc-500">Page {activePage + 1} / {totalPages}</p>
            </div>
            {pages[activePage]?.content}
          </div>
        </motion.div>

        <div className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-md"
            onClick={() => setActivePage((page) => Math.max(0, page - 1))}
            disabled={activePage === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Page precedente
          </Button>
          <p className="text-xs text-muted-foreground">Pages 1 à 3 du PDF NI</p>
          <Button
            size="sm"
            variant="outline"
            className="rounded-md"
            onClick={() => setActivePage((page) => Math.min(totalPages - 1, page + 1))}
            disabled={activePage === totalPages - 1}
          >
            Page suivante
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="rounded-sm">
            Telecharger le PDF
          </Button>
          <Button size="sm" variant="outline" className="rounded-sm">
            Préparer l&apos;email
          </Button>
          <Button size="sm" variant="outline" className="rounded-sm">
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

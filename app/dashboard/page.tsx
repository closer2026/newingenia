"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
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
] as const;

export default function DashboardPage() {
  const { role, can } = useRole();

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="ni-surface overflow-hidden"
      >
        <div className="grid grid-cols-5">
          <div className="col-span-3 bg-[#1a1a1a] px-8 py-10 text-white">
            <p className="ni-label text-[#b4b4b4]">NI · Workspace IA</p>
            <h1 className="mt-4 max-w-xl text-4xl font-semibold leading-tight tracking-tight">
              Faites passer votre intelligence operationnelle a un niveau superieur.
            </h1>
            <p className="mt-4 max-w-xl text-sm text-[#d2d2d2]">
              Bonjour, Arnaud. Votre espace prive centralise la recherche documentaire, la redaction et
              le suivi de reunions pour New Ingenia SA.
            </p>
          </div>
          <div className="col-span-2 bg-[#efefef] px-8 py-10">
            <p className="ni-label">Session demo</p>
            <p className="mt-3 text-sm text-[#5f5f5f]">20 avril 2026</p>
            <p className="mt-2 text-sm text-[#5f5f5f]">{roleSubtitle(role)}</p>
            <Badge className="mt-6 rounded-sm border border-[#cbcbcb] bg-white text-[#111111]">
              Role actif: {ROLE_LABELS[role]}
            </Badge>
          </div>
        </div>
      </motion.section>

      <div>
        <p className="ni-label">Modules IA</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111]">Vos espaces de travail</h2>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {modules.map((module, index) => {
          const allowed = can(module.key);
          return (
            <motion.div
              key={module.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35 }}
            >
              <Link href={allowed ? module.href : "/dashboard"}>
                <Card
                  className={`overflow-hidden rounded-sm border transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.5)] ${
                    allowed ? "border-[#d8d8d8] bg-white" : "border-[#d8d8d8] bg-[#efefef]"
                  }`}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between text-base tracking-tight">
                      {module.title}
                      {!allowed ? <Lock className="h-4 w-4 text-[#666666]" /> : <ArrowUpRight className="h-4 w-4 text-[#777777]" />}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#666666]">{module.description}</p>
                    {!allowed ? (
                      <p className="mt-3 inline-block rounded-sm border border-[#dadada] bg-white px-2 py-1 text-xs font-medium text-[#8b5a00]">
                        Acces restreint
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <Card className="rounded-sm border-[#d8d8d8]">
        <CardHeader>
          <CardTitle className="text-base tracking-tight">Activite recente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-[#666666]">
          <p>Recherche docs · Profile 45x45 · il y a 2h</p>
          <p>Offre generee · Omega SA · il y a 3h</p>
          <p>Réunion · Projet Cartier SA · hier</p>
          <p>Email redige · Confirmation commande · hier</p>
        </CardContent>
      </Card>
    </div>
  );
}

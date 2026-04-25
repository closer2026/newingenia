"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const timeline = [
  "Demande recue : 3 postes NI'One ESD pour ligne horlogere.",
  "Offre préparée : structure 45x45, surface ESD, éclairage intégré.",
  "Réunion client : dimensions et délai à confirmer.",
  "Relance à faire : validation du plan d'implantation.",
];

export default function FichesClientsPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Client</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Fiches clients</h1>
        <p className="ni-page-lead mt-2">
          Retrouvez les contacts, projets, offres et dernieres interactions d&apos;un client.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Manufacture Horlogere Delta</CardTitle>
            <p className="text-xs text-muted-foreground">Client horloger · Projet postes de travail modulaires</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <p className="ni-label">Contact principal</p>
              <p className="mt-2 font-semibold text-foreground">Claire Martin</p>
              <p className="text-muted-foreground">Responsable methodes · claire.martin@delta-horlogerie.ch</p>
            </div>
            <div className="rounded-2xl border border-border bg-muted/40 p-4">
              <p className="ni-label">Point ouvert</p>
              <p className="mt-2 text-muted-foreground">Valider dimensions, charge maximale et délai souhaité avant offre finale.</p>
            </div>
            <Link
              href="/dashboard/redaction-emails"
              className="inline-flex rounded-2xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:-translate-y-0.5"
            >
              Préparer une relance
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Historique recent</CardTitle>
            <p className="text-xs text-muted-foreground">Résumé utile avant un appel ou une relance.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {timeline.map((item, index) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-border bg-card/80 p-4 text-sm">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                  {index + 1}
                </span>
                <p className="leading-6 text-muted-foreground">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

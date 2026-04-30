"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SubtleGridBackground } from "@/components/decorative/technical-decorations";
import { DemoFlowStatus } from "@/components/layout/DemoFlowStatus";
import { OffreForm } from "@/components/modules/OffreForm";
import { OffrePreview } from "@/components/modules/OffrePreview";
import { readDemoFlow, writeDemoFlow, type DemoFlow } from "@/lib/demo-flow";

export default function RedactionOffresPage() {
  const [generated, setGenerated] = useState(false);
  const [flow, setFlow] = useState<DemoFlow | null>(null);

  useEffect(() => {
    setFlow(readDemoFlow());
  }, []);

  function handleGenerated() {
    setGenerated(true);
    if (flow) {
      const next = { ...flow, stage: "email" as const };
      writeDemoFlow(next);
      setFlow(readDemoFlow());
    }
  }

  const steps = ["Besoin client", "Options techniques", "Aperçu offre", "Email d'envoi"] as const;

  return (
    <div className="relative space-y-6">
      <div className="pointer-events-none absolute -right-4 top-0 h-40 w-52 overflow-hidden rounded-3xl opacity-35">
        <SubtleGridBackground />
      </div>
      <PageHeader
        label="Offre client"
        title="Offres clients"
        lead="Partez d'une demande client, complétez les informations importantes et préparez une base d'offre claire."
      />
      <div className="relative grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`rounded-2xl border px-4 py-3.5 text-sm shadow-[var(--ni-shadow-soft)] transition ${
              index === 2
                ? "border-[color-mix(in_srgb,var(--ni-accent)_30%,transparent)] bg-white/92 backdrop-blur-sm dark:bg-card/90"
                : "border-border/60 bg-white/84 backdrop-blur-sm dark:bg-card/85"
            }`}
          >
            <p className="ni-label">Étape {index + 1}</p>
            <p className="mt-1.5 font-semibold text-foreground">{step}</p>
          </div>
        ))}
      </div>
      <DemoFlowStatus flow={flow} onReset={() => setFlow(null)} />
      {generated && flow ? (
        <div className="ni-soft-panel flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Offre générée pour {flow.company}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Étape suivante : préparer l&apos;email de suivi client à partir de cette offre.
            </p>
          </div>
          <Link
            href="/dashboard/redaction-emails?from=offer"
            className="inline-flex h-8 items-center justify-center gap-1 rounded-xl bg-primary px-3 text-[0.8rem] font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5"
          >
            Préparer l&apos;email
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-10 gap-5">
        <div className="col-span-4">
          <OffreForm onGenerated={handleGenerated} demoCompany={flow?.company} demoContact={flow?.contact} />
        </div>
        <div className="col-span-6">
          <OffrePreview generated={generated} />
        </div>
      </motion.div>
    </div>
  );
}

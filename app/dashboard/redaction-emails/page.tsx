"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoFlowStatus } from "@/components/layout/DemoFlowStatus";
import { EmailForm } from "@/components/modules/EmailForm";
import { EmailPreview } from "@/components/modules/EmailPreview";
import { readDemoFlow, writeDemoFlow, type DemoFlow } from "@/lib/demo-flow";

export default function RedactionEmailsPage() {
  const [generated, setGenerated] = useState(false);
  const [flow, setFlow] = useState<DemoFlow | null>(null);

  useEffect(() => {
    setFlow(readDemoFlow());
  }, []);

  function handleGenerate() {
    setGenerated(true);
    if (flow) {
      const next = { ...flow, stage: "task" as const };
      writeDemoFlow(next);
      setFlow(readDemoFlow());
    }
  }

  return (
    <div className="space-y-5">
      <DemoFlowStatus flow={flow} onReset={() => setFlow(null)} />
      {generated && flow ? (
        <div className="ni-soft-panel flex items-center justify-between gap-4 p-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Email de suivi prêt pour {flow.company}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Dernière étape demo : créer une action de suivi dans la file des tâches.
            </p>
          </div>
          <Link
            href="/dashboard/taches?from=email"
            className="inline-flex h-8 items-center justify-center gap-1 rounded-xl bg-primary px-3 text-[0.8rem] font-semibold text-primary-foreground shadow-sm transition hover:-translate-y-0.5"
          >
            Voir la tâche créée
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-5">
        <EmailForm
          onGenerate={handleGenerate}
          demoContact={flow?.contact}
          demoCompany={flow?.company}
          demoMessage={flow?.message}
        />
        <EmailPreview generated={generated} />
      </motion.div>
    </div>
  );
}

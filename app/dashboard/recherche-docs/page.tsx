"use client";

import { DocsChat } from "@/components/modules/DocsChat";
import { PdfViewer } from "@/components/modules/PdfViewer";
import { motion } from "framer-motion";

export default function RechercheDocsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="space-y-7">
      <div>
        <p className="ni-label">Document technique</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Recherche technique</h1>
        <p className="ni-page-lead mt-2">
          Posez une question. L&apos;outil retrouve les documents utiles et affiche les sources.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {["Question", "Sources", "Réponse", "Vérification"].map((step, index) => (
          <div key={step} className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm shadow-sm">
            <p className="ni-label">Étape {index + 1}</p>
            <p className="mt-1 font-semibold text-foreground">{step}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-3">
          <DocsChat />
        </div>
        <div className="col-span-2">
          <PdfViewer />
        </div>
      </div>
    </motion.div>
  );
}

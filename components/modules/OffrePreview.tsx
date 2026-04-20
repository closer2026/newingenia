"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NiLogo } from "@/components/layout/NiLogo";

export function OffrePreview({ generated }: { generated: boolean }) {
  return (
    <Card className="ni-surface h-full rounded-sm">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base tracking-tight">Apercu de l&apos;offre</CardTitle>
        <Badge className="rounded-sm border border-emerald-200 bg-emerald-100 text-emerald-700">Genere par IA</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <motion.div
          key={generated ? "on" : "off"}
          initial={{ opacity: 0.2, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-sm border border-[#dddddd] bg-white p-5 text-sm"
        >
          <div className="mb-3 flex items-center justify-between"><NiLogo /><p>Offre N° 2026-041 · Date : 20 avril 2026</p></div>
          <p className="font-medium">Destinataire : Omega SA</p>
          <div className="mt-3 rounded-sm border border-[#dddddd] bg-[#f8f8f8] p-2 text-xs">
            Ref 3 842 990 026 · Profile 45x45 renforce · Qt 4 · CHF 2&apos;950
            <br />
            Ref 3 842 993 110 · Surface ESD · Qt 1 · CHF 1&apos;200
          </div>
          <p className="mt-3 text-xs">Conditions: livraison fin mai 2026, validite 30 jours, installation sur site incluse.</p>
          <p className="mt-4 text-xs">Signature: Arnaud Dupont · Direction</p>
        </motion.div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="rounded-sm bg-[#1f1f1f] hover:bg-black">Exporter PDF</Button>
          <Button size="sm" variant="outline" className="rounded-sm">Envoyer par email</Button>
          <Button size="sm" variant="outline" className="rounded-sm">Regenerer</Button>
        </div>
        <p className="text-xs text-[#666666]">{generated ? "Modifie il y a 2 min" : "Apercu en attente de generation"}</p>
      </CardContent>
    </Card>
  );
}

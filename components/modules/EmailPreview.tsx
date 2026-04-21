"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EmailPreview({ generated }: { generated: boolean }) {
  return (
    <Card className="ni-surface rounded-lg">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base tracking-tight">Apercu email</CardTitle>
        <Badge className="rounded-sm border border-emerald-200 bg-emerald-100 text-emerald-700">Genere par IA · Professionnel</Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <motion.div
          key={generated ? "gen" : "idle"}
          initial={{ opacity: 0.3, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md border border-border bg-card"
        >
          <div className="rounded-t-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">NI · New Ingenia SA</div>
          <div className="space-y-2 p-4 text-sm text-foreground">
            <p><strong>A:</strong> Marc Leroy · Cartier SA</p>
            <p><strong>Objet:</strong> Confirmation commande postes de travail</p>
            <p>Bonjour Monsieur Leroy,</p>
            <p>Nous confirmons la prise en charge de votre commande de postes de travail NI&apos;One, avec integration surface ESD. La livraison est planifiee pour fin mai 2026, sous reserve de validation finale du plan.</p>
            <p>Cordialement,<br />Arnaud Dupont<br />Direction · New Ingenia SA<br />+41 32 420 76 80</p>
          </div>
        </motion.div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="rounded-sm">Envoyer</Button>
          <Button size="sm" variant="outline" className="rounded-sm" onClick={() => toast.success("Email copie !")}>Copier</Button>
          <Button size="sm" variant="outline" className="rounded-sm">Regenerer</Button>
          <Button size="sm" variant="outline" className="rounded-sm">Modifier manuellement</Button>
        </div>
      </CardContent>
    </Card>
  );
}

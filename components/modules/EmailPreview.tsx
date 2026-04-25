"use client";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function EmailPreview({ generated }: { generated: boolean }) {
  return (
    <Card className="ni-surface rounded-lg">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base tracking-tight">Aperçu email</CardTitle>
          <p className="text-xs text-muted-foreground">Format NI : destinataire, message clair et signature.</p>
        </div>
        <Badge className="rounded-xl border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-500/14 dark:text-emerald-200">Brouillon à relire</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          key={generated ? "gen" : "idle"}
          initial={{ opacity: 0.3, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md border border-border bg-card"
        >
          <div className="rounded-t-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">NI · New Ingenia SA</div>
          <div className="space-y-2 p-4 text-sm text-foreground">
            <p><strong>A:</strong> Claire Martin · Manufacture Horlogere Delta</p>
            <p><strong>Objet:</strong> Votre offre pour 3 postes NI&apos;One ESD</p>
            <p>Bonjour Madame Martin,</p>
            <p>Veuillez trouver ci-joint notre proposition pour 3 postes NI&apos;One avec surface ESD, éclairage intégré et rangements outils. Nous vous proposons un point de 30 minutes pour valider les dimensions, la charge maximale et le délai souhaité.</p>
            <p>Cordialement,<br />Arnaud Dupont<br />Direction · New Ingenia SA<br />+41 32 420 76 80</p>
          </div>
        </motion.div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" className="rounded-sm">
            Marquer comme prêt à envoyer
          </Button>
          <Button size="sm" variant="outline" className="rounded-sm" onClick={() => toast.success("Texte copie dans le presse-papier")}>
            Copier le corps
          </Button>
          <Button size="sm" variant="outline" className="rounded-sm">
            Adapter le ton
          </Button>
          <Button size="sm" variant="outline" className="rounded-sm">
            Editer manuellement
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

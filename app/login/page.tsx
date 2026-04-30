"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NiLogo } from "@/components/layout/NiLogo";
import { SubtleGridBackground } from "@/components/decorative/technical-decorations";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => router.push("/dashboard?welcome=1"), 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--ni-bg)] px-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_15%,rgba(90,111,136,0.12),transparent_50%),radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(255,255,255,0.7),transparent_45%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <SubtleGridBackground />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full max-w-md">
        <Card className="overflow-hidden rounded-[1.25rem] border border-white/70 bg-[var(--ni-surface)] shadow-[var(--ni-shadow-card)] ring-1 ring-[var(--ni-border)]">
          <CardContent className="space-y-5 p-7">
            <NiLogo />
            <div>
              <p className="ni-label">Espace sécurisé</p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-foreground">Connexion collaborateurs</h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Accès au workspace interne NI : demandes, offres, facturation, documents, projets et visuels.
              </p>
            </div>
            <div className="space-y-3">
              <Label>Email</Label>
              <Input defaultValue="claire.martin@newingenia.ch" />
              <Label>Mot de passe</Label>
              <Input defaultValue="••••••••" type="password" />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full rounded-2xl">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Accéder au tableau de bord"}
            </Button>
            <p className="text-center text-xs leading-relaxed text-muted-foreground">
              Accès réservé aux collaborateurs New Ingenia SA. Les identifiants sont préremplis pour la présentation.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

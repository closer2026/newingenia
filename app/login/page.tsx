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

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => router.push("/dashboard"), 1000);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#161616] px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.08),transparent_38%),linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:100%,36px_36px,36px_36px]" />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="z-10 w-full max-w-md">
        <Card className="rounded-sm border-[#dbdbdb] bg-white/95 shadow-[0_24px_52px_-30px_rgba(0,0,0,0.6)]">
          <CardContent className="space-y-5 p-7">
            <NiLogo />
            <div>
              <p className="ni-label">Espace securise</p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-[#111111]">Connexion</h1>
              <p className="text-sm text-[#666666]">Plateforme IA privee · New Ingenia SA</p>
            </div>
            <div className="space-y-3">
              <Label>Email</Label>
              <Input defaultValue="arnaud.dupont@newingenia.ch" />
              <Label>Mot de passe</Label>
              <Input defaultValue="••••••••" type="password" />
            </div>
            <Button onClick={handleLogin} disabled={loading} className="w-full rounded-sm bg-[#191919] hover:bg-[#000000]">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Se connecter"}
            </Button>
            <p className="text-center text-xs text-[#666666]">Acces reserve aux collaborateurs New Ingenia SA</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

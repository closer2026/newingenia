"use client";

import { Bell, Moon, Shield, Sun, UserCog } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useState } from "react";

export default function ParametresPage() {
  const { theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [digestEnabled, setDigestEnabled] = useState(true);
  const [autoSummaryEnabled, setAutoSummaryEnabled] = useState(true);

  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Configuration</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Paramètres workspace</h1>
        <p className="ni-page-lead mt-2">
          Réglages visuels et préférences de notification. Les changements restent dans le navigateur (pas de
          sauvegarde serveur).
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="rounded-lg border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base tracking-tight">
              <UserCog className="h-4 w-4" />
              Profil administrateur
            </CardTitle>
            <p className="text-xs text-muted-foreground">Identite affichee dans l&apos;en-tete et les emails signes NI.</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div className="rounded-md border border-border bg-card p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Nom</p>
              <p className="mt-1 font-medium text-foreground">Arnaud Dupont</p>
            </div>
            <div className="rounded-md border border-border bg-card p-3">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Email</p>
              <p className="mt-1 font-medium text-foreground">arnaud.dupont@newingenia.ch</p>
            </div>
            <Button className="rounded-md">Enregistrer les infos profil</Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-border shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base tracking-tight">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              Apparence de la plateforme
            </CardTitle>
            <p className="text-xs text-muted-foreground">Choisissez le contraste adapté à la salle de réunion ou au bureau.</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Selectionnez le theme principal de votre environnement de travail.</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme("light")}
                className={`rounded-md border p-3 text-left transition ${
                  theme === "light" ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:bg-muted"
                }`}
              >
                <p className="text-sm font-medium">Mode clair</p>
                <p className="mt-1 text-xs text-muted-foreground">Ideal pour les bureaux lumineux</p>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`rounded-md border p-3 text-left transition ${
                  theme === "dark" ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:bg-muted"
                }`}
              >
                <p className="text-sm font-medium">Mode sombre</p>
                <p className="mt-1 text-xs text-muted-foreground">Confort visuel en usage prolonge</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-lg border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base tracking-tight">
            <Bell className="h-4 w-4" />
            Notifications internes
          </CardTitle>
          <p className="text-xs text-muted-foreground">Montrez quels rappels pourraient aider l&apos;équipe au quotidien.</p>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
          {[
            {
              label: "Alertes demandes entrantes prioritaires",
              enabled: notificationsEnabled,
              onToggle: () => setNotificationsEnabled((value) => !value),
            },
            {
              label: "Resumes quotidiens des pages importantes",
              enabled: digestEnabled,
              onToggle: () => setDigestEnabled((value) => !value),
            },
            {
              label: "Rappels actions réunion à traiter",
              enabled: autoSummaryEnabled,
              onToggle: () => setAutoSummaryEnabled((value) => !value),
            },
          ].map((item) => (
            <div key={item.label} className="rounded-md border border-border bg-card p-3">
              <p className="font-medium text-foreground">{item.label}</p>
              <p className="mt-1 text-xs">Active par defaut pour le compte administrateur.</p>
              <button
                onClick={item.onToggle}
                className={`mt-3 rounded-md border px-2.5 py-1 text-xs transition ${
                  item.enabled
                    ? "border-emerald-300 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "border-border bg-muted text-muted-foreground"
                }`}
              >
                {item.enabled ? "Notifications actives" : "Notifications coupees"}
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-lg border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base tracking-tight">
            <Shield className="h-4 w-4" />
            Gouvernance workspace
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed text-muted-foreground">
          Compte administrateur unique pour cette maquette : sert à montrer l&apos;intégralité des écrans sans gérer plusieurs
          logins techniques pendant la présentation.
        </CardContent>
      </Card>
    </div>
  );
}

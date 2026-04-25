"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChatbotWidget } from "@/components/layout/ChatbotWidget";
import { DashboardEntryIntro } from "@/components/layout/DashboardEntryIntro";
import { ToolContextBar } from "@/components/layout/ToolContextBar";

const labels: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/demo": "Parcours demo",
  "/dashboard/taches": "Taches",
  "/dashboard/facturation": "Creation facture",
  "/dashboard/linkedin": "Linkedin",
  "/dashboard/demandes-entrantes": "Demandes entrantes",
  "/dashboard/recherche-docs": "Recherche docs",
  "/dashboard/redaction-offres": "Redaction offres",
  "/dashboard/reunion-ia": "Réunion IA",
  "/dashboard/redaction-emails": "Redaction emails",
  "/dashboard/triage-emails": "Triage emails",
  "/dashboard/studio-visuel": "Studio 3D",
  "/dashboard/studio-marketing": "Studio marketing",
  "/dashboard/veille": "Veille",
  "/dashboard/gestion-roles": "Gestion des roles",
  "/dashboard/parametres": "Parametres",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <DashboardEntryIntro />
      <div className="mx-auto flex min-h-screen w-full min-w-[1280px]">
        <Sidebar collapsed={sidebarCollapsed} />
        <div className="relative flex min-h-screen flex-1 flex-col overflow-x-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(37,37,37,0.10),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(255,255,255,0.85),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.55),transparent_36%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_88%_16%,rgba(255,255,255,0.05),transparent_26%)]" />
          <Topbar
            breadcrumb={labels[pathname] ?? "Tableau de bord"}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
          />
          <main className="relative z-10 flex-1 px-8 py-9">
            <div className="mx-auto w-full max-w-[1320px]">
              <ToolContextBar />
              {children}
            </div>
          </main>
          <ChatbotWidget />
        </div>
      </div>
    </div>
  );
}

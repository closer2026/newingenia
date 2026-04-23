"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChatbotWidget } from "@/components/layout/ChatbotWidget";
import { DashboardEntryIntro } from "@/components/layout/DashboardEntryIntro";

const labels: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/taches": "Taches",
  "/dashboard/suivi-projets": "Suivi de projets",
  "/dashboard/crm": "CRM",
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
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(120,119,198,0.12),transparent_28%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_18%_12%,rgba(120,119,198,0.2),transparent_30%),radial-gradient(circle_at_86%_18%,rgba(14,165,233,0.14),transparent_24%)]" />
          <Topbar
            breadcrumb={labels[pathname] ?? "Tableau de bord"}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
          />
          <main className="relative z-10 flex-1 px-8 py-7">
            <div className="mx-auto w-full max-w-[1320px]">{children}</div>
          </main>
          <ChatbotWidget />
        </div>
      </div>
    </div>
  );
}

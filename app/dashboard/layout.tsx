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
  "/dashboard/demo": "Parcours de présentation",
  "/dashboard/taches": "Tâches",
  "/dashboard/facturation": "Facturation",
  "/dashboard/linkedin": "Communication LinkedIn",
  "/dashboard/demandes-entrantes": "Demandes entrantes",
  "/dashboard/recherche-docs": "Recherche technique",
  "/dashboard/redaction-offres": "Offres clients",
  "/dashboard/reunion-ia": "Réunion",
  "/dashboard/redaction-emails": "Emails clients",
  "/dashboard/triage-emails": "Priorisation emails",
  "/dashboard/fiches-clients": "Fiches clients",
  "/dashboard/studio-visuel": "Studio 3D",
  "/dashboard/studio-marketing": "Studio Marketing",
  "/dashboard/veille": "Veille",
  "/dashboard/gestion-roles": "Accès & rôles",
  "/dashboard/parametres": "Paramètres",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const sidebarWidth = sidebarCollapsed ? "80px" : "240px";
  return (
    <div className="min-h-dvh">
      <DashboardEntryIntro />
      <aside
        className="fixed left-0 top-0 z-40 h-dvh transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ width: sidebarWidth }}
      >
        <Sidebar collapsed={sidebarCollapsed} />
      </aside>
      <div
        className="relative flex min-h-dvh min-w-0 flex-col transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ paddingLeft: sidebarWidth }}
      >
        <div
          className="pointer-events-none absolute right-0 top-0 h-[360px] w-[420px] opacity-[0.16]"
          aria-hidden
        >
          <div className="absolute right-8 top-6 h-56 w-56 rotate-45 rounded-[2rem] border border-[#677991]/35" />
          <div className="absolute right-20 top-20 h-40 w-40 rotate-45 rounded-[1.6rem] border border-[#677991]/30" />
          <div className="absolute right-3 top-32 h-px w-72 bg-[#677991]/30" />
          <div className="absolute right-36 top-0 h-72 w-px bg-[#677991]/20" />
        </div>
        <div className="sticky top-0 z-20">
          <Topbar
            breadcrumb={labels[pathname] ?? "Tableau de bord"}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
          />
        </div>
        <main className="relative z-10 flex-1 px-5 py-7 sm:px-7 sm:py-8">
          <div className="mx-auto w-full max-w-[1280px]">
            <ToolContextBar />
            {children}
          </div>
        </main>
        <ChatbotWidget />
      </div>
    </div>
  );
}

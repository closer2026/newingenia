"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { ChatbotWidget } from "@/components/layout/ChatbotWidget";

const labels: Record<string, string> = {
  "/dashboard": "Tableau de bord",
  "/dashboard/taches": "Taches",
  "/dashboard/facturation": "Creation facture",
  "/dashboard/linkedin": "Linkedin",
  "/dashboard/demandes-entrantes": "Demandes entrantes",
  "/dashboard/recherche-docs": "Recherche docs",
  "/dashboard/redaction-offres": "Redaction offres",
  "/dashboard/reunion-ia": "Réunion",
  "/dashboard/redaction-emails": "Redaction emails",
  "/dashboard/triage-emails": "Triage emails",
  "/dashboard/gestion-roles": "Gestion des roles",
  "/dashboard/parametres": "Parametres",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#ececec]">
      <div className="mx-auto flex min-h-screen w-full min-w-[1280px]">
        <Sidebar />
        <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.66),rgba(255,255,255,0.66)),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:100%,42px_42px,42px_42px]" />
          <Topbar breadcrumb={labels[pathname] ?? "Tableau de bord"} />
          <main className="relative z-10 flex-1 px-8 py-7">{children}</main>
          <ChatbotWidget />
        </div>
      </div>
    </div>
  );
}

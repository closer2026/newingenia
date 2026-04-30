import { Home, Inbox, Mail, Mic, Search, FileText, Box, Route, Building2, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ModuleKey } from "./roles";

export type NavItem = {
  key?: ModuleKey;
  label: string;
  href?: string;
  icon?: LucideIcon;
  section?: boolean;
  adminOnly?: boolean;
};

export const navItems: NavItem[] = [
  { key: "dashboard", label: "Tableau de bord", href: "/dashboard", icon: Home },
  { key: "demo", label: "Parcours de présentation", href: "/dashboard/demo", icon: Route },
  { key: "taches", label: "Tâches", href: "/dashboard/taches", icon: FileText },
  { label: "Commercial", section: true },
  { key: "demandes-entrantes", label: "Demandes entrantes", href: "/dashboard/demandes-entrantes", icon: Inbox },
  {
    key: "recherche-docs",
    label: "Recherche technique",
    href: "/dashboard/recherche-docs",
    icon: Search,
  },
  {
    key: "redaction-offres",
    label: "Offres clients",
    href: "/dashboard/redaction-offres",
    icon: FileText,
  },
  { key: "facturation", label: "Facturation", href: "/dashboard/facturation", icon: FileText },
  {
    key: "redaction-emails",
    label: "Emails clients",
    href: "/dashboard/redaction-emails",
    icon: Mail,
  },
  {
    key: "triage-emails",
    label: "Priorisation emails",
    href: "/dashboard/triage-emails",
    icon: Inbox,
  },
  { key: "linkedin", label: "Communication LinkedIn", href: "/dashboard/linkedin", icon: Mail },
  { key: "fiches-clients", label: "Fiches clients", href: "/dashboard/fiches-clients", icon: Building2 },
  { label: "Technique", section: true },
  {
    key: "studio-visuel",
    label: "Studio 3D",
    href: "/dashboard/studio-visuel",
    icon: Box,
  },
  { key: "reunion-ia", label: "Réunion", href: "/dashboard/reunion-ia", icon: Mic },
  { label: "Création", section: true },
  {
    key: "studio-marketing",
    label: "Studio Marketing",
    href: "/dashboard/studio-marketing",
    icon: Sparkles,
  },
];

export const users = [
  { name: "Arnaud Dupont", role: "admin", email: "arnaud.dupont@newingenia.ch", lastLogin: "aujourd'hui" },
  { name: "Marc Lambert", role: "manager", email: "marc.lambert@newingenia.ch", lastLogin: "hier" },
  { name: "Sophie Favre", role: "manager", email: "sophie.favre@newingenia.ch", lastLogin: "19 avril" },
  { name: "Jean Dumont", role: "technicien", email: "jean.dumont@newingenia.ch", lastLogin: "18 avril" },
  { name: "Pierre Rosse", role: "technicien", email: "pierre.rosse@newingenia.ch", lastLogin: "15 avril" },
];

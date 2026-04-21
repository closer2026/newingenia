import { Home, Inbox, Mail, Mic, Search, Shield, FileText, Box } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ModuleKey } from "./roles";

export type NavItem = {
  key: ModuleKey;
  label: string;
  href: string;
  icon: LucideIcon;
  adminOnly?: boolean;
};

export const navItems: NavItem[] = [
  { key: "dashboard", label: "Tableau de bord", href: "/dashboard", icon: Home },
  { key: "taches", label: "Taches", href: "/dashboard/taches", icon: FileText },
  { key: "facturation", label: "Creation facture", href: "/dashboard/facturation", icon: FileText },
  { key: "linkedin", label: "Linkedin", href: "/dashboard/linkedin", icon: Mail },
  { key: "demandes-entrantes", label: "Demandes entrantes", href: "/dashboard/demandes-entrantes", icon: Inbox },
  {
    key: "recherche-docs",
    label: "Recherche docs",
    href: "/dashboard/recherche-docs",
    icon: Search,
  },
  {
    key: "redaction-offres",
    label: "Redaction offres",
    href: "/dashboard/redaction-offres",
    icon: FileText,
  },
  { key: "reunion-ia", label: "Réunion", href: "/dashboard/reunion-ia", icon: Mic },
  {
    key: "redaction-emails",
    label: "Redaction emails",
    href: "/dashboard/redaction-emails",
    icon: Mail,
  },
  {
    key: "triage-emails",
    label: "Triage emails",
    href: "/dashboard/triage-emails",
    icon: Inbox,
  },
  {
    key: "studio-visuel",
    label: "Studio visuel intelligent",
    href: "/dashboard/studio-visuel",
    icon: Box,
  },
  {
    key: "gestion-roles",
    label: "Gestion des roles",
    href: "/dashboard/gestion-roles",
    icon: Shield,
    adminOnly: true,
  },
];

export const users = [
  { name: "Arnaud Dupont", role: "admin", email: "arnaud.dupont@newingenia.ch", lastLogin: "aujourd'hui" },
  { name: "Marc Lambert", role: "manager", email: "marc.lambert@newingenia.ch", lastLogin: "hier" },
  { name: "Sophie Favre", role: "manager", email: "sophie.favre@newingenia.ch", lastLogin: "19 avril" },
  { name: "Jean Dumont", role: "technicien", email: "jean.dumont@newingenia.ch", lastLogin: "18 avril" },
  { name: "Pierre Rosse", role: "technicien", email: "pierre.rosse@newingenia.ch", lastLogin: "15 avril" },
];

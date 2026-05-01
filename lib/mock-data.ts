import {
  Home,
  Inbox,
  Mail,
  Mic,
  Search,
  FileText,
  Box,
  Route,
  Building2,
  Sparkles,
  BadgeCheck,
  BellRing,
  Files,
  Newspaper,
} from "lucide-react";
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

/**
 * Navigation : rôles des modules
 * — Pilotage : synthèse, démo, exécution, arbitrages
 * — Commercial : cycle vente, clients, messages, relances, veille marché/salons/fournisseurs, réunions client
 * — Documentation : corpus technique, recherche interrogative
 * — Studio : production visuelle produit (3D) et marketing (médias)
 */
export const navItems: NavItem[] = [
  /* Pilotage */
  { key: "dashboard", label: "Tableau de bord", href: "/dashboard", icon: Home },
  { key: "demo", label: "Parcours de présentation", href: "/dashboard/demo", icon: Route },
  { key: "taches", label: "Tâches", href: "/dashboard/taches", icon: FileText },
  {
    key: "validations",
    label: "Validations",
    href: "/dashboard/validations",
    icon: BadgeCheck,
  },

  { label: "Commercial", section: true },
  { key: "demandes-entrantes", label: "Demandes entrantes", href: "/dashboard/demandes-entrantes", icon: Inbox },
  { key: "fiches-clients", label: "Fiches clients", href: "/dashboard/fiches-clients", icon: Building2 },
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
  {
    key: "relances",
    label: "Relances",
    href: "/dashboard/relances",
    icon: BellRing,
  },
  { key: "veille", label: "Veille", href: "/dashboard/veille", icon: Newspaper },
  { key: "reunion-ia", label: "Réunion IA", href: "/dashboard/reunion-ia", icon: Mic },

  { label: "Documentation", section: true },
  {
    key: "recherche-docs",
    label: "Recherche technique",
    href: "/dashboard/recherche-docs",
    icon: Search,
  },
  {
    key: "documents",
    label: "Documents",
    href: "/dashboard/documents",
    icon: Files,
  },

  { label: "Studio", section: true },
  {
    key: "studio-visuel",
    label: "Studio 3D",
    href: "/dashboard/studio-visuel",
    icon: Box,
  },
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

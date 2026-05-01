export type AppRole = "admin" | "manager" | "technicien";

export type ModuleKey =
  | "dashboard"
  | "demo"
  | "taches"
  | "validations"
  | "facturation"
  | "linkedin"
  | "demandes-entrantes"
  | "recherche-docs"
  | "documents"
  | "redaction-offres"
  | "reunion-ia"
  | "redaction-emails"
  | "triage-emails"
  | "fiches-clients"
  | "relances"
  | "studio-visuel"
  | "studio-marketing"
  | "veille"
  | "gestion-roles"
  | "parametres";

type PermissionMatrix = Record<AppRole, Record<ModuleKey, boolean>>;

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Admin",
  manager: "Manager",
  technicien: "Technicien",
};

export const ROLE_BADGE_CLASSES: Record<AppRole, string> = {
  admin: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/14 dark:text-emerald-200 dark:border-emerald-300/30",
  manager: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/14 dark:text-blue-200 dark:border-blue-300/30",
  technicien: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-400/14 dark:text-amber-100 dark:border-amber-300/30",
};

export const PERMISSIONS: PermissionMatrix = {
  admin: {
    dashboard: true,
    demo: true,
    taches: true,
    validations: true,
    facturation: true,
    linkedin: true,
    "demandes-entrantes": true,
    "recherche-docs": true,
    documents: true,
    "redaction-offres": true,
    "reunion-ia": true,
    "redaction-emails": true,
    "triage-emails": true,
    "fiches-clients": true,
    relances: true,
    "studio-visuel": true,
    "studio-marketing": true,
    veille: true,
    "gestion-roles": true,
    parametres: true,
  },
  manager: {
    dashboard: true,
    demo: true,
    taches: true,
    validations: true,
    facturation: true,
    linkedin: true,
    "demandes-entrantes": true,
    "recherche-docs": true,
    documents: true,
    "redaction-offres": true,
    "reunion-ia": true,
    "redaction-emails": true,
    "triage-emails": false,
    "fiches-clients": true,
    relances: true,
    "studio-visuel": true,
    "studio-marketing": true,
    veille: true,
    "gestion-roles": false,
    parametres: true,
  },
  technicien: {
    dashboard: true,
    demo: true,
    taches: true,
    validations: true,
    facturation: false,
    linkedin: true,
    "demandes-entrantes": true,
    "recherche-docs": true,
    documents: true,
    "redaction-offres": false,
    "reunion-ia": false,
    "redaction-emails": false,
    "triage-emails": false,
    "fiches-clients": false,
    relances: false,
    "studio-visuel": true,
    "studio-marketing": true,
    veille: false,
    "gestion-roles": false,
    parametres: true,
  },
};

export const roleSubtitle = (role: AppRole) => {
  if (role === "admin") return "Accès complet · Tous les modules disponibles";
  if (role === "manager")
    return "Accès manager · Modules opérationnels disponibles";
  return "Accès technicien · Recherche documentaire uniquement";
};

export const canAccess = (role: AppRole, module: ModuleKey) =>
  PERMISSIONS[role][module];

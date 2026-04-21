export type AppRole = "admin" | "manager" | "technicien";

export type ModuleKey =
  | "dashboard"
  | "taches"
  | "facturation"
  | "linkedin"
  | "demandes-entrantes"
  | "recherche-docs"
  | "redaction-offres"
  | "reunion-ia"
  | "redaction-emails"
  | "triage-emails"
  | "studio-visuel"
  | "gestion-roles"
  | "parametres";

type PermissionMatrix = Record<AppRole, Record<ModuleKey, boolean>>;

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: "Admin",
  manager: "Manager",
  technicien: "Technicien",
};

export const ROLE_BADGE_CLASSES: Record<AppRole, string> = {
  admin: "bg-emerald-100 text-emerald-700 border-emerald-200",
  manager: "bg-blue-100 text-blue-700 border-blue-200",
  technicien: "bg-amber-100 text-amber-700 border-amber-200",
};

export const PERMISSIONS: PermissionMatrix = {
  admin: {
    dashboard: true,
    taches: true,
    facturation: true,
    linkedin: true,
    "demandes-entrantes": true,
    "recherche-docs": true,
    "redaction-offres": true,
    "reunion-ia": true,
    "redaction-emails": true,
    "triage-emails": true,
    "studio-visuel": true,
    "gestion-roles": true,
    parametres: true,
  },
  manager: {
    dashboard: true,
    taches: true,
    facturation: true,
    linkedin: true,
    "demandes-entrantes": true,
    "recherche-docs": true,
    "redaction-offres": true,
    "reunion-ia": true,
    "redaction-emails": true,
    "triage-emails": false,
    "studio-visuel": true,
    "gestion-roles": false,
    parametres: true,
  },
  technicien: {
    dashboard: true,
    taches: true,
    facturation: false,
    linkedin: true,
    "demandes-entrantes": true,
    "recherche-docs": true,
    "redaction-offres": false,
    "reunion-ia": false,
    "redaction-emails": false,
    "triage-emails": false,
    "studio-visuel": true,
    "gestion-roles": false,
    parametres: true,
  },
};

export const roleSubtitle = (role: AppRole) => {
  if (role === "admin") return "Acces complet · Tous les modules disponibles";
  if (role === "manager")
    return "Acces manager · Modules operationnels disponibles";
  return "Acces technicien · Recherche documentaire uniquement";
};

export const canAccess = (role: AppRole, module: ModuleKey) =>
  PERMISSIONS[role][module];

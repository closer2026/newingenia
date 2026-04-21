"use client";

import { createContext, useContext, useMemo } from "react";
import type { AppRole, ModuleKey } from "@/lib/roles";
import { canAccess } from "@/lib/roles";

type RoleContextValue = {
  role: AppRole;
  can: (module: ModuleKey) => boolean;
};

const RoleContext = createContext<RoleContextValue | null>(null);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const role: AppRole = "admin";

  const value = useMemo(
    () => ({
      role,
      can: (module: ModuleKey) => canAccess(role, module),
    }),
    [role]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole doit etre utilise dans RoleProvider");
  }
  return context;
}

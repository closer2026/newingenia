"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/lib/mock-data";
import { ROLE_BADGE_CLASSES } from "@/lib/roles";
import { NiLogo } from "./NiLogo";
import { cn } from "@/lib/utils";

export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const role: "admin" = "admin";

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen shrink-0 flex-col overflow-y-auto border-r border-border bg-sidebar py-6 transition-[width,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        collapsed ? "w-[84px] px-2" : "w-[248px] px-4"
      )}
    >
      <NiLogo compact />

      <div
        className={cn(
          "mt-8 overflow-hidden rounded-lg border border-sidebar-border bg-card transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed ? "max-h-0 scale-95 opacity-0" : "max-h-40 scale-100 opacity-100 p-3"
        )}
      >
        {!collapsed ? (
          <>
          <p className="ni-label mb-2">Session active</p>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-md">
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold tracking-tight text-sidebar-foreground">Arnaud Dupont</p>
              <Badge className={cn("mt-1 rounded-md border text-[10px]", ROLE_BADGE_CLASSES[role])}>
                Admin
              </Badge>
            </div>
          </div>
          </>
        ) : null}
      </div>

      <nav className="mt-6 space-y-1.5">
        {navItems.map((item, index) => {
          if (item.section) {
            return collapsed ? null : (
              <div key={`${item.label}-${index}`} className="pt-2">
                <Separator className="mb-2" />
                <p className="px-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.label}</p>
              </div>
            );
          }

          if (!item.href || !item.icon) {
            return null;
          }

          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <div key={`${item.label}-${index}`}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-md border px-2.5 py-2.5 text-xs transition-all duration-300",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "border-sidebar-primary bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "border-transparent text-muted-foreground hover:border-border hover:bg-card hover:text-foreground"
                )}
                title={item.label}
              >
                <span className={cn("flex items-center gap-2", collapsed && "gap-0")}>
                  <item.icon className="h-3.5 w-3.5 transition group-hover:scale-105" />
                  <span
                    className={cn(
                      "overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      collapsed ? "w-0 translate-x-1 opacity-0" : "w-auto translate-x-0 opacity-100"
                    )}
                  >
                    {item.label}
                  </span>
                </span>
                {!collapsed && item.badge ? (
                  <span
                    className={cn(
                      "rounded-sm border px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em]",
                      item.badge === "urgent" && "border-red-200 bg-red-50 text-red-700",
                      item.badge === "nouveau" && "border-blue-200 bg-blue-50 text-blue-700",
                      item.badge === "auto" && "border-emerald-200 bg-emerald-50 text-emerald-700"
                    )}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            </div>
          );
        })}
      </nav>

      <div
        className={cn(
          "mt-auto overflow-hidden border-t border-border text-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          collapsed ? "max-h-0 pt-0 opacity-0" : "max-h-14 pt-4 opacity-100"
        )}
      >
        {!collapsed ? (
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Version 1.0 · Beta</p>
        ) : null}
      </div>
    </aside>
  );
}

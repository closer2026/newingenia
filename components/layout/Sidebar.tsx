"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export function Sidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    if (profileMenuOpen) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
    return undefined;
  }, [profileMenuOpen]);

  useEffect(() => {
    setProfileMenuOpen(false);
  }, [pathname]);

  return (
    <aside
      className={cn(
        "flex h-full min-h-0 shrink-0 flex-col overflow-y-auto border-r border-white/55 bg-white/88 py-5 shadow-[inset_-1px_0_0_rgba(45,55,70,0.04)] backdrop-blur-xl transition-[width,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/10 dark:bg-[#121821]/94",
        collapsed ? "w-[80px] px-2" : "w-[240px] px-3"
      )}
    >
      <div
        className={cn("px-1", collapsed ? "flex justify-center" : "flex items-center gap-3")}
        suppressHydrationWarning
      >
        {mounted ? (
          <>
            <div
              className={cn(
                "relative shrink-0 overflow-hidden",
                collapsed ? "h-10 w-10" : "h-14 w-14"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- static brand logo */}
              <img
                src="/new-ingenia-logo.png"
                alt="New Ingenia"
                className="h-full w-full object-contain"
              />
            </div>
            {!collapsed ? (
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold tracking-tight text-foreground">
                  Workspace IA
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  New Ingenia SA
                </p>
              </div>
            ) : null}
          </>
        ) : (
          <div className={cn("shrink-0", collapsed ? "h-10 w-10" : "h-14 w-14")} aria-hidden />
        )}
      </div>

      <nav className="mt-8 space-y-1.5">
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
                  "group flex items-center justify-between rounded-2xl border px-3 py-2.5 text-xs font-medium transition-all duration-300",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "border-transparent bg-[#677991] text-white shadow-[0_14px_32px_-22px_rgba(103,121,145,0.85)]"
                    : "border-transparent text-muted-foreground hover:border-border/50 hover:bg-white/80 hover:text-foreground dark:hover:border-white/10 dark:hover:bg-white/8"
                )}
                title={item.label}
              >
                <span className={cn("flex items-center gap-2", collapsed && "gap-0")}>
                  <item.icon
                    className={cn(
                      "h-3.5 w-3.5 transition group-hover:scale-105",
                      isActive && "text-white"
                    )}
                  />
                  <span
                    className={cn(
                      "overflow-hidden whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      collapsed ? "w-0 translate-x-1 opacity-0" : "w-auto translate-x-0 opacity-100"
                    )}
                  >
                    {item.label}
                  </span>
                </span>
              </Link>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 border-t border-border/40 pt-4">
        <div className="relative" ref={profileMenuRef}>
          <button
            type="button"
            onClick={() => setProfileMenuOpen((value) => !value)}
            aria-haspopup="menu"
            aria-expanded={profileMenuOpen}
            aria-label="Ouvrir le menu utilisateur"
            title="Claire Martin · Administrateur"
            className={cn(
              "flex w-full items-center gap-2 rounded-2xl border text-left transition",
              collapsed ? "justify-center px-1 py-1" : "justify-between px-2 py-2.5",
              profileMenuOpen
                ? "border-border/60 bg-white/92 shadow-sm dark:border-white/10 dark:bg-white/12"
                : "border-transparent hover:border-border/50 hover:bg-white/78 dark:hover:border-white/10 dark:hover:bg-white/12"
            )}
          >
            <div className={cn("flex min-w-0 items-center", collapsed ? "justify-center" : "gap-2")}>
              <Avatar className="h-9 w-9 shrink-0 rounded-full border border-border/30">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              {!collapsed ? (
                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold text-foreground">Claire Martin</p>
                  <p className="truncate text-[10px] text-muted-foreground">Administrateur</p>
                </div>
              ) : null}
            </div>
            {!collapsed ? (
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  profileMenuOpen && "rotate-180"
                )}
                aria-hidden
              />
            ) : null}
          </button>

          {profileMenuOpen ? (
            <div
              role="menu"
              className={cn(
                "absolute bottom-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-border/60 bg-popover p-1.5 shadow-2xl ring-1 ring-foreground/5 backdrop-blur-xl",
                collapsed ? "left-1/2 w-44 -translate-x-1/2" : "left-0 right-0"
              )}
            >
              <Link
                href="/dashboard/parametres"
                role="menuitem"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-popover-foreground transition hover:bg-muted dark:hover:bg-white/8"
              >
                <Settings className="h-3.5 w-3.5" />
                Paramètres
              </Link>
              <Link
                href="/login"
                role="menuitem"
                onClick={() => setProfileMenuOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/12"
              >
                <LogOut className="h-3.5 w-3.5" />
                Déconnexion
              </Link>
            </div>
          ) : null}
        </div>
        {!collapsed ? (
          <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Version 1.0 · Beta</p>
        ) : null}
      </div>
    </aside>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, Command, Moon, PanelLeftClose, PanelLeftOpen, Search, Settings, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { CommandPalette } from "./CommandPalette";

export function Topbar({
  breadcrumb = "Tableau de bord",
  sidebarCollapsed = false,
  onToggleSidebar,
}: {
  breadcrumb?: string;
  sidebarCollapsed?: boolean;
  onToggleSidebar?: () => void;
}) {
  const { theme, toggleTheme } = useTheme();
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [openNotificationMenu, setOpenNotificationMenu] = useState(false);
  const [openPalette, setOpenPalette] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!profileMenuRef.current?.contains(event.target as Node)) setOpenProfileMenu(false);
      if (!notificationRef.current?.contains(event.target as Node)) setOpenNotificationMenu(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpenPalette((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="flex h-[68px] items-center gap-4 border-b border-border/80 bg-background/90 px-6 backdrop-blur xl:px-8">
        <div className="flex min-w-56 items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleSidebar}
            className="h-8 w-8 rounded-md border border-border text-muted-foreground"
            title={sidebarCollapsed ? "Deplier le menu" : "Plier le menu"}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <div>
          <p className="ni-label">Workspace navigation</p>
          <p className="text-sm font-semibold tracking-tight text-foreground">{breadcrumb}</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] text-emerald-800 xl:flex">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Mode demo actif
          </div>
          <button
            onClick={() => setOpenPalette(true)}
            className="hidden h-11 w-full max-w-xl items-center justify-between rounded-md border border-border bg-card px-3 text-xs text-muted-foreground transition hover:bg-muted lg:flex"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              Recherche globale des modules et actions
            </span>
            <span className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5">
              <Command className="h-3 w-3" />K
            </span>
          </button>

          <div className="flex h-11 items-center gap-2 rounded-lg border border-border bg-card px-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-md text-muted-foreground"
              title="Basculer le theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="relative" ref={notificationRef}>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpenNotificationMenu((value) => !value)}
                className="h-9 w-9 rounded-md text-muted-foreground"
              >
                <Bell className="h-4 w-4" />
              </Button>
              {openNotificationMenu ? (
                <div className="absolute right-0 top-12 z-30 w-80 rounded-lg border border-border bg-popover p-3 shadow-xl">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Centre de notifications
                  </p>
                  <div className="space-y-2">
                    {[
                      "12 demandes entrantes a qualifier",
                      "Reunion production: synthese disponible",
                      "Offre Helio Industrie prete pour validation",
                    ].map((item) => (
                      <div key={item} className="rounded-md border border-border bg-card px-3 py-2 text-sm text-popover-foreground">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setOpenProfileMenu((value) => !value)}
                className="flex h-9 items-center gap-2 rounded-md px-2 transition hover:bg-muted"
              >
                <Avatar className="h-8 w-8 rounded-md">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {openProfileMenu ? (
                <div
                  className="pointer-events-auto absolute right-0 top-12 z-30 w-64 rounded-lg border border-border bg-popover p-3 shadow-xl"
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mb-3 border-b border-border pb-3">
                    <p className="text-sm font-semibold text-popover-foreground">Arnaud Dupont</p>
                    <p className="text-xs text-muted-foreground">Administrateur principal</p>
                  </div>
                  <a
                    href="/dashboard/parametres"
                    className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-popover-foreground transition hover:bg-muted"
                  >
                    <Settings className="h-4 w-4" />
                    Ouvrir les parametres
                  </a>
                  <a
                    href="/login"
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm text-popover-foreground transition hover:bg-muted"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-rose-500" />
                    Deconnexion
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>
      <CommandPalette open={openPalette} onClose={() => setOpenPalette(false)} />
    </>
  );
}

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
      <header className="flex h-[68px] items-center gap-4 border-b border-border/50 bg-white/88 px-6 shadow-[0_12px_40px_-36px_rgba(45,60,78,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-[#121821]/92 xl:px-8">
        <div className="flex min-w-72 items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={onToggleSidebar}
            className="h-9 w-9 rounded-xl border border-border/60 bg-white/82 text-muted-foreground shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/14"
            title={sidebarCollapsed ? "Deplier le menu" : "Plier le menu"}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
          <div>
            <p className="ni-label">Vue</p>
            <p className="text-sm font-semibold tracking-tight text-foreground">{breadcrumb}</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <button
            onClick={() => setOpenPalette(true)}
            className="hidden h-11 w-full max-w-xl items-center justify-between rounded-2xl border border-border/60 bg-white/78 px-4 text-xs text-muted-foreground shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/92 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/14 lg:flex"
          >
            <span className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5" />
              Recherche globale des modules et actions
            </span>
            <span className="flex items-center gap-1 rounded border border-border px-1.5 py-0.5">
              <Command className="h-3 w-3" />K
            </span>
          </button>

          <div className="flex h-11 items-center gap-1 rounded-2xl border border-border/50 bg-white/82 px-1.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/10">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-xl text-muted-foreground"
              title="Basculer le theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <div className="relative" ref={notificationRef}>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setOpenNotificationMenu((value) => !value)}
                className="h-9 w-9 rounded-xl text-muted-foreground"
              >
                <Bell className="h-4 w-4" />
              </Button>
              {openNotificationMenu ? (
                <div className="absolute right-0 top-12 z-30 w-80 rounded-2xl border border-border/50 bg-popover p-3 shadow-2xl backdrop-blur-xl">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    Centre de notifications
                  </p>
                  <div className="space-y-2">
                    {[
                      "12 demandes entrantes à qualifier",
                      "Réunion production : synthèse disponible",
                      "Offre Helio Industrie prete pour validation",
                    ].map((item) => (
                      <div key={item} className="rounded-xl border border-border/75 bg-card/88 px-3 py-2 text-sm text-popover-foreground">
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
                className="flex h-9 items-center gap-2 rounded-xl px-2 transition hover:bg-muted"
              >
                  <Avatar className="h-8 w-8 rounded-xl">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {openProfileMenu ? (
                <div
                  className="pointer-events-auto absolute right-0 top-12 z-30 w-64 rounded-2xl border border-border/50 bg-popover p-3 shadow-2xl backdrop-blur-xl"
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  <div className="mb-3 border-b border-border pb-3">
                    <p className="text-sm font-semibold text-popover-foreground">Claire Martin</p>
                    <p className="text-xs text-muted-foreground">Administrateur</p>
                  </div>
                  <a
                    href="/dashboard/parametres"
                    className="mb-2 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-popover-foreground transition hover:bg-muted"
                  >
                    <Settings className="h-4 w-4" />
                    Ouvrir les parametres
                  </a>
                  <a
                    href="/login"
                    className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-sm text-popover-foreground transition hover:bg-muted"
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

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { navItems } from "@/lib/mock-data";

type CommandPaletteProps = {
  open: boolean;
  onClose: () => void;
};

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const searchableItems = navItems.filter((item) => Boolean(item.href));
    if (!normalized) return searchableItems;
    return searchableItems.filter(
      (item) =>
        item.label.toLowerCase().includes(normalized) ||
        item.href!.toLowerCase().includes(normalized)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#696969]/35 p-8 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-xl border border-border bg-popover shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une page, un client, une action..."
            className="w-full bg-transparent text-sm text-popover-foreground outline-none placeholder:text-muted-foreground"
          />
          <span className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">ESC</span>
        </div>
        <div className="max-h-[420px] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-2 py-6 text-center text-sm text-muted-foreground">Aucun resultat</p>
          ) : (
            results.map((item) => (
              <Link
                key={item.href!}
                href={item.href!}
                onClick={onClose}
                className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-popover-foreground transition hover:bg-muted"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

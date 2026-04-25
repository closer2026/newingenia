"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ToolHelp } from "@/lib/tool-help";

export function ToolHelpDialog({
  help,
  open,
  onClose,
}: {
  help: ToolHelp | undefined;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !help) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <button
        type="button"
        aria-label="Fermer la fiche outil"
        className="absolute inset-0 bg-[#252525]/35 backdrop-blur-sm"
        onClick={onClose}
      />
      <section className="ni-glass-panel relative w-full max-w-3xl overflow-hidden p-0">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_18%_0%,rgba(37,37,37,0.16),transparent_58%),linear-gradient(135deg,rgba(255,255,255,0.72),transparent)] dark:bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.10),transparent_58%)]" />
        <div className="relative flex items-start justify-between gap-6 border-b border-border/70 px-7 py-6">
          <div>
            <p className="ni-label">{help.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{help.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{help.value}</p>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Fermer" className="shrink-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 px-7 py-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="ni-soft-panel p-5">
            <p className="text-sm font-semibold text-foreground">Comment ça fonctionne</p>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
              {help.how.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div className="ni-soft-panel p-5">
              <p className="text-sm font-semibold text-foreground">Ce que ça génère</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{help.output}</p>
            </div>
            <div className="rounded-2xl border border-foreground/10 bg-foreground px-5 py-5 text-background shadow-[0_20px_50px_-32px_rgba(37,37,37,0.9)] dark:bg-white dark:text-[#252525]">
              <p className="text-sm font-semibold">Cas d’usage entreprise</p>
              <p className="mt-3 text-sm leading-6 opacity-80">{help.businessCase}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

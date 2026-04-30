"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/** Grille technique très discrète pour fonds de page */
export function SubtleGridBackground({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <svg className="h-full w-full text-[var(--ni-accent)] opacity-[0.035]" preserveAspectRatio="none">
        <defs>
          <pattern id={`ni-grid-${uid}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#ni-grid-${uid})`} />
      </svg>
    </div>
  );
}

/** Lignes type blueprint / plan — faible opacité */
export function TechnicalBlueprint({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none text-[var(--ni-accent)] opacity-[0.07]", className)}
      viewBox="0 0 400 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="40" y="32" width="200" height="120" rx="4" stroke="currentColor" strokeWidth="0.75" />
      <line x1="40" y1="72" x2="240" y2="72" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 3" />
      <line x1="120" y1="32" x2="120" y2="152" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 3" />
      <rect x="260" y="48" width="88" height="64" rx="3" stroke="currentColor" strokeWidth="0.6" />
      <path d="M 48 180 L 120 200 L 200 175 L 280 195" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />
      <circle cx="320" cy="140" r="24" stroke="currentColor" strokeWidth="0.5" />
      <line x1="296" y1="140" x2="344" y2="140" stroke="currentColor" strokeWidth="0.35" />
      <line x1="320" y1="116" x2="320" y2="164" stroke="currentColor" strokeWidth="0.35" />
    </svg>
  );
}

/** Croquis modulaire isométrique très léger */
export function ModularSketch({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none text-[var(--ni-accent)] opacity-[0.06]", className)}
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden
    >
      <path d="M40 120 L100 90 L160 120 L100 150 Z" stroke="currentColor" strokeWidth="0.7" />
      <path d="M160 120 L220 90 L280 120 L220 150 Z" stroke="currentColor" strokeWidth="0.7" />
      <path d="M100 90 L160 60 L220 90" stroke="currentColor" strokeWidth="0.6" />
      <path d="M100 150 L160 120 L220 150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 2" />
    </svg>
  );
}

/** Ambiance page : halos + option grille (dashboard main) */
export function PageAmbientDecor({ showGrid = true, className }: { showGrid?: boolean; className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute -left-[20%] top-0 h-[55%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(90,111,136,0.09),transparent_68%)]" />
      <div className="absolute -right-[10%] bottom-0 h-[45%] w-[50%] rounded-full bg-[radial-gradient(circle,rgba(200,195,185,0.35),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_100%,rgba(255,255,255,0.5),transparent_55%)]" />
      {showGrid ? <SubtleGridBackground className="opacity-80" /> : null}
    </div>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TechnicalBlueprint } from "@/components/decorative/technical-decorations";

type HeroPanelProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  actions?: ReactNode;
  /** Grille (ex. grid-cols-5 ou grid-cols-[1.4fr_0.8fr]) */
  gridClassName?: string;
  className?: string;
  mainSpanClass?: string;
  asideSpanClass?: string;
};

/**
 * Hero sombre doux (ardoise / bleu nuit) — jamais noir pur.
 * Décoration blueprint discrète en fond.
 */
export function HeroPanel({
  eyebrow,
  title,
  description,
  aside,
  actions,
  gridClassName = "grid-cols-5",
  className,
  mainSpanClass = "col-span-3",
  asideSpanClass = "col-span-2",
}: HeroPanelProps) {
  return (
    <div className={cn("grid", gridClassName, className)}>
      <div
        className={cn(
          "ni-hero-surface relative overflow-hidden px-9 py-11 text-white",
          mainSpanClass
        )}
      >
        <div className="pointer-events-none absolute -right-4 top-4 w-56 opacity-[0.45]">
          <TechnicalBlueprint className="h-36 w-full text-white" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_85%_88%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative">
          <p className="ni-label !text-white">{eyebrow}</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.035em]">{title}</h1>
          {description ? <div className="mt-5 max-w-xl text-sm leading-7 text-white/75">{description}</div> : null}
          {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>
      {aside ? (
        <div
          className={cn(
            "bg-[var(--ni-surface-glass)] px-8 py-10 text-foreground shadow-[inset_1px_0_0_rgba(255,255,255,0.55)] backdrop-blur-xl dark:shadow-[inset_1px_0_0_rgba(255,255,255,0.06)]",
            asideSpanClass
          )}
        >
          {aside}
        </div>
      ) : null}
    </div>
  );
}

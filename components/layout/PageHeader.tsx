import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  label,
  title,
  lead,
  className,
  children,
}: {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? <p className="ni-label">{label}</p> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[var(--ni-text)]">{title}</h1>
          {lead ? <p className="ni-page-lead mt-2">{lead}</p> : null}
        </div>
        {children}
      </div>
    </div>
  );
}

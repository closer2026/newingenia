"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToolHelpDialog } from "@/components/layout/ToolHelpDialog";
import { getToolHelp } from "@/lib/tool-help";

export function ToolContextBar() {
  const pathname = usePathname();
  const help = getToolHelp(pathname);
  const [open, setOpen] = useState(false);

  if (!help || pathname === "/dashboard") return null;

  return (
    <div className="mb-6 flex justify-end">
      <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(true)} className="ni-module-help h-9 shadow-none">
        <CircleHelp className="h-3.5 w-3.5 text-[var(--ni-accent)]" />
        Comprendre ce module
      </Button>
      <ToolHelpDialog help={help} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

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
    <div className="mb-5 flex justify-end">
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        <CircleHelp className="h-3.5 w-3.5" />
        Explications ?
      </Button>
      <ToolHelpDialog help={help} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

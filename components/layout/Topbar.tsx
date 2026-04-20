"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ROLE_LABELS, type AppRole } from "@/lib/roles";
import { useRole } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";

const roles: AppRole[] = ["admin", "manager", "technicien"];

export function Topbar({ breadcrumb = "Tableau de bord" }: { breadcrumb?: string }) {
  const { role, setRole } = useRole();

  return (
    <header className="flex h-[62px] items-center justify-between border-b border-[#d8d8d8] bg-white/90 px-8 backdrop-blur">
      <div>
        <p className="ni-label">Navigation</p>
        <p className="text-sm font-medium tracking-tight text-[#111111]">{breadcrumb}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-sm border border-[#d6d6d6] bg-[#f7f7f7] p-1">
          {roles.map((item) => (
            <Button
              key={item}
              size="sm"
              variant="ghost"
              onClick={() => setRole(item)}
              className={cn(
                "h-8 rounded-sm px-3 text-xs transition-all",
                role === item ? "bg-[#161616] text-white hover:bg-[#161616]" : "text-[#666666] hover:bg-white"
              )}
            >
              {ROLE_LABELS[item]}
            </Button>
          ))}
        </div>
        <Button size="icon" variant="ghost" className="h-9 w-9 rounded-sm border border-[#d6d6d6]">
          <Bell className="h-4 w-4 text-[#4c4c4c]" />
        </Button>
        <Avatar className="h-9 w-9 rounded-sm">
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

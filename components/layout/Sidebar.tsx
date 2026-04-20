"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/lib/mock-data";
import { ROLE_BADGE_CLASSES, ROLE_LABELS } from "@/lib/roles";
import { useRole } from "@/contexts/RoleContext";
import { NiLogo } from "./NiLogo";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { role, can } = useRole();

  return (
    <aside className="flex h-screen w-[220px] shrink-0 flex-col border-r border-[#d8d8d8] bg-[#f7f7f7] px-4 py-6">
      <NiLogo compact />

      <div className="mt-8 rounded-sm border border-[#dddddd] bg-white p-3">
        <p className="ni-label mb-2">Session active</p>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 rounded-sm">
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold tracking-tight text-[#111111]">Arnaud Dupont</p>
            <Badge className={cn("mt-1 rounded-sm border text-[10px]", ROLE_BADGE_CLASSES[role])}>
              {ROLE_LABELS[role]}
            </Badge>
          </div>
        </div>
      </div>

      <nav className="mt-6 space-y-1.5">
        {navItems.map((item, index) => {
          if (item.adminOnly && role !== "admin") return null;
          const restricted = !can(item.key);
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);
          return (
            <div key={`${item.label}-${index}`}>
              {item.label === "Gestion des roles" ? <Separator className="my-2" /> : null}
              <Link
                href={restricted ? pathname : item.href}
                className={cn(
                  "group flex items-center justify-between rounded-sm border px-2.5 py-2.5 text-xs transition-all duration-200",
                  isActive
                    ? "border-[#202020] bg-[#202020] text-white"
                    : "border-transparent text-[#616161] hover:border-[#d8d8d8] hover:bg-white hover:text-[#111111]",
                  restricted && "cursor-not-allowed opacity-70"
                )}
              >
                <span className="flex items-center gap-2">
                  <item.icon className="h-3.5 w-3.5 transition group-hover:scale-105" />
                  {item.label}
                </span>
                {restricted ? <Lock className="h-3.5 w-3.5" /> : null}
              </Link>
            </div>
          );
        })}
      </nav>

      <p className="mt-auto border-t border-[#dedede] pt-4 text-center text-[10px] uppercase tracking-[0.2em] text-[#777777]">
        Version 1.0 · Beta
      </p>
    </aside>
  );
}

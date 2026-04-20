"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { RoleProvider } from "@/contexts/RoleContext";

function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.065,
      smoothWheel: true,
      anchors: false,
      wheelMultiplier: 0.92,
    });

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <RoleProvider>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <Toaster position="top-right" richColors />
      </RoleProvider>
    </TooltipProvider>
  );
}

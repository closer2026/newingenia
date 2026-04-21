"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function DashboardEntryIntro() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shouldShow = pathname === "/dashboard" && searchParams.get("welcome") === "1";
    if (!shouldShow) return;

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      const url = new URL(window.location.href);
      url.searchParams.delete("welcome");
      window.history.replaceState({}, "", url.pathname + url.search);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="rounded-xl border border-border bg-card px-8 py-6 shadow-2xl"
          >
            <p className="ni-label text-center">Newingenia Workspace IA</p>
            <p className="mt-2 text-center text-xl font-semibold tracking-tight text-foreground">
              Session admin chargee
            </p>
            <p className="mt-1 text-center text-sm text-muted-foreground">
              Initialisation des modules intelligents...
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

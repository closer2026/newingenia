"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "lucide-react";

function LoadingDots() {
  return (
    <div className="mt-5 flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-primary/70"
          animate={{ scale: [1, 1.35, 1], opacity: [0.25, 1, 0.25] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function DashboardEntryIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shouldShow = pathname === "/dashboard" && new URLSearchParams(window.location.search).get("welcome") === "1";
    if (!shouldShow) return;

    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
      const url = new URL(window.location.href);
      url.searchParams.delete("welcome");
      window.history.replaceState({}, "", url.pathname + url.search);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background/70 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative max-w-md px-6"
          >
            <div className="absolute -inset-px rounded-2xl bg-primary/10 blur-[1px]" />
            <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-[var(--ni-surface)] px-10 py-9 shadow-[var(--ni-shadow-card)] ring-1 ring-[var(--ni-border)] dark:bg-card">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(74,98,128,0.08),transparent),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(74,98,128,0.05),transparent)]"
                aria-hidden
              />
              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.08, type: "spring", stiffness: 400, damping: 22 }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--ni-accent-soft)] shadow-inner ring-1 ring-border/40 dark:bg-primary/20"
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Box className="h-7 w-7 text-primary" />
                  </motion.div>
                </motion.div>

                <p className="ni-label text-center text-muted-foreground">New Ingenia · Workspace IA</p>
                <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Bienvenue dans le workspace NI
                </h2>
                <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
                  Chargement de la démo : vos modules s&apos;affichent dans quelques secondes — aucune donnée réelle n&apos;est
                  envoyée.
                </p>

                <LoadingDots />

                <div className="mt-6 h-1 w-[200px] max-w-full overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.75, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

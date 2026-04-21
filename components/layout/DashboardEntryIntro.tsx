"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function LoadingDots() {
  return (
    <div className="mt-5 flex items-center justify-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-[#252525]"
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
          className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-background/75 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative max-w-md px-6"
          >
            <div className="absolute -inset-px rounded-2xl bg-[#252525]/[0.08] blur-[1px]" />
            <div className="relative overflow-hidden rounded-2xl border border-[#252525]/15 bg-white px-10 py-9 shadow-[0_25px_50px_-12px_rgba(37,37,37,0.15)] ring-1 ring-[#252525]/5 dark:bg-card dark:ring-white/5">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(37,37,37,0.06),transparent),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(37,37,37,0.04),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.04),transparent)]"
                aria-hidden
              />
              <div className="relative flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.08, type: "spring", stiffness: 400, damping: 22 }}
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#252525]/[0.06] shadow-inner ring-1 ring-[#252525]/15 dark:bg-[#252525]/20 dark:ring-[#252525]/30"
                >
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="h-7 w-7 text-[#252525] dark:text-white" />
                  </motion.div>
                </motion.div>

                <p className="ni-label text-center text-[#252525]/55 dark:text-white/55">Newingenia Workspace IA</p>
                <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight text-[#252525] dark:text-white sm:text-2xl">
                  Bienvenue dans votre espace
                </h2>
                <p className="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-[#252525]/70 dark:text-white/65">
                  Préparation de votre environnement de travail sécurisé et synchronisation des modules.
                </p>

                <LoadingDots />

                <div className="mt-6 h-1 w-[200px] max-w-full overflow-hidden rounded-full bg-[#252525]/10 dark:bg-white/15">
                  <motion.div
                    className="h-full rounded-full bg-[#252525] dark:bg-white"
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

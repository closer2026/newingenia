"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 flex justify-end pb-6 pr-6">
      <div className="relative">
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-72 rounded-sm border border-[#d7d7d7] bg-white p-4 text-sm text-[#161616] shadow-[0_16px_48px_-28px_rgba(0,0,0,0.4)]"
            >
              <p className="ni-label mb-1">Assistant plateforme</p>
              Besoin d&apos;aide sur la plateforme ?
            </motion.div>
          ) : null}
        </AnimatePresence>
        <Button
          onClick={() => setOpen((value) => !value)}
          className="h-12 w-12 rounded-sm border border-[#d8d8d8] bg-white text-[#111111] hover:bg-[#111111] hover:text-white"
          size="icon"
        >
          <Bot className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

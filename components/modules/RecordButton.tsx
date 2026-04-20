"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Status = "idle" | "recording" | "processing" | "done";

const formatTime = (value: number) => {
  const m = String(Math.floor(value / 60)).padStart(2, "0");
  const s = String(value % 60).padStart(2, "0");
  return `00:${m}:${s}`;
};

export function RecordButton() {
  const [status, setStatus] = useState<Status>("idle");
  const [time, setTime] = useState(167);

  useEffect(() => {
    if (status !== "recording") return;
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, [status]);

  const toggle = () => {
    if (status === "idle") return setStatus("recording");
    if (status === "recording") {
      setStatus("processing");
      return setTimeout(() => setStatus("done"), 1600);
    }
    if (status === "done") setStatus("idle");
  };

  return (
    <Card className="ni-surface mx-auto max-w-3xl rounded-sm">
      <CardContent className="space-y-4 py-8 text-center">
        <p className="ni-label">Voice intelligence</p>
        <h2 className="text-2xl font-semibold tracking-tight text-[#111111]">Réunion</h2>
        <p className="text-sm text-[#666666]">Enregistrez, transcrivez, resumez</p>
        <motion.button
          whileTap={{ scale: 0.96 }}
          animate={
            status === "recording"
              ? { scale: [1, 1.05, 1], boxShadow: ["0 0 0 0 rgba(239,68,68,0.35)", "0 0 0 18px rgba(239,68,68,0)", "0 0 0 0 rgba(239,68,68,0)"] }
              : { scale: 1 }
          }
          transition={{ repeat: status === "recording" ? Infinity : 0, duration: 1.4 }}
          onClick={toggle}
          className={`mx-auto flex h-36 w-36 items-center justify-center rounded-full border ${
            status === "recording"
              ? "border-red-500 bg-red-500 text-white"
              : status === "done"
                ? "border-emerald-500 bg-emerald-500 text-white"
                : "border-[#cdcdcd] bg-[#f3f3f3] text-[#1A2E4A]"
          }`}
        >
          <Mic className="h-10 w-10" />
        </motion.button>
        <p className="font-medium">
          {status === "idle" && "Appuyer pour demarrer"}
          {status === "recording" && `Enregistrement en cours... ${formatTime(time)}`}
          {status === "processing" && "Transcription en cours..."}
          {status === "done" && "Analyse terminee"}
        </p>
        <p className="text-xs text-[#666666]">Compatible navigateur et mobile · Max 3h · ~0.70 CHF/heure</p>
      </CardContent>
    </Card>
  );
}

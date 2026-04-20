"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { OffreForm } from "@/components/modules/OffreForm";
import { OffrePreview } from "@/components/modules/OffrePreview";

export default function RedactionOffresPage() {
  const [generated, setGenerated] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-10 gap-5">
      <div className="col-span-4">
        <OffreForm onGenerated={() => setGenerated(true)} />
      </div>
      <div className="col-span-6">
        <OffrePreview generated={generated} />
      </div>
    </motion.div>
  );
}

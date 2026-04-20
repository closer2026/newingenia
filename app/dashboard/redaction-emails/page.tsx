"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EmailForm } from "@/components/modules/EmailForm";
import { EmailPreview } from "@/components/modules/EmailPreview";

export default function RedactionEmailsPage() {
  const [generated, setGenerated] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-5">
      <EmailForm onGenerate={() => setGenerated(true)} />
      <EmailPreview generated={generated} />
    </motion.div>
  );
}

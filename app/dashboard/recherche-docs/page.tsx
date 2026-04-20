"use client";

import { DocsChat } from "@/components/modules/DocsChat";
import { PdfViewer } from "@/components/modules/PdfViewer";
import { motion } from "framer-motion";

export default function RechercheDocsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-5 gap-5">
      <div className="col-span-3">
        <DocsChat />
      </div>
      <div className="col-span-2">
        <PdfViewer />
      </div>
    </motion.div>
  );
}

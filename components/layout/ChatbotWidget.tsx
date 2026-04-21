"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Bonjour, je suis l'assistant support. Decrivez votre probleme ou posez une question sur la plateforme.",
    },
  ]);

  const sendMessage = () => {
    const text = value.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setValue("");
    setLoading(true);

    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Merci pour votre message. Je vous propose de verifier d'abord le module concerne, puis je peux vous guider et escalader la demande si necessaire.",
        },
      ]);
      setLoading(false);
    }, 900);
  };

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40">
      <div className="relative">
        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="pointer-events-auto absolute bottom-16 right-0 w-88 rounded-xl border border-border bg-popover shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)]"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div>
                  <p className="ni-label">Support IA</p>
                  <p className="text-sm font-semibold text-popover-foreground">Assistance plateforme</p>
                </div>
                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-md" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="max-h-80 space-y-2 overflow-y-auto px-4 py-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[90%] rounded-lg px-3 py-2 text-sm ${
                      message.role === "assistant"
                        ? "bg-muted text-popover-foreground"
                        : "ml-auto bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {loading ? <p className="text-xs text-muted-foreground">L&apos;agent IA redige une reponse...</p> : null}
              </div>

              <div className="flex items-center gap-2 border-t border-border p-3">
                <Input
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") sendMessage();
                  }}
                  placeholder="Ecrivez votre question..."
                  className="h-9 rounded-md"
                />
                <Button size="icon" className="h-9 w-9 rounded-md" onClick={sendMessage} disabled={!value.trim() || loading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
        <Button
          onClick={() => setOpen((value) => !value)}
          className="pointer-events-auto h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          <Bot className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

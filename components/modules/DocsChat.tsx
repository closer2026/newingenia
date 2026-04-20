"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Message = { role: "ia" | "user"; content: string };

const initialMessages: Message[] = [
  { role: "ia", content: "Bonjour ! Je peux rechercher dans tous les catalogues Bosch Rexroth et New Ingenia. Que cherchez-vous ?" },
  { role: "user", content: "Profile pour charge de 80kg sur 1.2m horizontal" },
  { role: "ia", content: "Pour affiner : avez-vous une contrainte sur la largeur ?" },
  { role: "user", content: "Non, pas de contrainte" },
];

export function DocsChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);

  const send = () => {
    if (!value.trim()) return;
    const next = [...messages, { role: "user" as const, content: value }];
    setMessages(next);
    setValue("");
    setTyping(true);
    setTimeout(() => {
      setMessages([
        ...next,
        {
          role: "ia",
          content:
            "Reference proposee: 3 842 990 026. Convient pour 80kg sur 1.2m. Verification disponible dans Catalogue Structure.pdf p.47.",
        },
      ]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="ni-surface flex h-[680px] flex-col rounded-sm">
      <div className="flex items-center justify-between border-b border-[#dddddd] px-5 py-4">
        <div>
          <p className="ni-label">Module IA</p>
          <h2 className="font-semibold tracking-tight text-[#111111]">Recherche documentation</h2>
        </div>
        <Badge className="rounded-sm border border-[#d8d8d8] bg-[#f5f5f5] text-[#303030]">Catalogues indexes : 12 docs</Badge>
      </div>
      <ScrollArea className="flex-1 px-5 py-4">
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[88%] rounded-sm border px-3 py-2.5 text-sm ${
                msg.role === "user"
                  ? "ml-auto border-[#1f1f1f] bg-[#1f1f1f] text-white"
                  : "border-[#dfdfdf] bg-[#f7f7f7] text-[#1A1A1A]"
              }`}
            >
              {msg.content}
              {msg.content.includes("Reference proposee") ? (
                <div className="mt-2 flex items-center gap-2">
                  <Badge className="rounded-sm border border-emerald-200 bg-emerald-100 text-emerald-700">Trouve · p.47</Badge>
                  <Badge variant="outline" className="rounded-sm">
                    Catalogue Structure.pdf · p.47
                  </Badge>
                </div>
              ) : null}
            </div>
          ))}
          {typing ? <p className="text-sm text-[#666666]">IA est en train d&apos;ecrire...</p> : null}
        </div>
      </ScrollArea>
      <div className="border-t border-[#dddddd] p-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="rounded-sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Posez votre question..." className="rounded-sm" />
          <Button onClick={send} className="rounded-sm bg-[#1f1f1f] hover:bg-black">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-[#666666]">L&apos;agent repose des questions si necessaire</p>
      </div>
    </div>
  );
}

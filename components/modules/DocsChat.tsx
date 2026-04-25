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
    <div className="ni-surface flex h-[680px] flex-col rounded-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="ni-label">Module IA</p>
          <h2 className="font-semibold tracking-tight text-foreground">Recherche documentation</h2>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Posez une question technique : la reponse cite toujours un document et une page (conversation demo prechargee + simulation).
          </p>
        </div>
        <Badge className="rounded-md border border-border bg-muted text-foreground">12 catalogues indexes (demo)</Badge>
      </div>
      <ScrollArea className="flex-1 px-5 py-4">
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[88%] rounded-sm border px-3 py-2.5 text-sm ${
                msg.role === "user"
                  ? "ml-auto border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted text-foreground"
              }`}
            >
              {msg.content}
              {msg.content.includes("Reference proposee") ? (
                <div className="mt-2 flex items-center gap-2">
                  <Badge className="rounded-xl border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-500/14 dark:text-emerald-200">Trouve · p.47</Badge>
                  <Badge variant="outline" className="rounded-sm">
                    Catalogue Structure.pdf · p.47
                  </Badge>
                </div>
              ) : null}
            </div>
          ))}
          {typing ? <p className="text-sm text-muted-foreground">IA est en train d&apos;ecrire...</p> : null}
        </div>
      </ScrollArea>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="rounded-sm" type="button" title="Joindre un fichier (demo)" aria-label="Joindre un fichier (demo)">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex. : quelle reference pour 120 kg sur 2 m ?"
            className="rounded-sm"
          />
          <Button onClick={send} className="rounded-sm px-3" aria-label="Envoyer la question">
            <Send className="mr-1.5 h-4 w-4" />
            Envoyer
          </Button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          L&apos;agent reformule ou demande une precision avant de citer une reference — comportement attendu en production.
        </p>
      </div>
    </div>
  );
}

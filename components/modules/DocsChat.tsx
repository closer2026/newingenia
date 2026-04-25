"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Message = { role: "ia" | "user"; content: string };

const initialMessages: Message[] = [
  { role: "ia", content: "Bonjour. Posez une question technique, je retrouve les documents utiles et les sources à vérifier." },
  { role: "user", content: "Quelle structure choisir pour un poste de travail modulaire avec charge élevée et surface ESD ?" },
  { role: "ia", content: "Je recommande de vérifier les profilés série 45x45 renforcés et la fiche NI'One ESD. Source principale : Catalogue Structure, page 47." },
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
            "Référence proposée : profilé 45x45 renforcé, à vérifier avec la charge exacte et la longueur du poste. Source : Catalogue Structure p.47 et fiche NI'One ESD.",
        },
      ]);
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="ni-surface flex h-[680px] flex-col rounded-lg">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div>
          <p className="ni-label">Document technique</p>
          <h2 className="font-semibold tracking-tight text-foreground">Recherche technique</h2>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-muted-foreground">
            Posez une question. L&apos;outil retrouve les documents utiles et affiche les sources.
          </p>
        </div>
        <Badge className="rounded-md border border-border bg-muted text-foreground">Documents sources disponibles</Badge>
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
              {msg.content.includes("Référence proposée") ? (
                <div className="mt-2 flex items-center gap-2">
                  <Badge className="rounded-xl border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-300/30 dark:bg-emerald-500/14 dark:text-emerald-200">Source trouvee · p.47</Badge>
                  <Badge variant="outline" className="rounded-sm">
                    Catalogue Structure.pdf · p.47
                  </Badge>
                </div>
              ) : null}
            </div>
          ))}
          {typing ? <p className="text-sm text-muted-foreground">Recherche dans les sources...</p> : null}
        </div>
      </ScrollArea>
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" className="rounded-sm" type="button" title="Joindre un fichier" aria-label="Joindre un fichier">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ex. : quelle structure pour 120 kg sur 2 m avec surface ESD ?"
            className="rounded-sm"
          />
          <Button onClick={send} className="rounded-sm px-3" aria-label="Envoyer la question">
            <Send className="mr-1.5 h-4 w-4" />
            Envoyer
          </Button>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          L&apos;outil peut demander une précision avant de proposer une référence à vérifier.
        </p>
      </div>
    </div>
  );
}

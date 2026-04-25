"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NiLogo } from "@/components/layout/NiLogo";

type InvoiceLine = {
  id: string;
  designation: string;
  quantity: string;
  unitPrice: string;
  vatRate: string;
  discountRate: string;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function toNumber(value: string): number {
  const normalized = value.replace(",", ".");
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function firstMoneyValue(text: string): string | null {
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*(?:chf|€|eur|francs?)?/i);
  return match ? match[1].replace(",", ".") : null;
}

export default function FacturationPage() {
  const [clientName, setClientName] = useState("Manufacture Horlogere Delta");
  const [clientEmail, setClientEmail] = useState("finance@delta-horlogerie.ch");
  const [clientAddress, setClientAddress] = useState("Rue de l'Industrie 12, 2800 Delemont");
  const [invoiceNumber, setInvoiceNumber] = useState("FAC-2026-041");
  const [issueDate, setIssueDate] = useState("2026-04-20");
  const [dueDate, setDueDate] = useState("2026-05-20");
  const [currency, setCurrency] = useState("CHF");
  const [paymentTerms, setPaymentTerms] = useState("Paiement sous 30 jours");
  const [purchaseOrderRef, setPurchaseOrderRef] = useState("PO-DELTA-8841");
  const [notes, setNotes] = useState("Paiement sous 30 jours. Merci pour votre confiance.");
  const [globalDiscountRate, setGlobalDiscountRate] = useState("0");
  const [shippingAmount, setShippingAmount] = useState("0");

  const [lines, setLines] = useState<InvoiceLine[]>([
    {
      id: "line-1",
      designation: "Poste de travail NI'One avec surface ESD",
      quantity: "3",
      unitPrice: "4900",
      vatRate: "8.1",
      discountRate: "0",
    },
    {
      id: "line-2",
      designation: "Éclairage intégré, rangements outils et installation",
      quantity: "1",
      unitPrice: "6850",
      vatRate: "8.1",
      discountRate: "5",
    },
  ]);

  const [generated, setGenerated] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Indiquez la source de facturation. Exemple: facture issue de l'offre validee pour 3 postes NI'One ESD, installation incluse, TVA 8.1%, paiement 30 jours.",
    },
  ]);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const chatInputRef = useRef("");

  const lineTotals = useMemo(() => {
    return lines.map((line) => {
      const quantity = toNumber(line.quantity);
      const unitPrice = toNumber(line.unitPrice);
      const vatRate = toNumber(line.vatRate);
      const discountRate = toNumber(line.discountRate);
      const grossHt = quantity * unitPrice;
      const discountAmount = (grossHt * discountRate) / 100;
      const netHt = grossHt - discountAmount;
      const vatAmount = (netHt * vatRate) / 100;
      return {
        id: line.id,
        grossHt,
        discountAmount,
        netHt,
        vatAmount,
      };
    });
  }, [lines]);

  const totals = useMemo(() => {
    const subtotalHt = lineTotals.reduce((acc, line) => acc + line.netHt, 0);
    const linesVatTotal = lineTotals.reduce((acc, line) => acc + line.vatAmount, 0);
    const globalDiscountAmount = (subtotalHt * toNumber(globalDiscountRate)) / 100;
    const shipping = toNumber(shippingAmount);
    const htAfterGlobalDiscount = subtotalHt - globalDiscountAmount + shipping;
    const effectiveVat = htAfterGlobalDiscount > 0 ? (linesVatTotal / subtotalHt) * htAfterGlobalDiscount : 0;
    const ttcTotal = htAfterGlobalDiscount + effectiveVat;
    return {
      subtotalHt,
      linesVatTotal,
      globalDiscountAmount,
      shipping,
      htAfterGlobalDiscount,
      effectiveVat,
      ttcTotal,
    };
  }, [globalDiscountRate, lineTotals, shippingAmount]);

  function updateLine(id: string, patch: Partial<InvoiceLine>) {
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  }

  function addLine() {
    const id = `line-${Date.now()}`;
    setLines((prev) => [
      ...prev,
      {
        id,
        designation: "",
        quantity: "1",
        unitPrice: "0",
        vatRate: "8.1",
        discountRate: "0",
      },
    ]);
  }

  function removeLine(id: string) {
    setLines((prev) => (prev.length <= 1 ? prev : prev.filter((line) => line.id !== id)));
  }

  function applyAssistantTemplate(prompt: string) {
    const text = prompt.toLowerCase();
    const now = new Date();

    const hasUrgent = text.includes("urgent");
    const hasMaintenance = text.includes("maintenance") || text.includes("support");
    const hasCameras = text.includes("camera");
    const hasInstall = text.includes("installation") || text.includes("mise en service") || text.includes("integrat");
    const hasAudit = text.includes("audit") || text.includes("diagnostic");
    const hasTraining = text.includes("formation") || text.includes("training");
    const has30Days = text.includes("30 jours");
    const has15Days = text.includes("15 jours");
    const has7Days = text.includes("7 jours");

    if (text.includes("atlas")) {
      setClientName("Atlas SA");
      setClientEmail("comptabilite@atlas.ch");
      setClientAddress("Av. du Port 8, 2000 Neuchatel");
    } else if (text.includes("omega")) {
      setClientName("Omega SA");
      setClientEmail("finance@omega.ch");
      setClientAddress("Rue de l'Industrie 12, 1000 Lausanne");
    } else if (text.includes("delta")) {
      setClientName("Atelier Delta");
      setClientEmail("factures@atelier-delta.ch");
      setClientAddress("Zone industrielle C3, 1020 Renens");
    }

    const issue = now.toISOString().slice(0, 10);
    const dueOffset = has7Days ? 7 : has15Days ? 15 : 30;
    const due = new Date(now.getTime() + dueOffset * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    setIssueDate(issue);
    setDueDate(due);
    setPaymentTerms(
      has7Days ? "Paiement sous 7 jours" : has15Days ? "Paiement sous 15 jours" : has30Days ? "Paiement sous 30 jours" : paymentTerms
    );

    const hasTvaMatch = text.match(/tva\s*(\d+(?:[.,]\d+)?)/i);
    const defaultVat = hasTvaMatch ? hasTvaMatch[1].replace(",", ".") : "8.1";

    const suggestedLines: InvoiceLine[] = [];
    if (hasCameras) {
      const cameraPrice = firstMoneyValue(text.match(/camera[s]?\s+[^.!\n]*/i)?.[0] ?? "") ?? "650";
      const cameraQtyMatch = text.match(/(\d+)\s*camera/i);
      const cameraQty = cameraQtyMatch ? cameraQtyMatch[1] : "2";
      suggestedLines.push({
        id: `line-${Date.now()}-1`,
        designation: "Fourniture de cameras industrielles",
        quantity: cameraQty,
        unitPrice: cameraPrice,
        vatRate: defaultVat,
        discountRate: "0",
      });
    }
    if (hasInstall) {
      const installPrice = firstMoneyValue(text.match(/installation[^.!\n]*/i)?.[0] ?? "") ?? "140";
      const installQtyMatch = text.match(/(\d+)\s*h(?:eures?)?\s*(?:d'?|de )?installation/i);
      const installQty = installQtyMatch ? installQtyMatch[1] : "6";
      suggestedLines.push({
        id: `line-${Date.now()}-2`,
        designation: "Installation et parametrage sur site",
        quantity: installQty,
        unitPrice: installPrice,
        vatRate: defaultVat,
        discountRate: "0",
      });
    }
    if (hasMaintenance) {
      suggestedLines.push({
        id: `line-${Date.now()}-3`,
        designation: "Maintenance preventive trimestrielle",
        quantity: "1",
        unitPrice: "980",
        vatRate: defaultVat,
        discountRate: "0",
      });
    }
    if (hasAudit) {
      suggestedLines.push({
        id: `line-${Date.now()}-4`,
        designation: "Audit process et recommandations",
        quantity: "1",
        unitPrice: "1800",
        vatRate: defaultVat,
        discountRate: "0",
      });
    }
    if (hasTraining) {
      suggestedLines.push({
        id: `line-${Date.now()}-5`,
        designation: "Formation équipe exploitation",
        quantity: "4",
        unitPrice: "120",
        vatRate: defaultVat,
        discountRate: "0",
      });
    }

    if (suggestedLines.length === 0) {
      suggestedLines.push({
        id: `line-${Date.now()}-default`,
        designation: "Prestation de conseil industriel",
        quantity: "8",
        unitPrice: "160",
        vatRate: defaultVat,
        discountRate: "0",
      });
    }

    setLines(suggestedLines);
    const refClient = (text.includes("atlas") ? "ATLAS" : text.includes("delta") ? "DELTA" : "OMEGA");
    setPurchaseOrderRef(`PO-${refClient}-${Math.floor(1000 + Math.random() * 9000)}`);
    if (hasUrgent) {
      setNotes("Dossier prioritaire. Merci de valider la facture en priorité.");
    }
  }

  function handleAssistantMessage(forcedPrompt?: string) {
    const prompt = (forcedPrompt ?? chatInput).trim();
    if (!prompt) return;
    setChatMessages((prev) => [...prev, { role: "user", content: prompt }]);
    applyAssistantTemplate(prompt);
    setGenerated(false);
    setChatMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content:
          "Brouillon de facture préparé : client, échéances et lignes détectées. Tu peux corriger puis générer l'aperçu.",
      },
    ]);
    setChatInput("");
  }

  function startVoiceInput() {
    if (typeof window === "undefined") return;

    const speechWindow = window as Window & {
      webkitSpeechRecognition?: SpeechRecognitionCtor;
      SpeechRecognition?: SpeechRecognitionCtor;
    };
    const SpeechRecognitionClass =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      setVoiceStatus("La saisie vocale n'est pas supportee sur ce navigateur.");
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "fr-FR";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0]?.transcript ?? "";
      }
      const finalTranscript = transcript.trim();
      setChatInput(finalTranscript);
      chatInputRef.current = finalTranscript;
    };

    recognition.onerror = () => {
      setVoiceStatus("Erreur micro ou autorisation refusee.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setVoiceStatus("Transcription terminee. Tu peux corriger le texte puis envoyer.");
    };

    recognitionRef.current = recognition;
    setVoiceStatus("Ecoute en cours... dicte ta facture.");
    setIsListening(true);
    recognition.start();
  }

  function stopVoiceInput() {
    recognitionRef.current?.stop();
    setIsListening(false);
  }

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    chatInputRef.current = chatInput;
  }, [chatInput]);

  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Facture</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Facturation</h1>
        <p className="ni-page-lead mt-2 max-w-3xl">
          Reprenez une offre ou un projet terminé, vérifiez les lignes et préparez un aperçu de facture.
        </p>
      </div>

      <section className="grid gap-3 md:grid-cols-4">
        {["Source", "Lignes", "Vérification", "Aperçu"].map((step, index) => (
          <div key={step} className="rounded-2xl border border-border bg-card/80 px-4 py-3 text-sm shadow-sm">
            <p className="ni-label">Étape {index + 1}</p>
            <p className="mt-1 font-semibold text-foreground">{step}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Client actif", value: clientName || "N/A" },
          { label: "Numero facture", value: invoiceNumber || "N/A" },
          { label: "Total TTC", value: `${totals.ttcTotal.toFixed(2)} ${currency}` },
          { label: "Échéance", value: dueDate || "N/A" },
        ].map((item) => (
          <Card key={item.label} className="rounded-xl border-border bg-card/90 shadow-sm">
            <CardContent className="p-4">
              <p className="ni-label">{item.label}</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card className="rounded-xl border-border bg-card/90 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base tracking-tight">Source de la facture</CardTitle>
          <p className="text-xs text-muted-foreground">
            Collez une offre validée ou décrivez le projet terminé : l&apos;outil aide à remplir les lignes à vérifier.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-h-56 space-y-2 overflow-auto rounded-md border border-border bg-muted p-3">
            {chatMessages.map((message, idx) => (
              <div
                key={`${message.role}-${idx}`}
                className={`rounded-sm px-3 py-2 text-sm ${
                  message.role === "assistant"
                    ? "bg-card text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <div className="rounded-md border border-border bg-card p-2">
            <div className="grid grid-cols-[1fr_auto_auto] items-end gap-2">
              <Textarea
                rows={2}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ex. : Facture pour 3 postes NI'One ESD, installation incluse, TVA 8.1%, paiement 30 jours."
                className="min-h-[58px] border-0 p-2 shadow-none focus-visible:ring-0"
              />
              {!isListening ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={startVoiceInput}
                  className="h-10 w-10 rounded-sm p-0"
                  aria-label="Démarrer le micro"
                  title="Démarrer le micro"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
                    <path d="M12 3a3 3 0 00-3 3v6a3 3 0 106 0V6a3 3 0 00-3-3z" />
                    <path d="M19 10v2a7 7 0 01-14 0v-2" />
                    <path d="M12 19v3" />
                  </svg>
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={stopVoiceInput}
                  className="h-10 w-10 rounded-sm p-0"
                  aria-label="Arrêter le micro"
                  title="Arrêter le micro"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
                    <rect x="6" y="6" width="12" height="12" rx="1.5" />
                  </svg>
                </Button>
              )}
              <Button onClick={() => handleAssistantMessage()} className="h-10 rounded-sm">
                Remplir depuis cette source
              </Button>
            </div>
            <p className="mt-1 px-2 text-xs text-muted-foreground">
              {voiceStatus || "Vous pouvez dicter, corriger le texte, puis remplir les champs à vérifier."}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.3fr_1fr]">
        <Card className="rounded-xl border-border bg-card/90 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Lignes à vérifier</CardTitle>
            <p className="text-xs text-muted-foreground">
              Client, references, lignes et totaux : chaque bloc reste modifiable avant validation.
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
              <p className="ni-label">Client</p>
              <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Client</Label>
                <Input value={clientName} onChange={(e) => setClientName(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Email client</Label>
                <Input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Adresse de facturation</Label>
              <Input value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
            </div>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
              <p className="ni-label">Référence facture</p>
              <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Numero de facture</Label>
                <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Date emission</Label>
                <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Date échéance</Label>
                <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label>Devise</Label>
                <Input value={currency} onChange={(e) => setCurrency(e.target.value.toUpperCase())} />
              </div>
              <div className="space-y-1.5">
                <Label>Conditions paiement</Label>
                <Input value={paymentTerms} onChange={(e) => setPaymentTerms(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Ref commande client</Label>
                <Input value={purchaseOrderRef} onChange={(e) => setPurchaseOrderRef(e.target.value)} />
              </div>
            </div>
            </div>

            <div className="space-y-1.5 rounded-lg border border-border bg-muted/40 p-4">
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-sm font-semibold">Lignes de facturation (produits/services)</Label>
                <Button type="button" variant="outline" className="rounded-md" onClick={addLine}>
                  Ajouter une ligne
                </Button>
              </div>
              <div className="space-y-2">
                {lines.map((line, index) => {
                  const computed = lineTotals.find((item) => item.id === line.id);
                  return (
                    <div key={line.id} className="rounded-lg border border-border bg-card p-3 shadow-sm">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Ligne {index + 1}</p>
                        <Button type="button" variant="outline" className="rounded-md" onClick={() => removeLine(line.id)}>
                          Supprimer
                        </Button>
                      </div>
                      <div className="grid grid-cols-6 gap-2">
                        <div className="col-span-2">
                          <Label>Designation</Label>
                          <Input
                            value={line.designation}
                            onChange={(e) => updateLine(line.id, { designation: e.target.value })}
                            placeholder="Ex: Poste de travail NI'One ESD"
                          />
                        </div>
                        <div>
                          <Label>Qté</Label>
                          <Input
                            value={line.quantity}
                            onChange={(e) => updateLine(line.id, { quantity: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>PU HT</Label>
                          <Input
                            value={line.unitPrice}
                            onChange={(e) => updateLine(line.id, { unitPrice: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>TVA %</Label>
                          <Input
                            value={line.vatRate}
                            onChange={(e) => updateLine(line.id, { vatRate: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Remise %</Label>
                          <Input
                            value={line.discountRate}
                            onChange={(e) => updateLine(line.id, { discountRate: e.target.value })}
                          />
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Total ligne HT: {computed?.netHt.toFixed(2) ?? "0.00"} {currency}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-muted/40 p-4">
              <p className="ni-label">Ajustements</p>
              <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Remise globale (%)</Label>
                <Input value={globalDiscountRate} onChange={(e) => setGlobalDiscountRate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Frais additionnels ({currency})</Label>
                <Input value={shippingAmount} onChange={(e) => setShippingAmount(e.target.value)} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Notes / Conditions</Label>
              <Textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            </div>

            <Button onClick={() => setGenerated(true)} className="w-full rounded-md text-sm font-semibold">
              Mettre à jour l&apos;aperçu PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border bg-card/95 shadow-sm xl:sticky xl:top-6 xl:self-start">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base tracking-tight">Aperçu facture</CardTitle>
              <Button variant="outline" className="rounded-md text-xs">
                Telecharger le PDF
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Rendu proche du papier NI : à relire avant export ou envoi au client.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-foreground">
            {!generated ? (
              <p className="text-muted-foreground">
                Renseignez le formulaire puis cliquez sur &quot;Mettre à jour l&apos;aperçu PDF&quot; pour afficher la facture ici.
              </p>
            ) : (
              <div className="rounded-lg border border-border bg-muted/30 p-3">
                <div className="mx-auto w-full max-w-[640px] rounded-md border border-zinc-200 bg-white p-7 text-[#252525] shadow-sm">
                  <div className="mb-6 flex items-start justify-between border-b border-zinc-200 pb-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.16em] text-zinc-500">Facture</p>
                      <p className="mt-1 text-xl font-semibold">#{invoiceNumber}</p>
                      <p className="mt-1 text-xs text-zinc-500">Emission: {issueDate}</p>
                      <p className="text-xs text-zinc-500">Échéance : {dueDate}</p>
                    </div>
                    <div className="text-right text-sm">
                      <div className="mb-2 flex justify-end">
                        <NiLogo compact bare />
                      </div>
                      <p className="text-xs text-zinc-500">Rue St-Randoald 2A</p>
                      <p className="text-xs text-zinc-500">2800 Delemont</p>
                      <p className="text-xs text-zinc-500">info@newingenia.ch</p>
                    </div>
                  </div>

                  <div className="mb-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-zinc-500">Facture pour</p>
                    <p className="mt-1 font-semibold">{clientName}</p>
                    <p className="text-xs text-zinc-500">{clientAddress}</p>
                    <p className="text-xs text-zinc-500">{clientEmail}</p>
                    <p className="mt-1 text-xs text-zinc-500">Ref commande: {purchaseOrderRef}</p>
                  </div>

                  <div className="overflow-hidden rounded-md border border-zinc-200">
                    <div className="grid grid-cols-[2fr_0.7fr_1fr_1fr] bg-zinc-100 px-3 py-2 text-xs font-semibold text-zinc-700">
                      <p>Designation</p>
                      <p className="text-right">Qte</p>
                      <p className="text-right">PU HT</p>
                      <p className="text-right">Total HT</p>
                    </div>
                    {lines.map((line) => {
                      const computed = lineTotals.find((item) => item.id === line.id);
                      return (
                        <div key={line.id} className="grid grid-cols-[2fr_0.7fr_1fr_1fr] border-t border-zinc-200 px-3 py-2 text-xs">
                          <p className="font-medium">{line.designation || "Ligne sans designation"}</p>
                          <p className="text-right">{line.quantity}</p>
                          <p className="text-right">{toNumber(line.unitPrice).toFixed(2)} {currency}</p>
                          <p className="text-right font-semibold">{computed?.netHt.toFixed(2) ?? "0.00"} {currency}</p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 ml-auto w-[260px] space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Sous-total HT</span>
                      <span>{totals.subtotalHt.toFixed(2)} {currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Remise globale</span>
                      <span>-{totals.globalDiscountAmount.toFixed(2)} {currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Frais additionnels</span>
                      <span>+{totals.shipping.toFixed(2)} {currency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">TVA</span>
                      <span>{totals.effectiveVat.toFixed(2)} {currency}</span>
                    </div>
                    <div className="mt-2 flex justify-between border-t border-zinc-300 pt-2 text-base font-semibold">
                      <span>Total TTC</span>
                      <span>{totals.ttcTotal.toFixed(2)} {currency}</span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-zinc-200 pt-4 text-xs text-zinc-600">
                    <p className="font-semibold text-zinc-700">Commentaire</p>
                    <p>{notes}</p>
                    <p className="mt-1">{paymentTerms}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

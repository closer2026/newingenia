"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Clapperboard,
  Download,
  FileText,
  Loader2,
  Mail,
  RefreshCw,
  RotateCw,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CreativeType = "photo" | "mise-en-situation" | "video" | "360";
type StyleType = "industriel" | "premium" | "technique" | "marketing";

const mockMain = (seed: string) => `https://picsum.photos/seed/${seed}/880/560`;
const mockVariant = (seed: string, n: number) => `https://picsum.photos/seed/${seed}v${n}/280/200`;

export default function StudioMarketingPage() {
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const uploadImageInputRef = useRef<HTMLInputElement>(null);

  function clearUploadImage() {
    if (uploadPreview) {
      URL.revokeObjectURL(uploadPreview);
    }
    setUploadPreview(null);
    if (uploadImageInputRef.current) {
      uploadImageInputRef.current.value = "";
    }
  }
  const [creativeType, setCreativeType] = useState<CreativeType>("photo");
  const [styleType, setStyleType] = useState<StyleType>("industriel");
  const [materiau, setMateriau] = useState("Aluminium / acier");
  const [fond, setFond] = useState("Neutre atelier");
  const [ambiance, setAmbiance] = useState("Lumiere douce");
  const [prompt, setPrompt] = useState(
    "Mise en valeur du produit sur fond neutre, ombres douces, rendu catalogue haute définition."
  );
  const [generating, setGenerating] = useState(false);
  const [mainVisual, setMainVisual] = useState<string | null>(null);
  const [variants, setVariants] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (uploadPreview) URL.revokeObjectURL(uploadPreview);
    };
  }, [uploadPreview]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 2600);
  }

  function runGeneration(extraVariantsOnly = false) {
    const base = `ni${creativeType}${styleType}${Date.now()}`;
    setGenerating(true);
    window.setTimeout(() => {
      if (!extraVariantsOnly) {
        setMainVisual(mockMain(base));
        setVariants([mockVariant(base, 1), mockVariant(base, 2), mockVariant(base, 3)]);
      } else if (mainVisual) {
        const vBase = `${base}var`;
        setVariants([mockVariant(vBase, 1), mockVariant(vBase, 2), mockVariant(vBase, 3)]);
      }
      setGenerating(false);
    }, 2200);
  }

  const quickPresets = [
    { label: "Photo produit", icon: Camera, type: "photo" as CreativeType },
    { label: "Video marketing", icon: Clapperboard, type: "video" as CreativeType },
    { label: "Vue 360°", icon: RotateCw, type: "360" as CreativeType },
  ];

  return (
    <div className="relative space-y-8">
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-72 bg-[radial-gradient(ellipse_at_50%_0%,rgba(99,102,241,0.14),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgba(59,130,246,0.12),transparent_45%)]" />

      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <p className="ni-label">Creation visuelle</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Studio Marketing</h1>
        <p className="ni-page-lead mt-2 max-w-3xl">
          Brief + style : generez un visuel principal et trois variantes pour LinkedIn, un devis ou un salon. Les images
          ci-dessous sont des placeholders (demo).
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {quickPresets.map((preset) => (
            <Button
              key={preset.label}
              type="button"
              variant={creativeType === preset.type ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => setCreativeType(preset.type)}
            >
              <preset.icon className="mr-2 h-4 w-4" />
              {preset.label}
            </Button>
          ))}
        </div>
      </motion.header>

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.95fr)]">
        {/* Colonne gauche — input */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <Card className="overflow-hidden rounded-xl border-border bg-card/90 shadow-sm backdrop-blur-sm">
            <CardHeader className="border-b border-border/80 pb-3">
              <CardTitle className="text-base tracking-tight">Brief créatif</CardTitle>
              <p className="text-xs text-muted-foreground">
                Decrivez le produit et l&apos;ambiance : les listes ci-dessous structurent le prompt envoye a l&apos;IA en version reelle.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Image produit</Label>
                <Input
                  ref={uploadImageInputRef}
                  type="file"
                  accept="image/*"
                  className="rounded-lg"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploadPreview((prev) => {
                      if (prev) URL.revokeObjectURL(prev);
                      return URL.createObjectURL(file);
                    });
                  }}
                />
                {uploadPreview ? (
                  <div className="mt-3">
                    <p className="mb-1 text-xs text-muted-foreground">Apercu image</p>
                    <div className="relative inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadPreview}
                        alt="Apercu upload"
                        className="h-20 w-20 rounded-lg border border-border object-cover"
                      />
                      <button
                        type="button"
                        onClick={clearUploadImage}
                        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
                        aria-label="Supprimer l'image"
                        title="Supprimer l'image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Importez une photo de référence (maquette).</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="studio-marketing-prompt">Prompt</Label>
                <Textarea
                  id="studio-marketing-prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Décrivez le rendu souhaité : cadrage, éclairage, message visuel, contraintes..."
                  rows={4}
                  className="min-h-[100px] resize-y rounded-lg text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Ce texte guide l&apos;IA pour affiner le visuel (maquette, pas de génération réelle).
                </p>
              </div>

              <div className="space-y-1.5">
                <Label>Type</Label>
                <select
                  value={creativeType}
                  onChange={(e) => setCreativeType(e.target.value as CreativeType)}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                >
                  <option value="photo">Photo produit</option>
                  <option value="mise-en-situation">Mise en situation</option>
                  <option value="video">Vidéo marketing</option>
                  <option value="360">Rotation 360</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Style</Label>
                <select
                  value={styleType}
                  onChange={(e) => setStyleType(e.target.value as StyleType)}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                >
                  <option value="industriel">Industriel</option>
                  <option value="premium">Premium</option>
                  <option value="technique">Technique</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <div className="grid gap-3">
                <div className="space-y-1.5">
                  <Label>Matériau</Label>
                  <select
                    value={materiau}
                    onChange={(e) => setMateriau(e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    <option>Aluminium / acier</option>
                    <option>Inox brossé</option>
                    <option>PEHD / composite</option>
                    <option>Bois / plateau stratifié</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Fond</Label>
                  <select
                    value={fond}
                    onChange={(e) => setFond(e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    <option>Neutre atelier</option>
                    <option>Blanc studio</option>
                    <option>Sombre premium</option>
                    <option>Environnement client</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label>Ambiance</Label>
                  <select
                    value={ambiance}
                    onChange={(e) => setAmbiance(e.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
                  >
                    <option>Lumiere douce</option>
                    <option>Haute clarté</option>
                    <option>Contraste fort</option>
                    <option>Ton chaud</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Colonne centre — preview */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
        >
          <Card className="overflow-hidden rounded-xl border-border bg-card/90 shadow-sm backdrop-blur-sm">
            <CardHeader className="border-b border-border/80 pb-3">
              <CardTitle className="text-base tracking-tight">Aperçu</CardTitle>
              <p className="text-xs text-muted-foreground">Rendu principal : utilisez-le pour valider cadrage, lumiere et message avant export.</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted/40">
                <AnimatePresence mode="wait">
                  {generating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/85 backdrop-blur-sm"
                    >
                      <Loader2 className="h-10 w-10 animate-spin text-primary" />
                      <p className="text-sm font-medium text-foreground">IA en cours de génération...</p>
                      <p className="max-w-xs text-center text-xs text-muted-foreground">
                        Application du style {styleType} · {materiau} · {fond}
                      </p>
                      {prompt.trim() ? (
                        <p className="line-clamp-2 max-w-sm px-4 text-center text-[11px] italic text-muted-foreground">
                          « {prompt.trim().slice(0, 120)}
                          {prompt.trim().length > 120 ? "…" : ""} »
                        </p>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {!mainVisual && !generating ? (
                  <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 p-6 text-center">
                    <Sparkles className="h-10 w-10 text-muted-foreground/60" />
                    <p className="text-sm text-muted-foreground">Le rendu marketing apparaîtra ici après génération.</p>
                  </div>
                ) : null}

                {mainVisual && !generating ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative h-full min-h-[280px] w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mainVisual} alt="Visuel genere" className="h-full w-full object-cover" />
                    {creativeType === "video" ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#252525]/25">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                          <Clapperboard className="h-7 w-7 text-foreground" />
                        </div>
                      </div>
                    ) : null}
                    {creativeType === "360" ? (
                      <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold shadow">
                        360° interactif (simulation)
                      </span>
                    ) : null}
                  </motion.div>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button className="flex-1 rounded-lg" onClick={() => runGeneration(false)} disabled={generating}>
                  {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Generer le visuel principal
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 rounded-lg"
                  onClick={() => runGeneration(true)}
                  disabled={generating || !mainVisual}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Regenerer les 3 variantes
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Colonne droite — actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.35 }}
        >
          <Card className="overflow-hidden rounded-xl border-border bg-card/90 shadow-sm backdrop-blur-sm">
            <CardHeader className="border-b border-border/80 pb-3">
              <CardTitle className="text-base tracking-tight">Actions</CardTitle>
              <p className="text-xs text-muted-foreground">Une fois le visuel choisi, montrez comment il rejoint les autres modules.</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-2 pt-4">
              <Button
                variant="outline"
                className="justify-start rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Téléchargement simulé · fichier prêt")}
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button
                variant="outline"
                className="justify-start rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Ajouté au brouillon devis (simulation)")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Utiliser dans devis
              </Button>
              <Button
                variant="outline"
                className="justify-start rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Image copiée vers le module LinkedIn (simulation)")}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Utiliser dans LinkedIn
              </Button>
              <Button
                variant="outline"
                className="justify-start rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Email client préparé (simulation)")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Envoyer au client
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Section basse — variantes */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Variantes generees</h2>
            <p className="text-xs text-muted-foreground">Trois declinaisons de prompt pour comparer cadrage et ambiance.</p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">3 propositions (demo)</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.06, duration: 0.35 }}
              className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
            >
              <div className="aspect-[4/3] bg-muted/50">
                {variants[i] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={variants[i]} alt={`Variante ${i + 1}`} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    En attente de génération
                  </div>
                )}
              </div>
              <div className="border-t border-border px-3 py-2">
                <p className="text-xs font-medium text-foreground">Variante {i + 1}</p>
                <p className="text-[11px] text-muted-foreground">
                  {variants[i] ? `${styleType} · ${ambiance}` : "—"}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <AnimatePresence>
        {toast ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-lg"
          >
            {toast}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

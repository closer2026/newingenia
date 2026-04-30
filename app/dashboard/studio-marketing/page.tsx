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
const marketingVideoSrc = "/videos/video-exemple.mp4";
const productPhotoSrc = "/images/ni-one.jpeg";

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
    "Change les couleurs de ce bureau : mets toute la partie noire en blanc et transforme la partie blanche en materiau style ardoise fonce."
  );
  const [generating, setGenerating] = useState(false);
  const [mainVisual, setMainVisual] = useState<string | null>(null);
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

  function runGeneration() {
    const base = `ni${creativeType}${styleType}${Date.now()}`;
    setGenerating(true);
    window.setTimeout(() => {
      setMainVisual(mockMain(base));
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
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <p className="ni-label">Visuel produit</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Studio Marketing</h1>
        <p className="ni-page-lead mt-2 max-w-3xl">
          Préparez une image ou une idée de visuel pour une offre, LinkedIn ou une présentation client.
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

      <div className="relative grid gap-3 md:grid-cols-4">
        {["Produit", "Usage", "Style", "Visuel"].map((step, index) => (
          <div key={step} className="rounded-2xl border border-border bg-card/94 px-4 py-3 text-sm shadow-sm">
            <p className="ni-label">Étape {index + 1}</p>
            <p className="mt-1 font-semibold text-foreground">{step}</p>
          </div>
        ))}
      </div>

      <div className="relative grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
        {/* Colonne gauche — Brief visuel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.35 }}
        >
          <Card className="overflow-hidden rounded-xl border-border bg-card/97 shadow-sm backdrop-blur-sm">
            <CardHeader className="border-b border-border/80 pb-3">
              <CardTitle className="text-base tracking-tight">Brief visuel</CardTitle>
              <p className="text-xs text-muted-foreground">
                Décrivez le produit, l&apos;usage et le style attendu pour un support commercial New Ingenia.
              </p>
            </CardHeader>
            <CardContent className="space-y-5 pt-4">
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
                    <p className="mb-1 text-xs text-muted-foreground">Aperçu image</p>
                    <div className="relative inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadPreview}
                        alt="Aperçu upload"
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
                  <p className="text-xs text-muted-foreground">Importez une photo de référence si vous en avez une.</p>
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
                  Ce texte précise le rendu à obtenir avant validation par l&apos;équipe.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                <div className="space-y-1.5 sm:col-span-2">
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

        {/* Colonne droite — Aperçu + Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="space-y-5"
        >
          <Card className="overflow-hidden rounded-xl border-border bg-card/97 shadow-sm backdrop-blur-sm">
            <CardHeader className="border-b border-border/80 pb-3">
              <CardTitle className="text-base tracking-tight">Aperçu</CardTitle>
              <p className="text-xs text-muted-foreground">
                Rendu principal : utilisez-le pour valider cadrage, lumière et message avant export.
              </p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-muted/58">
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
                      <p className="text-sm font-medium text-foreground">Préparation du visuel...</p>
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

                {creativeType === "video" && !generating ? (
                  <motion.video
                    key="marketing-video-preview"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    src={marketingVideoSrc}
                    className="h-full min-h-[320px] w-full object-cover"
                    controls
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : null}

                {creativeType === "photo" && !generating ? (
                  <motion.div
                    key="product-photo-preview"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative h-full min-h-[320px] w-full"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={productPhotoSrc} alt="Aperçu produit NI One" className="h-full w-full object-cover" />
                  </motion.div>
                ) : null}

                {creativeType !== "video" && creativeType !== "photo" && !mainVisual && !generating ? (
                  <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-2 p-6 text-center">
                    <Sparkles className="h-10 w-10 text-muted-foreground/60" />
                    <p className="text-sm text-muted-foreground">Le rendu marketing apparaîtra ici après génération.</p>
                  </div>
                ) : null}

                {creativeType !== "video" && creativeType !== "photo" && mainVisual && !generating ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative h-full min-h-[320px] w-full bg-muted/58"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={mainVisual} alt="Visuel généré" className="h-full w-full object-contain" />
                    {creativeType === "360" ? (
                      <span className="absolute bottom-3 right-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold shadow">
                        360° interactif
                      </span>
                    ) : null}
                  </motion.div>
                ) : null}
              </div>

              <Button className="w-full rounded-lg" onClick={runGeneration} disabled={generating}>
                {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Préparer le visuel principal
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden rounded-xl border-border bg-card/97 shadow-sm backdrop-blur-sm">
            <CardHeader className="border-b border-border/80 pb-3">
              <CardTitle className="text-base tracking-tight">Actions</CardTitle>
              <p className="text-xs text-muted-foreground">
                Une fois le visuel choisi, montrez comment il peut servir commercialement.
              </p>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Visuel prêt à télécharger")}
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Ajouté au brouillon d'offre")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Ajouter au devis
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Image préparée pour LinkedIn")}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Publier LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={!mainVisual}
                onClick={() => showToast("Email client préparé")}
              >
                <Mail className="mr-2 h-4 w-4" />
                Envoyer au client
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

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

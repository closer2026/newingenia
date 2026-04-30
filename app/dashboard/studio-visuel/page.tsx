"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Images, MessageSquareText, Sparkles, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/** Bureau : `office.glb` (public/models/office.glb). Établi : `bureau.glb` jusqu’à un `etabli.glb` dédié. */
const productOptions = [
  { label: "Bureau", model: "/models/office.glb" },
  { label: "Etabli", model: "/models/bureau.glb" },
  { label: "Convoyeur", model: "/models/convoyeur.glb" },
  { label: "Buffer", model: "/models/etagere.glb" },
  { label: "Chassis", model: "/models/frame.glb" },
] as const;

/**
 * Orbite initiale type « isométrique » : caméra sur la diagonale (~équilibre visuel X / Y / Z),
 * au lieu de la vue de face sur un axe (souvent Z par défaut). Format @google/model-viewer : theta phi rayon.
 * theta 45° = quart de tour horizontal ; phi ≈ 35,26° = élévation classique isométrique ; 105% = distance par défaut.
 */
const DEFAULT_CAMERA_ORBIT = "45deg 35.265deg 105%";

type StudioState = "initial" | "loading" | "result";
type GenerationMode = "prompt" | "single-image" | "four-views";

export default function StudioVisuelPage() {
  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  const [state, setState] = useState<StudioState>("initial");
  const [generationMode, setGenerationMode] = useState<GenerationMode>("prompt");
  const [prompt, setPrompt] = useState("Convoyeur compact pour ligne d'assemblage modulaire.");
  const [productType, setProductType] = useState("Equipement industriel");
  const [singleImagePreview, setSingleImagePreview] = useState<string | null>(null);
  const [viewsPreview, setViewsPreview] = useState<{
    front: string | null;
    back: string | null;
    left: string | null;
    right: string | null;
  }>({
    front: null,
    back: null,
    left: null,
    right: null,
  });
  const [selectedProduct, setSelectedProduct] = useState<(typeof productOptions)[number]>(productOptions[0]);
  const [progress, setProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"solid" | "textured">("textured");
  const [modelRevision, setModelRevision] = useState(0);
  const [cameraState, setCameraState] = useState<{ orbit?: string; target?: string; fov?: string }>({
    orbit: DEFAULT_CAMERA_ORBIT,
  });
  const viewerRef = useRef<HTMLElement | null>(null);
  const solidTextureRef = useRef<any>(null);
  const pendingCameraStateRef = useRef<{ orbit: string; target: string; fov: string } | null>(null);
  const singleImageInputRef = useRef<HTMLInputElement>(null);
  const viewFileInputRefs = useRef<{
    front: HTMLInputElement | null;
    back: HTMLInputElement | null;
    left: HTMLInputElement | null;
    right: HTMLInputElement | null;
  }>({ front: null, back: null, left: null, right: null });

  function clearSingleImage() {
    if (singleImagePreview) {
      URL.revokeObjectURL(singleImagePreview);
    }
    setSingleImagePreview(null);
    if (singleImageInputRef.current) {
      singleImageInputRef.current.value = "";
    }
  }

  function clearViewImage(side: "front" | "back" | "left" | "right") {
    setViewsPreview((prev) => {
      const url = prev[side];
      if (url) URL.revokeObjectURL(url);
      return { ...prev, [side]: null };
    });
    const input = viewFileInputRefs.current[side];
    if (input) input.value = "";
  }

  const helperText = useMemo(() => {
    if (state === "loading") return "Génération visuelle en cours...";
    if (state === "result") return "Modèle prêt pour présentation client.";
    return "Configurez la demande puis préparez l'aperçu.";
  }, [state]);

  const handleGenerate = () => {
    setState("loading");
    setProgress(0);
    const steps = [18, 37, 61, 84, 100];
    steps.forEach((value, index) => {
      window.setTimeout(() => {
        setProgress(value);
        if (value === 100) setState("result");
      }, (index + 1) * 420);
    });
  };

  useEffect(() => {
    return () => {
      if (singleImagePreview) {
        URL.revokeObjectURL(singleImagePreview);
      }
      Object.values(viewsPreview).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [singleImagePreview, viewsPreview]);

  /** À chaque changement de fichier .glb, repartir sur la vue diagonale par défaut. */
  useEffect(() => {
    setCameraState({ orbit: DEFAULT_CAMERA_ORBIT });
  }, [selectedProduct.model]);

  const applyMaterialMode = async (mode: "solid" | "textured") => {
    const viewer = viewerRef.current as any;
    const model = viewer?.model;
    if (!model?.materials) return;

    if (mode !== "solid") return;

    if (!solidTextureRef.current && typeof viewer?.createTexture === "function") {
      // Build a guaranteed neutral-gray texture in-browser to avoid black/white artifacts.
      const canvas = document.createElement("canvas");
      canvas.width = 2;
      canvas.height = 2;
      const context = canvas.getContext("2d");
      if (context) {
        context.fillStyle = "#bfbfbf";
        context.fillRect(0, 0, canvas.width, canvas.height);
        solidTextureRef.current = await viewer.createTexture(canvas.toDataURL("image/png"));
      }
    }

    const assignTexture = (textureInfo: any, texture: any | null) => {
      if (!textureInfo) return;
      try {
        if (typeof textureInfo.setTexture === "function") {
          textureInfo.setTexture(texture);
          return;
        }
      } catch {
        // Fallback below for runtime compatibility.
      }
      try {
        textureInfo.texture = texture;
      } catch {
        // Ignore if readonly.
      }
    };

    for (const material of model.materials) {
      const pbr = material.pbrMetallicRoughness;
      // Clay-like neutral solid material: visible volumes without texture noise.
      pbr.setBaseColorFactor([1, 1, 1, 1]);
      pbr.setMetallicFactor(0);
      pbr.setRoughnessFactor(0.92);
      assignTexture(pbr.baseColorTexture, solidTextureRef.current ?? null);
      assignTexture(pbr.metallicRoughnessTexture, null);
      assignTexture(material.occlusionTexture, null);
      assignTexture(material.emissiveTexture, null);
      material.setEmissiveFactor([0, 0, 0]);
    }
  };

  const captureCameraState = () => {
    const viewer = viewerRef.current as any;
    if (!viewer) return;
    let orbit = String(viewer.cameraOrbit ?? "");
    let target = String(viewer.cameraTarget ?? "");
    let fov = String(viewer.fieldOfView ?? "");

    try {
      if (typeof viewer.getCameraOrbit === "function") {
        const cameraOrbit = viewer.getCameraOrbit();
        if (cameraOrbit) {
          orbit = `${cameraOrbit.theta}rad ${cameraOrbit.phi}rad ${cameraOrbit.radius}m`;
        }
      }
      if (typeof viewer.getCameraTarget === "function") {
        const cameraTarget = viewer.getCameraTarget();
        if (cameraTarget) {
          target = `${cameraTarget.x}m ${cameraTarget.y}m ${cameraTarget.z}m`;
        }
      }
      if (typeof viewer.getFieldOfView === "function") {
        const fieldOfView = viewer.getFieldOfView();
        if (fieldOfView) {
          fov = `${fieldOfView}deg`;
        }
      }
    } catch {
      // Keep string fallbacks above.
    }

    if (orbit) {
      pendingCameraStateRef.current = { orbit, target, fov };
      setCameraState({ orbit, target, fov });
    }
  };

  const restoreCameraState = () => {
    const viewer = viewerRef.current as any;
    const saved = pendingCameraStateRef.current;
    if (!viewer || !saved) return;

    try {
      viewer.cameraOrbit = saved.orbit;
      if (saved.target) {
        viewer.cameraTarget = saved.target;
      }
      if (saved.fov) {
        viewer.fieldOfView = saved.fov;
      }
      if (typeof viewer.jumpCameraToGoal === "function") {
        viewer.jumpCameraToGoal();
      }
    } finally {
      pendingCameraStateRef.current = null;
    }
  };

  return (
    <div className="space-y-7">
      <div>
        <p className="ni-label">Aperçu 3D</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Studio 3D</h1>
        <p className="ni-page-lead mt-2 max-w-4xl">
          Affichez un premier aperçu visuel pour aider un client à se projeter.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-4">
        {["Produit", "Vue", "Validation", "Support client"].map((step, index) => (
          <div key={step} className="rounded-2xl border border-border bg-card/94 px-4 py-3 text-sm shadow-sm">
            <p className="ni-label">Étape {index + 1}</p>
            <p className="mt-1 font-semibold text-foreground">{step}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[1.1fr_2fr_1fr] gap-5">
        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Idée à montrer</CardTitle>
            <p className="text-xs text-muted-foreground">Choisissez un produit ou une vue pour expliquer rapidement l&apos;idée au client.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="ni-label">Point de depart</p>
                <span className="rounded-xl border border-border bg-muted px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Aide visuelle
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={generationMode === "prompt" ? "default" : "outline"}
                  className={`h-12 min-w-[132px] flex-1 rounded-xl px-3 text-xs ${
                    generationMode === "prompt" ? "border-transparent" : "border-border"
                  }`}
                  onClick={() => setGenerationMode("prompt")}
                >
                  <span className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <MessageSquareText className="h-3.5 w-3.5" />
                    Description
                  </span>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={generationMode === "single-image" ? "default" : "outline"}
                  className={`h-12 min-w-[132px] flex-1 rounded-xl px-3 text-[11px] ${
                    generationMode === "single-image" ? "border-transparent" : "border-border"
                  }`}
                  onClick={() => setGenerationMode("single-image")}
                >
                  <span className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <Images className="h-3.5 w-3.5" />
                    Image unique
                  </span>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={generationMode === "four-views" ? "default" : "outline"}
                  className={`h-12 min-w-[132px] flex-1 rounded-xl px-3 text-xs ${
                    generationMode === "four-views" ? "border-transparent" : "border-border"
                  }`}
                  onClick={() => setGenerationMode("four-views")}
                >
                  <span className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="h-3.5 w-3.5" />
                    4 vues produit
                  </span>
                </Button>
              </div>
            </div>

            {generationMode === "prompt" ? (
              <div className="rounded-xl border border-border bg-muted/52 p-3">
                <p className="ni-label mb-2">Decrivez le produit</p>
                <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} className="min-h-24 rounded-xl" />
              </div>
            ) : null}

            {generationMode === "single-image" ? (
              <div className="rounded-xl border border-border bg-muted/52 p-3">
                <p className="ni-label mb-2">Image de référence</p>
                <Input
                  ref={singleImageInputRef}
                  type="file"
                  accept="image/*"
                  className="rounded-xl"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setSingleImagePreview((prev) => {
                      if (prev) URL.revokeObjectURL(prev);
                      return URL.createObjectURL(file);
                    });
                  }}
                />
                {singleImagePreview ? (
                  <div className="mt-3">
                    <p className="mb-1 text-xs text-muted-foreground">Aperçu image</p>
                    <div className="relative inline-block">
                      {/* eslint-disable-next-line @next/next/no-img-element -- blob URL preview for maquette */}
                      <img src={singleImagePreview} alt="Aperçu upload" className="h-20 w-20 rounded-xl border border-border object-cover" />
                      <button
                        type="button"
                        onClick={clearSingleImage}
                        className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
                        aria-label="Supprimer l'image"
                        title="Supprimer l'image"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            {generationMode === "four-views" ? (
              <div className="space-y-2 rounded-xl border border-border bg-muted/52 p-3">
                <p className="ni-label mb-1">4 vues produit</p>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Front</p>
                    <Input
                      ref={(el) => {
                        viewFileInputRefs.current.front = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="rounded-xl"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        setViewsPreview((prev) => {
                          if (prev.front) URL.revokeObjectURL(prev.front);
                          return { ...prev, front: URL.createObjectURL(file) };
                        });
                      }}
                    />
                    {viewsPreview.front ? (
                      <div className="relative mt-2 inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element -- blob URL preview for maquette */}
                        <img src={viewsPreview.front} alt="Front preview" className="h-14 w-14 rounded-xl border border-border object-cover" />
                        <button
                          type="button"
                          onClick={() => clearViewImage("front")}
                          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
                          aria-label="Supprimer la vue front"
                          title="Supprimer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Back</p>
                    <Input
                      ref={(el) => {
                        viewFileInputRefs.current.back = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="rounded-xl"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        setViewsPreview((prev) => {
                          if (prev.back) URL.revokeObjectURL(prev.back);
                          return { ...prev, back: URL.createObjectURL(file) };
                        });
                      }}
                    />
                    {viewsPreview.back ? (
                      <div className="relative mt-2 inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element -- blob URL preview for maquette */}
                        <img src={viewsPreview.back} alt="Back preview" className="h-14 w-14 rounded-xl border border-border object-cover" />
                        <button
                          type="button"
                          onClick={() => clearViewImage("back")}
                          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
                          aria-label="Supprimer la vue back"
                          title="Supprimer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Left</p>
                    <Input
                      ref={(el) => {
                        viewFileInputRefs.current.left = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="rounded-xl"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        setViewsPreview((prev) => {
                          if (prev.left) URL.revokeObjectURL(prev.left);
                          return { ...prev, left: URL.createObjectURL(file) };
                        });
                      }}
                    />
                    {viewsPreview.left ? (
                      <div className="relative mt-2 inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element -- blob URL preview for maquette */}
                        <img src={viewsPreview.left} alt="Left preview" className="h-14 w-14 rounded-xl border border-border object-cover" />
                        <button
                          type="button"
                          onClick={() => clearViewImage("left")}
                          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
                          aria-label="Supprimer la vue left"
                          title="Supprimer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                  <div>
                    <p className="mb-1 text-xs text-muted-foreground">Right</p>
                    <Input
                      ref={(el) => {
                        viewFileInputRefs.current.right = el;
                      }}
                      type="file"
                      accept="image/*"
                      className="rounded-xl"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        setViewsPreview((prev) => {
                          if (prev.right) URL.revokeObjectURL(prev.right);
                          return { ...prev, right: URL.createObjectURL(file) };
                        });
                      }}
                    />
                    {viewsPreview.right ? (
                      <div className="relative mt-2 inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element -- blob URL preview for maquette */}
                        <img src={viewsPreview.right} alt="Right preview" className="h-14 w-14 rounded-xl border border-border object-cover" />
                        <button
                          type="button"
                          onClick={() => clearViewImage("right")}
                          className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:bg-muted hover:text-foreground"
                          aria-label="Supprimer la vue right"
                          title="Supprimer"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}
            <div>
              <p className="ni-label mb-2">Type produit</p>
              <select
                value={productType}
                onChange={(event) => setProductType(event.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground"
              >
                <option>Equipement industriel</option>
                <option>Poste de travail</option>
                <option>Mobilier logistique</option>
                <option>Chassis technique</option>
              </select>
            </div>
            <Button onClick={handleGenerate} className="w-full rounded-xl">
              Préparer l&apos;aperçu
            </Button>
            <div className="rounded-xl border border-border bg-muted/60 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{helperText}</p>
                <p className="text-xs font-medium text-foreground">{progress}%</p>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary/80">
                <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle className="text-base tracking-tight">Aperçu 3D</CardTitle>
                <p className="text-xs text-muted-foreground">Changez de produit pour montrer une configuration ou une idée au client.</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {productOptions.map((option) => (
                  <Button
                    key={option.label}
                    onClick={() => setSelectedProduct(option)}
                    size="sm"
                    variant={selectedProduct.label === option.label ? "default" : "outline"}
                    className={`h-7 rounded-xl px-2.5 text-xs ${
                      selectedProduct.label === option.label
                        ? "bg-primary text-primary-foreground hover:opacity-90"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-hidden rounded-xl border border-border bg-muted">
              <model-viewer
                ref={(element) => {
                  viewerRef.current = element;
                }}
                key={`${selectedProduct.label}-${selectedProduct.model}-${modelRevision}`}
                src={selectedProduct.model}
                alt={`Modèle ${selectedProduct.label}`}
                camera-orbit={cameraState.orbit}
                camera-target={cameraState.target}
                field-of-view={cameraState.fov}
                camera-controls
                auto-rotate
                autoplay
                environment-image="neutral"
                shadow-intensity={viewMode === "solid" ? "1.25" : "1.1"}
                exposure={viewMode === "solid" ? "0.9" : "1"}
                tone-mapping="commerce"
                onLoad={() => {
                  requestAnimationFrame(() => {
                    restoreCameraState();
                  });
                  if (viewMode === "solid") {
                    void applyMaterialMode("solid");
                  }
                }}
                style={{
                  width: "100%",
                  height: "560px",
                  backgroundColor: "var(--color-muted)",
                }}
              />
              {state === "loading" ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/70 text-sm text-muted-foreground">
                  Préparation de l&apos;aperçu...
                </div>
              ) : null}
            </div>
            <div className="mt-3 rounded-xl border border-border bg-muted p-3">
              <p className="ni-label mb-2">Mode affichage</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={viewMode === "solid" ? "default" : "outline"}
                  onClick={() => {
                    captureCameraState();
                    setViewMode("solid");
                    void applyMaterialMode("solid");
                  }}
                  className={viewMode === "solid" ? "rounded-xl" : "rounded-xl border-border"}
                >
                  Vue volumes (mat)
                </Button>
                <Button
                  variant={viewMode === "textured" ? "default" : "outline"}
                  onClick={() => {
                    captureCameraState();
                    setViewMode("textured");
                    setModelRevision((value) => value + 1);
                  }}
                  className={viewMode === "textured" ? "rounded-xl" : "rounded-xl border-border"}
                >
                  Vue textures
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-border bg-card shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base tracking-tight">Fiche rapide</CardTitle>
            <p className="text-xs text-muted-foreground">Ce que l&apos;équipe vérifie avant de l&apos;utiliser dans une offre.</p>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <p className="flex justify-between text-muted-foreground">
              <span>Produit selectionne</span>
              <span className="font-medium text-foreground">{selectedProduct.label}</span>
            </p>
            <p className="flex justify-between text-muted-foreground">
              <span>Statut</span>
              <span className="rounded-xl border border-[#cde6d5] bg-[#eef8f1] px-2 py-0.5 text-xs text-[#2e6a42]">
                Prêt pour présentation
              </span>
            </p>
            <p className="flex justify-between text-muted-foreground">
              <span>Type</span>
              <span className="text-foreground">Poste NI&apos;One personnalise</span>
            </p>
            <div className="space-y-2 pt-2">
              <Button variant="outline" className="w-full rounded-xl border-border">
                Telecharger une capture PNG
              </Button>
              <Button variant="outline" className="w-full rounded-xl border-border">
                Copier le lien de l&apos;aperçu
              </Button>
              <Button className="w-full rounded-xl">Inserer dans une offre</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

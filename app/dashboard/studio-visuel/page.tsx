"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const productOptions = [
  { label: "Etabli", model: "/models/bureau.glb" },
  { label: "Chariot", model: "/models/charriot.glb" },
  { label: "Convoyeur", model: "/models/convoyeur.glb" },
  { label: "Buffer", model: "/models/etagere.glb" },
  { label: "Chassis", model: "/models/frame.glb" },
] as const;

type StudioState = "initial" | "loading" | "result";

export default function StudioVisuelPage() {
  useEffect(() => {
    void import("@google/model-viewer");
  }, []);

  const [state, setState] = useState<StudioState>("initial");
  const [prompt, setPrompt] = useState("Convoyeur compact pour ligne d'assemblage modulaire.");
  const [productType, setProductType] = useState("Equipement industriel");
  const [selectedProduct, setSelectedProduct] = useState<(typeof productOptions)[number]>(productOptions[0]);
  const [progress, setProgress] = useState(0);
  const [viewMode, setViewMode] = useState<"solid" | "textured">("textured");
  const [modelRevision, setModelRevision] = useState(0);
  const [cameraState, setCameraState] = useState<{ orbit?: string; target?: string; fov?: string }>({});
  const viewerRef = useRef<HTMLElement | null>(null);
  const solidTextureRef = useRef<any>(null);
  const pendingCameraStateRef = useRef<{ orbit: string; target: string; fov: string } | null>(null);

  const helperText = useMemo(() => {
    if (state === "loading") return "Generation visuelle en cours...";
    if (state === "result") return "Modele pret pour presentation client.";
    return "Configurez la demande puis lancez la generation simulee.";
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
    <div className="space-y-6">
      <div>
        <p className="ni-label">Visual intelligence</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Studio visuel intelligent</h1>
        <p className="mt-2 max-w-4xl text-sm text-muted-foreground">
          Generation de visuels produits 3D pour les offres, presentations techniques et revues internes.
        </p>
      </div>

      <Card className="rounded-sm border-border bg-[linear-gradient(135deg,var(--color-card)_0%,var(--color-muted)_100%)]">
        <CardContent className="px-6 py-5 text-sm text-muted-foreground">
          Flux de travail studio: briefing produit, import de reference, generation assistee puis rendu 3D
          directement exploitable dans vos documents commerciaux.
        </CardContent>
      </Card>

      <div className="grid grid-cols-[1.1fr_2fr_1fr] gap-5">
        <Card className="rounded-sm border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">Zone de generation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="ni-label mb-2">Decrivez le produit</p>
              <Textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} className="min-h-24 rounded-sm" />
            </div>
            <div>
              <p className="ni-label mb-2">Upload image</p>
              <Input type="file" className="rounded-sm" />
            </div>
            <div>
              <p className="ni-label mb-2">Type produit</p>
              <select
                value={productType}
                onChange={(event) => setProductType(event.target.value)}
                className="h-10 w-full rounded-sm border border-border bg-card px-3 text-sm text-foreground"
              >
                <option>Equipement industriel</option>
                <option>Poste de travail</option>
                <option>Mobilier logistique</option>
                <option>Chassis technique</option>
              </select>
            </div>
            <Button onClick={handleGenerate} className="w-full rounded-sm">
              Generer le modele 3D
            </Button>
            <div className="rounded-sm border border-border bg-muted p-3">
              <p className="text-xs text-muted-foreground">{helperText}</p>
              <div className="mt-2 h-2 rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base tracking-tight">Viewer 3D produit</CardTitle>
              <div className="flex flex-wrap gap-1.5">
                {productOptions.map((option) => (
                  <Button
                    key={option.label}
                    onClick={() => setSelectedProduct(option)}
                    size="sm"
                    variant={selectedProduct.label === option.label ? "default" : "outline"}
                    className={`h-7 rounded-sm px-2.5 text-xs ${
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
            <div className="relative overflow-hidden rounded-sm border border-border bg-muted">
              <model-viewer
                ref={(element) => {
                  viewerRef.current = element;
                }}
                key={`${selectedProduct.model}-${modelRevision}`}
                src={selectedProduct.model}
                alt={`Modele ${selectedProduct.label}`}
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
                  Generation en cours...
                </div>
              ) : null}
            </div>
            <div className="mt-3 rounded-sm border border-border bg-muted p-3">
              <p className="ni-label mb-2">Mode affichage</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={viewMode === "solid" ? "default" : "outline"}
                  onClick={() => {
                    captureCameraState();
                    setViewMode("solid");
                    void applyMaterialMode("solid");
                  }}
                  className={viewMode === "solid" ? "rounded-sm" : "rounded-sm border-border"}
                >
                  Solid View
                </Button>
                <Button
                  variant={viewMode === "textured" ? "default" : "outline"}
                  onClick={() => {
                    captureCameraState();
                    setViewMode("textured");
                    setModelRevision((value) => value + 1);
                  }}
                  className={viewMode === "textured" ? "rounded-sm" : "rounded-sm border-border"}
                >
                  Textured View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-border bg-card">
          <CardHeader>
            <CardTitle className="text-base tracking-tight">Panneau produit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="flex justify-between text-muted-foreground">
              <span>Produit selectionne</span>
              <span className="font-medium text-foreground">{selectedProduct.label}</span>
            </p>
            <p className="flex justify-between text-muted-foreground">
              <span>Statut</span>
              <span className="rounded-sm border border-[#cde6d5] bg-[#eef8f1] px-2 py-0.5 text-xs text-[#2e6a42]">
                Pret pour presentation
              </span>
            </p>
            <p className="flex justify-between text-muted-foreground">
              <span>Type</span>
              <span className="text-foreground">Demonstration</span>
            </p>
            <div className="space-y-2 pt-2">
              <Button variant="outline" className="w-full rounded-sm border-border">
                Telecharger apercu
              </Button>
              <Button variant="outline" className="w-full rounded-sm border-border">
                Copier lien
              </Button>
              <Button className="w-full rounded-sm">Utiliser dans devis</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

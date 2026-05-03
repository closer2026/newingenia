"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Clapperboard, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MediathequeGalleryProps = {
  initialFiles: string[];
};

function isVideoFile(name: string): boolean {
  return /\.(mp4|webm|mov)$/i.test(name);
}

export function MediathequeGallery({ initialFiles }: MediathequeGalleryProps) {
  const [files, setFiles] = useState<string[]>(initialFiles);
  const [viewerFile, setViewerFile] = useState<string | null>(null);

  useEffect(() => {
    setFiles(initialFiles);
  }, [initialFiles]);

  const closeViewer = useCallback(() => setViewerFile(null), []);

  useEffect(() => {
    if (!viewerFile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [viewerFile, closeViewer]);

  async function handleDelete() {
    if (!viewerFile) return;
    const name = viewerFile;
    try {
      const res = await fetch(`/api/mediatheque/${encodeURIComponent(name)}`, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Impossible de supprimer le fichier.");
        return;
      }
      setFiles((prev) => prev.filter((f) => f !== name));
      closeViewer();
      toast.success("Fichier supprimé.");
    } catch {
      toast.error("Erreur réseau.");
    }
  }

  if (files.length === 0) {
    return (
      <Card className="rounded-[22px] border border-dashed border-border/80 bg-muted/30 dark:border-white/10">
        <CardContent className="py-10 text-center text-sm text-muted-foreground">
          <p>Aucun média pour le moment.</p>
          <p className="mt-2">
            Ajoutez des images (JPEG, PNG, WebP…) ou des vidéos (MP4, WebM…) dans{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs text-foreground">public/mediatheque</code>{" "}
            sous la forme <code className="text-xs">img-001.jpeg</code>, <code className="text-xs">img-012.mp4</code>, etc.,
            puis rechargez la page.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {files.map((file) => {
          const video = isVideoFile(file);
          const label = file.replace(/\.[^.]+$/, "").replace(/-/g, " ");
          return (
            <button
              key={file}
              type="button"
              onClick={() => setViewerFile(file)}
              className={cn(
                "group relative aspect-square overflow-hidden rounded-2xl border border-border/70 bg-muted/30 text-left shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-white/10 dark:ring-white/10"
              )}
            >
              {video ? (
                <video
                  src={`/mediatheque/${file}`}
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={label}
                />
              ) : (
                <Image
                  src={`/mediatheque/${file}`}
                  alt={label}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              )}
              {video ? (
                <span className="absolute bottom-2 left-2 flex items-center gap-1 rounded-lg bg-black/65 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                  <Clapperboard className="size-3" aria-hidden />
                  Vidéo
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {viewerFile ? (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Visualiseur média"
          onClick={closeViewer}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col gap-4 rounded-2xl border border-white/10 bg-[#0f141b]/95 p-4 shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 truncate text-xs font-medium text-white/90">{viewerFile}</p>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="rounded-xl text-xs"
                  onClick={() => void handleDelete()}
                >
                  <Trash2 className="mr-1.5 size-3.5" aria-hidden />
                  Supprimer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-white/20 bg-white/10 text-xs text-white hover:bg-white/20"
                  onClick={closeViewer}
                >
                  <X className="mr-1.5 size-3.5" aria-hidden />
                  Fermer
                </Button>
              </div>
            </div>

            <div className="relative mx-auto flex min-h-[200px] w-full flex-1 items-center justify-center">
              {isVideoFile(viewerFile) ? (
                <video
                  src={`/mediatheque/${viewerFile}`}
                  controls
                  playsInline
                  className="max-h-[min(78vh,820px)] w-full max-w-full rounded-lg bg-black"
                  preload="metadata"
                />
              ) : (
                <div className="relative h-[min(78vh,820px)] w-full">
                  <Image
                    src={`/mediatheque/${viewerFile}`}
                    alt={viewerFile.replace(/\.[^.]+$/, "").replace(/-/g, " ")}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

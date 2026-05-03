import fs from "node:fs";
import path from "node:path";
import { PageHeader } from "@/components/layout/PageHeader";
import { MediathequeGallery } from "@/components/mediatheque/MediathequeGallery";

const MEDIA_EXT = /\.(jpe?g|png|webp|gif|mp4|webm|mov)$/i;

function listMediathequeFiles(): string[] {
  const dir = path.join(process.cwd(), "public", "mediatheque");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => MEDIA_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export default function MediathequePage() {
  const files = listMediathequeFiles();

  return (
    <div className="space-y-7">
      <PageHeader
        label="Ressources visuelles"
        title="Médiathèque"
        lead="Banque d’images, de courtes vidéos et de visuels prêts à être partagés avec les clients ou intégrés dans vos présentations (maquette)."
      />

      <MediathequeGallery initialFiles={files} />
    </div>
  );
}

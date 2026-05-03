import fs from "node:fs";
import path from "node:path";
import { PageHeader } from "@/components/layout/PageHeader";
import { MediathequeGallery } from "@/components/mediatheque/MediathequeGallery";

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function listMediathequeFiles(): string[] {
  const dir = path.join(process.cwd(), "public", "mediatheque");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

export default function MediathequePage() {
  const files = listMediathequeFiles();

  return (
    <div className="space-y-7">
      <PageHeader
        label="Ressources visuelles"
        title="Médiathèque"
        lead="Banque d’images et de visuels prêts à être partagés avec les clients ou intégrés dans vos présentations (maquette)."
      />

      <MediathequeGallery initialFiles={files} />
    </div>
  );
}

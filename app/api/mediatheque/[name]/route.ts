import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

/** Noms générés par la synchro locale uniquement (pas de traversée de chemin). */
const SAFE_NAME = /^img-\d{3}\.(jpe?g|png|webp|gif)$/i;

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ name: string }> | { name: string } }
) {
  const params = await Promise.resolve(context.params);
  const raw = params.name ?? "";
  const name = decodeURIComponent(raw);

  if (!SAFE_NAME.test(name)) {
    return NextResponse.json({ error: "Nom de fichier non autorisé." }, { status: 400 });
  }

  const baseDir = path.join(process.cwd(), "public", "mediatheque");
  const filePath = path.join(baseDir, name);
  const resolvedBase = path.resolve(baseDir);
  const resolvedFile = path.resolve(filePath);

  if (!resolvedFile.startsWith(resolvedBase + path.sep) && resolvedFile !== resolvedBase) {
    return NextResponse.json({ error: "Chemin invalide." }, { status: 400 });
  }

  try {
    await fs.unlink(resolvedFile);
    return NextResponse.json({ ok: true });
  } catch (e) {
    const err = e as NodeJS.ErrnoException;
    if (err.code === "ENOENT") {
      return NextResponse.json({ error: "Fichier introuvable." }, { status: 404 });
    }
    return NextResponse.json({ error: "Suppression impossible (droits ou environnement)." }, { status: 500 });
  }
}

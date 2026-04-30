"""Génère un pattern SVG low-poly tileable inspiré du wallpaper de référence."""
from __future__ import annotations

import math
import random
from pathlib import Path

random.seed(42)

W = 1200  # tile width
H = 900   # tile height
STEP = 110  # spacing entre les points (plus petit = plus de triangles)
JITTER = 36  # variation horizontale/verticale (organique)

# Couleurs très claires, dans des tons gris/bleu froid (extraits de l'image fournie)
STROKE = "#c8d2dc"
STROKE_SOFT = "#dde4ec"
FILL_LIGHT = "#f7f9fb"
FILL_MID = "#f1f4f8"
FILL_DARK = "#e6ebf2"
FILL_HIGHLIGHT = "#ffffff"
DOT = "#aab8c5"


def grid_points():
    """Grille triangulaire régulière + jitter, aux bords figés pour la tileabilité."""
    pts = []
    rows = []
    y = 0
    row_index = 0
    while y <= H:
        x = -STEP if (row_index % 2 == 0) else -STEP / 2
        row = []
        col_index = 0
        while x <= W + STEP:
            jx = 0 if (x <= 0 or x >= W) else random.uniform(-JITTER, JITTER)
            jy = 0 if (y <= 0 or y >= H) else random.uniform(-JITTER, JITTER)
            row.append((x + jx, y + jy))
            col_index += 1
            x += STEP
        rows.append(row)
        pts.append(row)
        y += STEP * math.sin(math.pi / 3)
        row_index += 1
    return rows


def triangulate(rows):
    """Triangulation entre lignes successives d'une grille décalée."""
    tris = []
    for i in range(len(rows) - 1):
        top = rows[i]
        bot = rows[i + 1]
        # On combine alternativement les sommets du haut et du bas pour fabriquer les triangles
        n = min(len(top), len(bot))
        even = i % 2 == 0
        for j in range(n - 1):
            if even:
                tris.append((top[j], bot[j], top[j + 1]))
                tris.append((top[j + 1], bot[j], bot[j + 1]))
            else:
                tris.append((top[j], bot[j], bot[j + 1]))
                tris.append((top[j], bot[j + 1], top[j + 1]))
    return tris


def pick_fill(centroid):
    cx, cy = centroid
    # Eclaircit autour du centre, assombrit légèrement vers les coins
    nx = (cx - W / 2) / (W / 2)
    ny = (cy - H / 2) / (H / 2)
    d = math.hypot(nx, ny)
    r = random.random()
    if d < 0.35 and r < 0.18:
        return FILL_HIGHLIGHT
    if d < 0.55:
        return FILL_LIGHT if r < 0.55 else FILL_MID
    if d < 0.85:
        return FILL_MID if r < 0.7 else FILL_DARK
    return FILL_DARK


def main() -> None:
    rows = grid_points()
    tris = triangulate(rows)

    parts: list[str] = []
    parts.append(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'preserveAspectRatio="xMidYMid slice" width="{W}" height="{H}">'
    )
    # Fond
    parts.append(
        f'<rect width="{W}" height="{H}" fill="{FILL_LIGHT}"/>'
    )

    # Triangles (remplissage doux + contour fin)
    for a, b, c in tris:
        cx = (a[0] + b[0] + c[0]) / 3
        cy = (a[1] + b[1] + c[1]) / 3
        fill = pick_fill((cx, cy))
        d = (
            f"M{a[0]:.1f} {a[1]:.1f} L{b[0]:.1f} {b[1]:.1f} "
            f"L{c[0]:.1f} {c[1]:.1f} Z"
        )
        stroke = STROKE if random.random() < 0.55 else STROKE_SOFT
        parts.append(
            f'<path d="{d}" fill="{fill}" stroke="{stroke}" stroke-width="1" '
            f'stroke-linejoin="round"/>'
        )

    # Points lumineux à certaines intersections
    for row in rows:
        for x, y in row:
            if random.random() < 0.18:
                parts.append(
                    f'<circle cx="{x:.1f}" cy="{y:.1f}" r="1.6" fill="{DOT}" '
                    f'fill-opacity="0.55"/>'
                )

    parts.append("</svg>")

    out = Path("public/bg-pattern.svg")
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text("".join(parts), encoding="utf-8")
    print(f"Wrote {out} ({out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()

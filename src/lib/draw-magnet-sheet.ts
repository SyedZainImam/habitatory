import type { MagnetTemplate } from "./magnet-templates";

export interface MagnetSiteInfo {
    companyName: string;
    email: string;
    website: string;        // e.g. "www.habitatory.ca"
    instagramHandle: string; // e.g. "habitatory_"
}

function loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

export async function drawMagnetSheet(
    canvas: HTMLCanvasElement,
    template: MagnetTemplate,
    croppedPhotoSrcs: string[],
    siteInfo: MagnetSiteInfo
): Promise<void> {
    const { sheetWidthPx, sheetHeightPx, marginPx, colGutterPx, rowGutterPx,
            cols, rows, topStripPx, bottomStripPx, leftStripPx, rightStripPx } = template;

    canvas.width = sheetWidthPx;
    canvas.height = sheetHeightPx;
    const ctx = canvas.getContext("2d")!;

    // Load photos
    const photos = await Promise.all(
        croppedPhotoSrcs.map((src) => (src ? loadImage(src) : Promise.resolve(null)))
    );

    // Ensure Playfair Display bold italic is loaded (next/font registers it under the family name)
    try {
        await document.fonts.load(`bold italic 60px 'Playfair Display'`);
        await document.fonts.load(`24px 'Inter'`);
    } catch {
        // Fall through to system-font fallbacks
    }

    // White sheet background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, sheetWidthPx, sheetHeightPx);

    const magW = (sheetWidthPx - 2 * marginPx - (cols - 1) * colGutterPx) / cols;
    const magH = (sheetHeightPx - 2 * marginPx - (rows - 1) * rowGutterPx) / rows;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const idx = row * cols + col;
            const x = Math.round(marginPx + col * (magW + colGutterPx));
            const y = Math.round(marginPx + row * (magH + rowGutterPx));
            const w = Math.round(magW);
            const h = Math.round(magH);

            drawSingleMagnet(
                ctx, x, y, w, h,
                topStripPx, bottomStripPx, leftStripPx, rightStripPx,
                photos[idx] ?? null,
                siteInfo
            );
        }
    }
}

function drawSingleMagnet(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number,
    topStrip: number, botStrip: number, leftStrip: number, rightStrip: number,
    photo: HTMLImageElement | null,
    info: MagnetSiteInfo
): void {
    // White background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x, y, w, h);

    // Outer border (thin, matches reference)
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 1, y + 1, w - 2, h - 2);

    // ── Top strip: "Habitatory" — bold italic Playfair Display ──────
    const brandFontSize = Math.round(topStrip * 0.50);
    ctx.fillStyle = "#2C5F72";
    ctx.font = `bold italic ${brandFontSize}px 'Playfair Display', Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(info.companyName, x + w / 2, y + topStrip / 2);

    // Thin gold divider below title — runs full magnet width
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + 8, y + topStrip);
    ctx.lineTo(x + w - 8, y + topStrip);
    ctx.stroke();

    // ── Photo area ────────────────────────────────────────────────
    const photoX = x + leftStrip;
    const photoY = y + topStrip;
    const photoW = w - leftStrip - rightStrip;
    const photoH = h - topStrip - botStrip;

    if (photo) {
        // Object-fit: cover — fills the slot without stretching
        const srcAR = photo.naturalWidth / photo.naturalHeight;
        const dstAR = photoW / photoH;
        let sx = 0, sy = 0, sw = photo.naturalWidth, sh = photo.naturalHeight;
        if (srcAR > dstAR) {
            sw = photo.naturalHeight * dstAR;
            sx = (photo.naturalWidth - sw) / 2;
        } else {
            sh = photo.naturalWidth / dstAR;
            sy = (photo.naturalHeight - sh) / 2;
        }
        ctx.drawImage(photo, sx, sy, sw, sh, photoX, photoY, photoW, photoH);

        // Thin inner photo border (matches reference)
        ctx.strokeStyle = "#555555";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(photoX, photoY, photoW, photoH);
    } else {
        // Empty slot placeholder
        ctx.fillStyle = "#f2f5f7";
        ctx.fillRect(photoX, photoY, photoW, photoH);
        ctx.strokeStyle = "#cccccc";
        ctx.lineWidth = 1;
        ctx.strokeRect(photoX, photoY, photoW, photoH);
    }

    // ── Left strip: ✉ email (rotated −90°) ───────────────────────
    const sideFontSize = Math.round(leftStrip * 0.22);
    ctx.save();
    ctx.translate(x + leftStrip / 2, y + h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#444444";
    ctx.font = `${sideFontSize}px 'Inter', Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`✉ ${info.email}`, 0, 0); // ✉ envelope
    ctx.restore();

    // ── Right strip: + website (rotated +90°) ────────────────────
    ctx.save();
    ctx.translate(x + w - rightStrip / 2, y + h / 2);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = "#444444";
    ctx.font = `${sideFontSize}px 'Inter', Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`+ ${info.website}`, 0, 0); // "+" matches reference template
    ctx.restore();

    // ── Bottom strip: © instagram handle ─────────────────────────
    const botFontSize = Math.round(botStrip * 0.36);
    ctx.fillStyle = "#444444";
    ctx.font = `${botFontSize}px 'Inter', Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`© ${info.instagramHandle}`, x + w / 2, y + h - botStrip / 2); // ©
}

export async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Canvas toBlob failed"));
            },
            "image/jpeg",
            0.92
        );
    });
}

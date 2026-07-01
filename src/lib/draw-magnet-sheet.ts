import type { MagnetTemplate } from "./magnet-templates";

export interface MagnetSiteInfo {
    companyName: string;
    email: string;
    website: string;        // e.g. "www.habitatory.ca"
    instagramHandle: string; // e.g. "habitatory.ca"
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

    // Load photos (only the ones provided)
    const photos = await Promise.all(
        croppedPhotoSrcs.map((src) => (src ? loadImage(src) : Promise.resolve(null)))
    );

    // Ensure fonts are loaded
    try {
        await document.fonts.load(`bold 60px 'Playfair Display'`);
        await document.fonts.load(`28px 'Inter'`);
    } catch {
        // Fall back to system fonts if custom fonts fail
    }

    // Sheet background
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

    // Outer border
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 3;
    ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);

    // ── Top strip: company name ───────────────────────────────
    const brandFontSize = Math.round(topStrip * 0.44);
    ctx.fillStyle = "#2C5F72";
    ctx.font = `bold ${brandFontSize}px 'Playfair Display', Georgia, serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(info.companyName, x + w / 2, y + topStrip / 2);

    // Thin divider line below top strip
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + leftStrip + 10, y + topStrip);
    ctx.lineTo(x + w - rightStrip - 10, y + topStrip);
    ctx.stroke();

    // ── Photo area ────────────────────────────────────────────
    const photoX = x + leftStrip;
    const photoY = y + topStrip;
    const photoW = w - leftStrip - rightStrip;
    const photoH = h - topStrip - botStrip;

    if (photo) {
        // Object-fit: cover — crop to fill the photo slot
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
    } else {
        ctx.fillStyle = "#ddeef5";
        ctx.fillRect(photoX, photoY, photoW, photoH);
        ctx.fillStyle = "#aaccdd";
        ctx.font = `${Math.round(photoH * 0.08)}px 'Inter', Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Photo", photoX + photoW / 2, photoY + photoH / 2);
    }

    // Thin divider line above bottom strip
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + leftStrip + 10, y + h - botStrip);
    ctx.lineTo(x + w - rightStrip - 10, y + h - botStrip);
    ctx.stroke();

    // ── Left strip: email (rotated -90°) ──────────────────────
    const sideFontSize = Math.round(leftStrip * 0.23);
    ctx.save();
    ctx.translate(x + leftStrip / 2, y + h / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillStyle = "#333333";
    ctx.font = `${sideFontSize}px 'Inter', Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`✉ ${info.email}`, 0, 0); // ✉
    ctx.restore();

    // Thin left-strip divider
    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + leftStrip, y + topStrip);
    ctx.lineTo(x + leftStrip, y + h - botStrip);
    ctx.stroke();

    // ── Right strip: website (rotated +90°) ───────────────────
    ctx.save();
    ctx.translate(x + w - rightStrip / 2, y + h / 2);
    ctx.rotate(Math.PI / 2);
    ctx.fillStyle = "#333333";
    ctx.font = `${sideFontSize}px 'Inter', Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`⌖ ${info.website}`, 0, 0); // ⌖ as globe alternative
    ctx.restore();

    // Thin right-strip divider
    ctx.strokeStyle = "#eeeeee";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x + w - rightStrip, y + topStrip);
    ctx.lineTo(x + w - rightStrip, y + h - botStrip);
    ctx.stroke();

    // ── Bottom strip: Instagram ────────────────────────────────
    const botFontSize = Math.round(botStrip * 0.34);
    ctx.fillStyle = "#333333";
    ctx.font = `${botFontSize}px 'Inter', Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`◎ ${info.instagramHandle}`, x + w / 2, y + h - botStrip / 2); // ◎
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

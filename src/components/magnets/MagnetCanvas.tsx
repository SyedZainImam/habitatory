"use client";

import { useEffect, useRef } from "react";
import { drawMagnetSheet } from "@/lib/draw-magnet-sheet";
import type { MagnetSiteInfo } from "@/lib/draw-magnet-sheet";
import { DEFAULT_TEMPLATE } from "@/lib/magnet-templates";

const DISPLAY_SCALE = 0.28;

interface Props {
    croppedPhotos: (string | null)[];
    siteInfo: MagnetSiteInfo;
}

export default function MagnetCanvas({ croppedPhotos, siteInfo }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const template = DEFAULT_TEMPLATE;
    const displayW = Math.round(template.sheetWidthPx * DISPLAY_SCALE);
    const displayH = Math.round(template.sheetHeightPx * DISPLAY_SCALE);

    useEffect(() => {
        if (!canvasRef.current) return;

        const offscreen = document.createElement("canvas");
        drawMagnetSheet(
            offscreen,
            template,
            croppedPhotos.map((p) => p ?? ""),
            siteInfo
        ).then(() => {
            const display = canvasRef.current;
            if (!display) return;
            display.width = displayW;
            display.height = displayH;
            const ctx = display.getContext("2d")!;
            ctx.drawImage(offscreen, 0, 0, displayW, displayH);
        });
    }, [croppedPhotos, siteInfo, template, displayW, displayH]);

    return (
        <div className="flex flex-col items-center">
            <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Sheet Preview</p>
            <canvas
                ref={canvasRef}
                width={displayW}
                height={displayH}
                className="rounded-lg shadow-xl border border-gray-200 max-w-full"
                style={{ width: displayW, height: displayH }}
            />
            <p className="text-xs text-gray-400 mt-2">8.5 × 11 in · 6 magnets · 300 DPI export</p>
        </div>
    );
}

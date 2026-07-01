"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { getCroppedImage } from "@/lib/crop-image";

interface Props {
    imageSrc: string;
    aspectRatio: number;
    photoIndex: number;
    totalPhotos: number;
    onCropDone: (croppedDataUrl: string) => void;
    onBack: () => void;
}

export default function PhotoCropper({
    imageSrc,
    aspectRatio,
    photoIndex,
    totalPhotos,
    onCropDone,
    onBack,
}: Props) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const onCropComplete = useCallback((_: Area, pixels: Area) => {
        setCroppedAreaPixels(pixels);
    }, []);

    async function handleDone() {
        if (!croppedAreaPixels) return;
        setIsProcessing(true);
        try {
            const cropped = await getCroppedImage(imageSrc, croppedAreaPixels);
            onCropDone(cropped);
        } finally {
            setIsProcessing(false);
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-[#2C5F72]">Crop Photo {photoIndex + 1}</h2>
                    <p className="text-sm text-gray-500">
                        {photoIndex + 1} of {totalPhotos} — drag to reposition, scroll to zoom
                    </p>
                </div>
                <div className="flex gap-2">
                    {Array.from({ length: totalPhotos }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i < photoIndex ? "bg-[#d4af37]" : i === photoIndex ? "bg-[#2C5F72]" : "bg-gray-200"}`}
                        />
                    ))}
                </div>
            </div>

            {/* Cropper container */}
            <div className="relative w-full rounded-xl overflow-hidden bg-black" style={{ height: 420 }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    showGrid={false}
                    style={{
                        containerStyle: { background: "#111" },
                        cropAreaStyle: { border: "2px solid #d4af37" },
                    }}
                />
            </div>

            {/* Zoom slider */}
            <div className="flex items-center gap-3 mt-4 mb-6">
                <span className="text-xs text-gray-500">Zoom</span>
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.05}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="flex-1 accent-[#2C5F72]"
                />
                <span className="text-xs text-gray-500">{zoom.toFixed(1)}×</span>
            </div>

            <div className="flex justify-between">
                <button
                    onClick={onBack}
                    className="text-gray-600 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    ← Back
                </button>
                <button
                    onClick={handleDone}
                    disabled={isProcessing}
                    className="bg-[#2C5F72] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a3c47] transition-colors disabled:opacity-50"
                >
                    {isProcessing
                        ? "Processing…"
                        : photoIndex < totalPhotos - 1
                        ? `Crop Photo ${photoIndex + 2} →`
                        : "Preview Sheet →"}
                </button>
            </div>
        </div>
    );
}

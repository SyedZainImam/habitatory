"use client";

import { useRef } from "react";

interface Props {
    rawPhotos: (string | null)[];
    onPhotosChange: (photos: (string | null)[]) => void;
    onContinue: () => void;
}

export default function PhotoUploader({ rawPhotos, onPhotosChange, onContinue }: Props) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const totalSlots = 6;
    const filledCount = rawPhotos.filter(Boolean).length;

    function handleFileSelect(index: number, file: File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const updated = [...rawPhotos];
            updated[index] = e.target?.result as string;
            onPhotosChange(updated);
        };
        reader.readAsDataURL(file);
    }

    function handleInputChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) handleFileSelect(index, file);
    }

    function handleDrop(index: number, e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) handleFileSelect(index, file);
    }

    function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
    }

    function removePhoto(index: number) {
        const updated = [...rawPhotos];
        updated[index] = null;
        onPhotosChange(updated);
        // Reset the file input so the same file can be re-selected
        if (inputRefs.current[index]) inputRefs.current[index]!.value = "";
    }

    return (
        <div>
            <h2 className="text-2xl font-bold text-[#2C5F72] mb-2">Upload Your 6 Photos</h2>
            <p className="text-gray-600 mb-6 text-sm">
                Upload 1–6 photos. Each filled slot becomes one magnet. Empty slots are left blank on the sheet.
            </p>

            <div
                className="grid grid-cols-2 gap-4 mb-8"
                style={{ gridTemplateRows: "repeat(3, 1fr)" }}
            >
                {Array.from({ length: totalSlots }).map((_, i) => (
                    <div key={i} className="relative">
                        <input
                            ref={(el) => { inputRefs.current[i] = el; }}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleInputChange(i, e)}
                        />

                        {rawPhotos[i] ? (
                            <div className="relative aspect-[6/5] rounded-lg overflow-hidden border-2 border-[#2C5F72]">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={rawPhotos[i]!}
                                    alt={`Photo ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                                    <button
                                        type="button"
                                        onClick={() => inputRefs.current[i]?.click()}
                                        className="text-white bg-black/50 px-2 py-1 rounded text-xs mr-2"
                                    >
                                        Replace
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(i)}
                                        className="text-white bg-red-500/80 px-2 py-1 rounded text-xs"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <span className="absolute top-2 left-2 bg-[#2C5F72] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                    {i + 1}
                                </span>
                            </div>
                        ) : (
                            <div
                                className="aspect-[6/5] rounded-lg border-2 border-dashed border-gray-300 hover:border-[#2C5F72] cursor-pointer flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#2C5F72] transition-colors bg-gray-50 hover:bg-[#2C5F72]/5"
                                onClick={() => inputRefs.current[i]?.click()}
                                onDrop={(e) => handleDrop(i, e)}
                                onDragOver={handleDragOver}
                            >
                                <span className="text-3xl">+</span>
                                <span className="text-xs font-medium">Photo {i + 1}</span>
                                <span className="text-xs text-gray-300">or drag &amp; drop</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    {filledCount} of {totalSlots} slots filled
                </span>
                <button
                    onClick={onContinue}
                    disabled={filledCount < 1}
                    className="bg-[#2C5F72] text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a3c47] transition-colors"
                >
                    Continue to Crop →
                </button>
            </div>
        </div>
    );
}
